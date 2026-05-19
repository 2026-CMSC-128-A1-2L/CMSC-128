export type BillingHistoryItem = {
  id: string;
  date: string;
  amount: number;
  status: string;
};

export type UpcomingPayment = {
  id: string;
  billingId: string;
  dueDate: string;
  amount: number;
};
