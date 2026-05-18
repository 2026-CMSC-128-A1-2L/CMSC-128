export type BillingHistoryItem = {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'unpaid' | 'partially_paid';
};

export type UpcomingPayment = {
  id: string;
  billingId: string;
  dueDate: string;
  amount: number;
  status?: 'paid' | 'pending' | 'overdue' | 'unpaid' | 'partially_paid';
};
