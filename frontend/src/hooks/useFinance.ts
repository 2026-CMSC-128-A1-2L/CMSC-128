import { useEffect, useState, useCallback } from 'react';
import { BillingService } from '../service/BillingService';
import { UserService } from '../service/UserService';
import { useAuthStore } from '../store/useAuthStore';
import { FacilityService } from '../service/FacilityService';

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

const EMPTY_DASHBOARD: UserBillingDashboard = {
    summary: { totalExpense: 0, totalOutstanding: 0, currentStatus: 'paid' },
    facilityDetails: { name: '', address: '' },
    monthlyStatistics: [],
    unpaidPayments: [],
    billingHistory: [],
};

type UseFinanceReturn = {
    dashboard: UserBillingDashboard | null;
    isLoading: boolean;
    error: string | null;
    hasAccommodation: boolean;
    refetch: () => void;
};

export function useFinance(): UseFinanceReturn {
    const [dashboard, setDashboard] = useState<UserBillingDashboard | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasAccommodation, setHasAccommodation] = useState(false);
    const [fetchCount, setFetchCount] = useState(0);

    const userId = useAuthStore((state) => (state.user as any)?._id as string | undefined);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    const refetch = useCallback(() => setFetchCount((n) => n + 1), []);

    useEffect(() => {
        if (!isInitialized) {
            setIsLoading(true);
            return;
        }

        if (!userId) {
            setDashboard(EMPTY_DASHBOARD);
            setHasAccommodation(false);
            setIsLoading(false);
            setError(null);
            return;
        }

        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await BillingService.getUserBillingDashboard(userId);
                if (!cancelled) {
                    setDashboard(response.data as UserBillingDashboard);
                    setHasAccommodation(true);
                }
            } catch (err) {
                if (!cancelled) {
                    const status = (err as { response?: { status?: number } })?.response?.status;
                    const axiosMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;

                    if (status === 404) {
                        try {
                            const rentalsResponse = await UserService.getMyRentals();
                            const rentals = rentalsResponse?.data ?? rentalsResponse ?? [];
                            const activeRental = Array.isArray(rentals)
                                ? rentals.find((r: any) => r.status === 'active')
                                : null;

                            let facilityDetails = EMPTY_DASHBOARD.facilityDetails;
                            if (activeRental?.facilityId) {
                                try {
                                    const facilityResponse = await FacilityService.getFacility(activeRental.facilityId);
                                    const f = facilityResponse.data;
                                    facilityDetails = {
                                        name: f?.name ?? '',
                                        address: f?.location?.text ?? '',
                                    };
                                } catch {
                                    // facility fetch failed, leave as empty
                                }
                            }

                            if (!cancelled) {
                                setDashboard({ ...EMPTY_DASHBOARD, facilityDetails });
                                setHasAccommodation(!!activeRental);
                                setError(null);
                            }
                        } catch {
                            if (!cancelled) {
                                setDashboard(EMPTY_DASHBOARD);
                                setHasAccommodation(false);
                                setError(null);
                            }
                        }
                    } else {
                        const message = axiosMessage ?? (err instanceof Error ? err.message : 'Failed to load finance data.');
                        setError(message);
                        setDashboard(null);
                        setHasAccommodation(false);
                    }
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();

        return () => { cancelled = true; };
    }, [isInitialized, userId, fetchCount]);

    return { dashboard, isLoading, error, hasAccommodation, refetch };
}
