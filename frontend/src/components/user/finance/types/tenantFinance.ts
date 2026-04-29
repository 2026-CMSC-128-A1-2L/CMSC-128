export interface BillingBreakdown {
  name: string;
  amount: number;
}

export interface TenantBilling {
  _id: string;
  userId: string;
  unitId: string;
  facilityId: string;
  dueDate: string;
  paymentDate: string | null;
  paidAmount: number | null;
  totalAmount: number;
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  breakdown: BillingBreakdown[];
  createdAt: string;
  updatedAt: string;
}

export interface UpcomingPayment {
  id: string;
  dueDate: string;
  amount: number;
  billingId: string;
  isCurrent?: boolean;
}

export interface BillingHistoryItem {
  id: string;
  date: string;
  amount: number;
  status: string;
}