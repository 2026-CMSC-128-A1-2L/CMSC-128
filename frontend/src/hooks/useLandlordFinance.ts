import { useState, useEffect, useCallback } from 'react';
import { FacilityService } from '../service/FacilityService';
import { BillingService } from '../service/BillingService';

export type FacilityCard = {
  id: string;
  name: string;
  thumbnail: string | null;
  units: number;
  totalOccupied: number;
  income: number;
  outstanding: number;
};

export type LandlordDashboard = {
  totalIncome: number;
  totalOutstanding: number;
  occupancyRate: number;
  collectionRate: number;
  incomeStatistics: { 
    facilityId: string; 
    year: number; 
    month: number; 
    monthlyIncome: number; 
    outstanding: number 
  }[];
  facilityCards: FacilityCard[];
};

type UseLandlordFinanceReturn = {
  dashboard: LandlordDashboard | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useLandlordFinance(): UseLandlordFinanceReturn {
  const [dashboard, setDashboard] = useState<LandlordDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = useCallback(() => setFetchCount((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Step 1: Get landlord's facilities (summary objects — no listing IDs)
        const facilitiesRes = await FacilityService.getLandlordFacilities();
        const facilities = facilitiesRes.data;

        if (!facilities.length) {
          setDashboard({
            totalIncome: 0,
            totalOutstanding: 0,
            occupancyRate: 0,
            collectionRate: 0,
            incomeStatistics: [],
            facilityCards: [],
          });
          setIsLoading(false);
          return;
        }

        // Step 2: Fetch full facility details for all properties in parallel to get
        // listing IDs (the summary listing objects from getFacilities have no id field).
        // Then fetch all billings via listing IDs — one getFacility call per property,
        // all concurrent, no redundant re-fetching.
        const fullFacilityResults = await Promise.allSettled(
          facilities.map((f: any) => FacilityService.getFacility(f.id))
        );

        const facilitySummaries = await Promise.all(
          facilities.map(async (facility: any, index: number) => {
            try {
              // Use full facility detail if available, fall back to summary object
              const settled = fullFacilityResults[index];
              const fullFacility = settled.status === 'fulfilled'
                ? (settled.value.data ?? settled.value)
                : facility;

              const listings: any[] = fullFacility.listings ?? facility.listings ?? [];
              const listingIds = listings.map((l: any) => l.id ?? l._id).filter(Boolean);
              const allBillings = await BillingService.getAllBillingsForListings(listingIds);

              const totalUnits = listings.reduce(
                (sum: number, l: any) => sum + (l.unitCount || 0),
                0
              );
              const totalOccupied = listings.reduce(
                (sum: number, l: any) => sum + ((l.unitCount || 0) - (l.availableUnitCount || 0)),
                0
              );

              // Tally paid income and outstanding per month
              const byMonth = new Map<string, number>();
              let income = 0;
              let outstanding = 0;

              for (const b of allBillings) {
                const amount = b.totalAmount || b.amount || 0;
                if (b.paymentStatus === 'paid') {
                  income += amount;
                  if (b.dueDate || b.paymentDate || b.createdAt) {
                    const dateStr = b.paymentDate ?? b.dueDate ?? b.createdAt;
                    const d = new Date(dateStr);
                    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
                    byMonth.set(key, (byMonth.get(key) ?? 0) + amount);
                  }
                } else {
                  outstanding += amount;
                }
              }

              return {
                id: facility.id,
                name: facility.name,
                thumbnail: facility.media?.[0]?.value ?? null,
                units: totalUnits,
                totalOccupied,
                income,
                outstanding,
                byMonth,
              };
            } catch (err) {
              console.error(`Failed to get billings for facility ${facility.id}:`, err);
              return {
                id: facility.id,
                name: facility.name,
                thumbnail: facility.media?.[0]?.value ?? null,
                units: 0,
                totalOccupied: 0,
                income: 0,
                outstanding: 0,
                byMonth: new Map<string, number>(),
              };
            }
          })
        );

        let totalIncome = 0;
        let totalOutstanding = 0;
        let totalUnits = 0;
        let totalOccupied = 0;

        const facilityCards: FacilityCard[] = facilitySummaries.map((fs: any) => {
          totalIncome += fs.income;
          totalOutstanding += fs.outstanding;
          totalUnits += fs.units;
          totalOccupied += fs.totalOccupied;
          
          return {
            id: fs.id,
            name: fs.name,
            thumbnail: fs.thumbnail,
            units: fs.units,
            totalOccupied: fs.totalOccupied,
            income: fs.income,
            outstanding: fs.outstanding,
          };
        });

        const occupancyRate = totalUnits === 0 ? 0 : Math.round((totalOccupied / totalUnits) * 100);
        const collectionRate = totalIncome + totalOutstanding === 0
          ? 0
          : Math.round((totalIncome / (totalIncome + totalOutstanding)) * 100);

        const incomeStatistics: { facilityId: string; year: number; month: number; monthlyIncome: number; outstanding: number }[] = [];

        facilitySummaries.forEach((fs: any) => {
          fs.byMonth.forEach((monthlyIncome: number, key: string) => {
            const [year, month] = key.split('-').map(Number);
            incomeStatistics.push({
              facilityId: fs.id,
              year,
              month,
              monthlyIncome,
              outstanding: fs.outstanding,
            });
          });
        });

        setDashboard({
          totalIncome,
          totalOutstanding,
          occupancyRate,
          collectionRate,
          incomeStatistics,
          facilityCards,
        });
      } catch (err) {
        const msg = (err as any)?.response?.data?.message ?? 
                    (err instanceof Error ? err.message : 'Failed to load properties.');
        setError(msg);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [fetchCount]);

  return { dashboard, isLoading, error, refetch };
}