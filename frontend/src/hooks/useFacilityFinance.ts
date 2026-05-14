import { useState, useEffect, useCallback } from 'react';
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
  isBillingsLoading: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  refetchBillings: () => void;
};

const MONTH_LABELS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export function useFacilityFinance(facilityId: string | undefined): UseFacilityFinanceReturn {
  const [facilityInfo, setFacilityInfo] = useState<FacilityInfo | null>(null);
  const [overview, setOverview] = useState<FacilityOverview | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncomeData[]>([]);
  const [incomeBreakdown, setIncomeBreakdown] = useState<IncomeBreakdownData | null>(null);
  const [billings, setBillings] = useState<TenantBilling[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBillingsLoading, setIsBillingsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [billingsFetchCount, setBillingsFetchCount] = useState(0);

  const refetch = useCallback(() => setFetchCount((n) => n + 1), []);
  const refetchBillings = useCallback(() => setBillingsFetchCount((n) => n + 1), []);

  // Load facility info + summary (using new frontend-computed summary)
  useEffect(() => {
    if (!facilityId) return;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const summaryRes = await BillingService.getFacilitySummary(facilityId);
        if (!cancelled) {
          setFacilityInfo(summaryRes.data.facilityInfo);
          setOverview({
            occupancyRate: summaryRes.data.overview.occupancyRate,
            collectionRate: summaryRes.data.overview.collectionRate,
            totalIncome: summaryRes.data.breakdown.monthlyIncome,
            totalUnits: 0,
            occupiedUnits: 0,
          });
        }
      } catch (err) {
        if (!cancelled) {
          const msg =
            (err as any)?.response?.data?.message ??
            (err instanceof Error ? err.message : 'Failed to load facility data.');
          setError(msg);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [facilityId, fetchCount]);

  useEffect(() => {
    if (!facilityId) return;
    let cancelled = false;

    const load = async () => {
      setIsBillingsLoading(true);
      try {
        const res = await BillingService.getFacilityBillings(facilityId);
        if (!cancelled) {
          const rawBillings: any[] = res.data ?? [];
          const mapped: TenantBilling[] = rawBillings.map((b) => ({
            _id: b._id ?? b.id,
            unitId: b.unitId?._id ?? b.unitId ?? '',
            roomNumber: b.unitId?.roomNumber ?? b.unitName ?? b.unitId ?? '',
            tenantName: b.tenantName ?? `${b.userId?.firstName ?? ''} ${b.userId?.lastName ?? ''}`.trim(),
            profilePicture: b.profilePicture ?? null,
            dueDate: b.dueDate ?? null,
            paymentStatus: b.paymentStatus ?? b.status ?? 'unpaid',
            totalAmount: b.totalAmount ?? b.amount ?? 0,
            paidAmount: b.paidAmount ?? null,
            breakdown: b.breakdown ?? [],
            facilityId: b.facilityId?._id ?? b.facilityId ?? facilityId,
            userId: b.userId?._id ?? b.userId ?? '',
            documents: b.documents ?? [],
            paymentDate: b.paymentDate ?? null,
            createdAt: b.createdAt ?? '',
            updatedAt: b.updatedAt ?? '',
          }));
          setBillings(mapped);

          // Compute monthly income from all billings
          const byMonth = new Map<string, number>();
          mapped.forEach((b) => {
            if (!b.dueDate) return;
            const d = new Date(b.dueDate);
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            byMonth.set(key, (byMonth.get(key) ?? 0) + b.totalAmount);
          });
          const monthlyData: MonthlyIncomeData[] = Array.from(byMonth.entries())
            .map(([key, income]) => {
              const [year, monthIndex] = key.split('-').map(Number);
              return { month: MONTH_LABELS[monthIndex], monthIndex, year, totalIncome: income };
            })
            .sort((a, b) => a.year !== b.year ? a.year - b.year : a.monthIndex - b.monthIndex);
          setMonthlyIncome(monthlyData);

          // Compute income breakdown from paid billings
          const breakdownMap = new Map<string, number>();
          mapped
            .filter((b) => b.paymentStatus === 'paid')
            .forEach((b) => {
              b.breakdown.forEach((item) => {
                breakdownMap.set(item.name, (breakdownMap.get(item.name) || 0) + item.amount);
              });
            });
          const rent = breakdownMap.get('Rent') || 0;
          const utilities = breakdownMap.get('Utilities') || 0;
          const misc = breakdownMap.get('Misc. Fees') || 0;
          const total = rent + utilities + misc || 1;
          setIncomeBreakdown({
            rent: { amount: rent, percentage: (rent / total) * 100 },
            utilities: { amount: utilities, percentage: (utilities / total) * 100 },
            misc: { amount: misc, percentage: (misc / total) * 100 },
            total: rent + utilities + misc,
          });

          if (overview) {
          }
        }
      } catch (err) {
        console.error('Failed to load facility billings:', err);
      } finally {
        if (!cancelled) setIsBillingsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [facilityId, billingsFetchCount, overview]);

  return {
    facilityInfo,
    overview,
    monthlyIncome,
    incomeBreakdown,
    billings,
    isBillingsLoading,
    isLoading,
    error,
    refetch,
    refetchBillings,
  };
}