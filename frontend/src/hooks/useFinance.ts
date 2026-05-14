import { useEffect, useState, useCallback } from 'react';
import { BillingService } from '../service/BillingService';
import { useAuthStore } from '../store/useAuthStore';

export type BillingBreakdownItem = {
  name: string;
  amount: number;
};

export type MonthlyStatistic = {
  year: number;
  month: number;             
  monthlyExpense: number;
  monthlyOutstanding: number;
  breakdown: BillingBreakdownItem[];
};

export type BillListItem = {
  _id: string;
  dueDate: string;       
  totalAmount: number;
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
};

export type FacilityDetails = {
  name: string;
  address: string;
};

export type FinanceSummary = {
  totalExpense: number;
  totalOutstanding: number;
  currentStatus: 'unpaid' | 'paid' | 'overdue';
};

export type UserBillingDashboard = {
  summary: FinanceSummary;
  facilityDetails: FacilityDetails;
  monthlyStatistics: MonthlyStatistic[];
  unpaidPayments: BillListItem[];   
  billingHistory: BillListItem[];   
};

type UseFinanceReturn = {
  dashboard: UserBillingDashboard | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFinance(): UseFinanceReturn {
  const [dashboard, setDashboard] = useState<UserBillingDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const userId = useAuthStore((state) => (state.user as any)?._id as string | undefined);

  const refetch = useCallback(() => setFetchCount((n) => n + 1), []);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await BillingService.getUserBillingDashboard(userId);
        if (!cancelled) {
          setDashboard(response.data as UserBillingDashboard);
        }
      } catch (err) {
        if (!cancelled) {
          const axiosMessage =
            (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
          const message = axiosMessage ?? (err instanceof Error ? err.message : 'Failed to load finance data.');
          setError(message);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [userId, fetchCount]);

  return { dashboard, isLoading, error, refetch };
}