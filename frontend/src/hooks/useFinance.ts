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

    const refetch = useCallback(() => setFetchCount((n) => n + 1), []);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
        const { user, isInitialized } = useAuthStore.getState();
        const userId = (user as any)?._id as string | undefined;

        if (!isInitialized || !userId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await BillingService.getUserBillingDashboard(userId);
            if (!cancelled) {
                setDashboard(response.data as UserBillingDashboard);
            }
        } catch (err) {
            if (!cancelled) {
                const status = (err as { response?: { status?: number } })?.response?.status;
                const axiosMessage =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message;

                if (status === 404) {
                    setDashboard({
                        summary: { totalExpense: 0, totalOutstanding: 0, currentStatus: 'paid' },
                        facilityDetails: { name: '', address: '' },
                        monthlyStatistics: [],
                        unpaidPayments: [],
                        billingHistory: [],
                    });
                } else {
                    const message =
                        axiosMessage ??
                        (err instanceof Error ? err.message : 'Failed to load finance data.');
                    setError(message);
                }
            }
        } finally {
            if (!cancelled) setIsLoading(false);
        }
    };

    const unsub = useAuthStore.subscribe((state) => {
        if (state.isInitialized && !cancelled) {
            unsub();
            load();
        }
    });

    const { isInitialized } = useAuthStore.getState();
        if (isInitialized) {
        unsub(); 
        load();
    }

    return () => {
        cancelled = true;
        unsub();
    };
  }, [fetchCount]); 

    return { dashboard, isLoading, error, refetch };
}