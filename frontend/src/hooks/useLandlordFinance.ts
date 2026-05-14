import { useState, useEffect, useCallback } from 'react';
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
  incomeStatistics: { facilityId: string; year: number; month: number; monthlyIncome: number; outstanding: number }[];
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
        const res = await BillingService.getLandlordSummary();
        if (!cancelled) {
          const raw = res.data;
          setDashboard({
            totalIncome: raw.dashboard.totalIncome,
            totalOutstanding: raw.dashboard.totalOutstanding,
            occupancyRate: raw.dashboard.occupancyRate,
            collectionRate: raw.dashboard.collectionRate,
            incomeStatistics: raw.dashboard.incomeStatistics,
            facilityCards: (raw.billingCards ?? []).map((c: any) => ({
              id: c.id.toString(),
              name: c.name,
              thumbnail: c.thumbnail ?? null,
              units: c.units ?? 0,
              totalOccupied: c.totalOccupied ?? 0,
              income: c.income ?? 0,
              outstanding: c.outstanding ?? 0,
            })),
          });
        }
      } catch (err) {
        if (!cancelled) {
          const msg =
            (err as any)?.response?.data?.message ??
            (err instanceof Error ? err.message : 'Failed to load finance data.');
          setError(msg);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [fetchCount]);

  return { dashboard, isLoading, error, refetch };
}