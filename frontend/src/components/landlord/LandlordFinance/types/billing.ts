export interface BillingBreakdown {
  name: string;
  amount: number;
}

export interface BillingDocument {
  _id?: string;
  url: string;
  status: 'pending' | 'accepted' | 'rejected';
  uploadedAt: Date;
}

export interface Billing {
  _id: string;
  userId: string;
  unitId: string;
  facilityId: string;
  dueDate: string | null;
  paymentDate: string | null;
  paidAmount: number | null;
  totalAmount: number;
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  documents: BillingDocument[];
  breakdown: BillingBreakdown[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateBillingRequest {
  rentalId: string;
  dueDate: string;
  breakdown: BillingBreakdown[];
}

export interface UpdateBillingRequest {
  dueDate?: string;
}

export interface UpdateBillingPaymentRequest {
  amount: number;
}

export interface GetBillingsParams {
  userId?: string;
  unitId?: string;
  facilityId?: string;
  dueDate?: {
    min?: string;
    max?: string;
  };
  paymentDate?: {
    min?: string;
    max?: string;
  };
  paymentStatus?: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
}