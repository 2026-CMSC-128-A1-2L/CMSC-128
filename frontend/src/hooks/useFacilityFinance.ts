import { useState, useEffect, useCallback, useRef } from 'react';
import { BillingService } from '../service/BillingService';
import { FacilityService } from '../service/FacilityService';

export type FacilityInfo = {
  id: string;
  name: string;
  address: string;
};

export type FacilityOverview = {
  occupancyRate: number;
  collectionRate: number;
  totalIncome: number;
  totalUnits: number;
  occupiedUnits: number;
};

export type MonthlyIncomeData = {
  month: string;
  monthIndex: number;
  year: number;
  totalIncome: number;
};

export type IncomeBreakdownData = {
  rent: { amount: number; percentage: number };
  utilities: { amount: number; percentage: number };
  misc: { amount: number; percentage: number };
  total: number;
};

export type TenantBilling = {
  _id: string;
  unitId: string;
  rentalId?: string;
  roomNumber: string;
  tenantName: string;
  profilePicture: string | null;
  dueDate: string | null;
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  totalAmount: number;
  paidAmount: number | null;
  breakdown: { name: string; amount: number }[];
  facilityId: string;
  userId: string;
  documents: any[];
  paymentDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type UseFacilityFinanceReturn = {
  facilityInfo: FacilityInfo | null;
  overview: FacilityOverview | null;
  monthlyIncome: MonthlyIncomeData[];
  incomeBreakdown: IncomeBreakdownData | null;
  billings: TenantBilling[];
  unitRentalMap: Map<string, string>;
  isBillingsLoading: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  refetchBillings: () => void;
  facilityListings: { id: string }[];
};

const MONTH_LABELS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a userId → fullName map from the raw tenants list returned by the API.
 * Handles all known shapes: { _id, name }, { _id, firstName, lastName },
 * { userId: { _id, firstName, lastName } }.
 */
function buildUserMap(tenantsRaw: any): Map<string, string> {
  const userMap = new Map<string, string>();
  const list: any[] = Array.isArray(tenantsRaw) ? tenantsRaw : (tenantsRaw as any)?.data ?? [];

  for (const t of list) {
    const uid = t._id ?? t.userId?._id ?? t.userId;
    if (!uid) continue;

    const name =
      t.name ??
      (t.firstName || t.lastName
        ? `${t.firstName ?? ''} ${t.lastName ?? ''}`.trim()
        : t.userId && typeof t.userId === 'object'
          ? `${t.userId.firstName ?? ''} ${t.userId.lastName ?? ''}`.trim()
          : '');

    if (name) userMap.set(String(uid), name);
  }

  return userMap;
}

/** Map a raw billing API object to a typed TenantBilling. */
function mapBilling(b: any, facilityId: string, userMap: Map<string, string>): TenantBilling {
  const unitObj = b.unitId && typeof b.unitId === 'object' ? b.unitId : null;
  const unitId = unitObj?._id ?? b.unitId ?? '';

  // Resolve tenant name — try every populated shape before falling back to userMap.
  let tenantName = b.tenantName ?? '';

  if (!tenantName && b.userId && typeof b.userId === 'object') {
    tenantName = `${b.userId.firstName ?? ''} ${b.userId.lastName ?? ''}`.trim();
  }

  if (!tenantName && b.rentalId && typeof b.rentalId === 'object') {
    const rUser = b.rentalId.userId;
    if (rUser && typeof rUser === 'object') {
      tenantName = `${rUser.firstName ?? ''} ${rUser.lastName ?? ''}`.trim();
    } else if (b.rentalId.tenantName) {
      tenantName = b.rentalId.tenantName;
    }
  }

  if (!tenantName) {
    const userIdStr = typeof b.userId === 'string' ? b.userId : (b.userId?._id ?? '');
    if (userIdStr) tenantName = userMap.get(userIdStr) ?? '';
  }

  const breakdown: { name: string; amount: number }[] =
    Array.isArray(b.breakdown) && b.breakdown.length > 0
      ? b.breakdown
      : [{ name: 'Rent', amount: b.totalAmount ?? b.amount ?? 0 }];

  return {
    _id: b._id ?? b.id,
    unitId,
    rentalId: b.rentalId?._id ?? b.rentalId ?? null,
    roomNumber: b.roomNumber ?? unitObj?.roomNumber ?? '',
    tenantName: tenantName || 'Unknown Tenant',
    profilePicture: b.profilePicture ?? null,
    dueDate: b.dueDate ?? null,
    paymentStatus: b.paymentStatus ?? b.status ?? 'unpaid',
    totalAmount:
      breakdown.reduce((sum, item) => sum + (item.amount || 0), 0) ||
      b.totalAmount ||
      b.amount ||
      0,
    paidAmount: b.paidAmount ?? null,
    breakdown,
    facilityId: b.facilityId?._id ?? b.facilityId ?? facilityId,
    userId: b.userId?._id ?? b.userId ?? '',
    documents: b.documents ?? [],
    paymentDate: b.paymentDate ?? null,
    createdAt: b.createdAt ?? '',
    updatedAt: b.updatedAt ?? '',
  };
}

async function resolveTenantNames(billings: TenantBilling[]): Promise<TenantBilling[]> {
  const unknownBillings = billings.filter((b) => b.tenantName === 'Unknown Tenant');
  if (unknownBillings.length === 0) return billings;

  const nameMap = new Map<string, string>();

  await Promise.allSettled(
    unknownBillings.map(async (b) => {
      try {
        const detail = await BillingService.getBillingDetail(b._id);
        if (detail.tenantName) nameMap.set(b._id, detail.tenantName);
      } catch {
        // silently skip — leave as 'Unknown Tenant'
      }
    }),
  );

  if (nameMap.size === 0) return billings;

  return billings.map((b) =>
    nameMap.has(b._id) ? { ...b, tenantName: nameMap.get(b._id)! } : b,
  );
}

function deriveFromBillings(
  mappedBillings: TenantBilling[],
  nowYear: number,
  nowMonth: number,
) {
  // unitId -> rentalId
  const rentalMap = new Map<string, string>();
  for (const b of mappedBillings) {
    if (b.rentalId) rentalMap.set(b.unitId, b.rentalId);
  }

  // Monthly income chart (up to and including current month)
  const byMonth = new Map<string, number>();
  for (const b of mappedBillings) {
    if (!b.dueDate) continue;
    const d = new Date(b.dueDate);
    const dYear = d.getFullYear();
    const dMonth = d.getMonth();
    if (dYear > nowYear || (dYear === nowYear && dMonth > nowMonth)) continue;
    const key = `${dYear}-${dMonth}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + b.totalAmount);
  }

  const monthlyIncome: MonthlyIncomeData[] = Array.from(byMonth.entries())
    .map(([key, totalIncome]) => {
      const [year, monthIndex] = key.split('-').map(Number);
      return { month: MONTH_LABELS[monthIndex], monthIndex, year, totalIncome };
    })
    .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.monthIndex - b.monthIndex));

  // Income breakdown (paid billings only)
  const paidBillings = mappedBillings.filter((b) => b.paymentStatus === 'paid');
  const breakdownMap = new Map<string, number>();
  for (const b of paidBillings) {
    for (const item of b.breakdown) {
      breakdownMap.set(item.name, (breakdownMap.get(item.name) ?? 0) + (item.amount || 0));
    }
  }

  const rent = breakdownMap.get('Rent') ?? 0;
  const utilities = breakdownMap.get('Utilities') ?? 0;
  const misc = breakdownMap.get('Misc. Fees') ?? 0;
  const breakdownTotal = rent + utilities + misc;
  const divisor = breakdownTotal || 1;

  const incomeBreakdown: IncomeBreakdownData = {
    rent: { amount: rent, percentage: (rent / divisor) * 100 },
    utilities: { amount: utilities, percentage: (utilities / divisor) * 100 },
    misc: { amount: misc, percentage: (misc / divisor) * 100 },
    total: breakdownTotal,
  };

  const totalPaidIncome = paidBillings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalOutstanding = mappedBillings
    .filter((b) => b.paymentStatus !== 'paid')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const collectionRate =
    totalPaidIncome + totalOutstanding === 0
      ? 0
      : Math.round((totalPaidIncome / (totalPaidIncome + totalOutstanding)) * 100);

  return { rentalMap, monthlyIncome, incomeBreakdown, totalPaidIncome, collectionRate };
}

export function useFacilityFinance(facilityId: string | undefined): UseFacilityFinanceReturn {
  const [facilityInfo, setFacilityInfo] = useState<FacilityInfo | null>(null);
  const [overview, setOverview] = useState<FacilityOverview | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncomeData[]>([]);
  const [incomeBreakdown, setIncomeBreakdown] = useState<IncomeBreakdownData | null>(null);
  const [billings, setBillings] = useState<TenantBilling[]>([]);
  const [unitRentalMap, setUnitRentalMap] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isBillingsLoading, setIsBillingsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [billingsFetchCount, setBillingsFetchCount] = useState(0);
  const [facilityListings, setFacilityListings] = useState<{ id: string }[]>([]);

  const userMapRef = useRef<Map<string, string>>(new Map());

  const refetch = useCallback(() => setFetchCount((n) => n + 1), []);
  const refetchBillings = useCallback(() => setBillingsFetchCount((n) => n + 1), []);

  // Full load: facility info + billings + tenants
  useEffect(() => {
    if (!facilityId) return;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setIsBillingsLoading(true);
      setError(null);

      try {
        const [facilityRes, allBillings, tenantsRaw] = await Promise.all([
          FacilityService.getFacility(facilityId),
          BillingService.getAllBillingsForFacility(facilityId),
          FacilityService.getTenants().catch(() => []),
        ]);

        if (cancelled) return;

        const userMap = buildUserMap(tenantsRaw);
        userMapRef.current = userMap;

        const facility = facilityRes.data ?? facilityRes;
        const listings: any[] = facility.listings ?? [];

        setFacilityInfo({
          id: facility._id,
          name: facility.name,
          address: facility.location?.text ?? 'Unknown Address',
        });
        setFacilityListings(listings.map((l: any) => ({ id: l.id })));

        const totalUnits = listings.reduce((sum: number, l: any) => sum + (l.unitCount || 0), 0);
        const occupiedUnits = listings.reduce(
          (sum: number, l: any) => sum + ((l.unitCount || 0) - (l.availableUnitCount || 0)),
          0,
        );

        const mappedBillings = await resolveTenantNames(
          allBillings.map((b: any) => mapBilling(b, facilityId, userMap)),
        );
        if (cancelled) return;

        setBillings(mappedBillings);

        const now = new Date();
        const { rentalMap, monthlyIncome, incomeBreakdown, totalPaidIncome, collectionRate } =
          deriveFromBillings(mappedBillings, now.getFullYear(), now.getMonth());

        setUnitRentalMap(rentalMap);
        setMonthlyIncome(monthlyIncome);
        setIncomeBreakdown(incomeBreakdown);
        setOverview({
          occupancyRate: totalUnits === 0 ? 0 : Math.round((occupiedUnits / totalUnits) * 100),
          collectionRate,
          totalIncome: totalPaidIncome,
          totalUnits,
          occupiedUnits,
        });
      } catch (err) {
        if (!cancelled) {
          setError(
            (err as any)?.response?.data?.message ??
              (err instanceof Error ? err.message : 'Failed to load facility data.'),
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsBillingsLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [facilityId, fetchCount]);

  useEffect(() => {
    if (!facilityId || billingsFetchCount === 0) return;
    let cancelled = false;

    const load = async () => {
      setIsBillingsLoading(true);
      try {
        const allBillings = await BillingService.getAllBillingsForFacility(facilityId);
        if (cancelled) return;

        // FIX A: pass the cached userMap instead of nothing.
        const mappedBillings = await resolveTenantNames(
          allBillings.map((b: any) => mapBilling(b, facilityId, userMapRef.current)),
        );
        if (cancelled) return;

        setBillings(mappedBillings);

        const now = new Date();
        const { rentalMap, incomeBreakdown, totalPaidIncome, collectionRate } = deriveFromBillings(
          mappedBillings,
          now.getFullYear(),
          now.getMonth(),
        );

        setUnitRentalMap(rentalMap);
        setIncomeBreakdown(incomeBreakdown);
        setOverview((prev) =>
          prev ? { ...prev, totalIncome: totalPaidIncome, collectionRate } : null,
        );
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to refresh billings:', err);
          setBillings([]);
        }
      } finally {
        if (!cancelled) setIsBillingsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [facilityId, billingsFetchCount]);

  return {
    facilityInfo,
    overview,
    monthlyIncome,
    incomeBreakdown,
    billings,
    unitRentalMap,
    isBillingsLoading,
    isLoading,
    error,
    refetch,
    refetchBillings,
    facilityListings,
  };
}