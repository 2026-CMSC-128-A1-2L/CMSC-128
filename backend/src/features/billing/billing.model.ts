import mongoose from 'mongoose';
import { documentSchema, type DocumentType } from '../document/document.model';

const PAYMENT_STATUS = ['unpaid', 'paid', 'overdue'];
type PaymentStatusType = (typeof PAYMENT_STATUS)[number];

export type BillingType = {
  userId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  rentalId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  dueDate?: Date | null;
  paymentDate?: Date | null;
  paidAmount?: number | null;
  totalAmount: number;
  paymentStatus: PaymentStatusType;
  documents: DocumentType[];
  paymentQr: String;
  breakdown: {
    name: string;
    amount: number;
  }[];
};

const billingSchema = new mongoose.Schema<BillingType>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

    // Which facility this billing belongs to (for permission checks)
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    dueDate: { type: Date },
    paymentDate: { type: Date },
    paidAmount: { type: Number },
    totalAmount: { type: Number, required: true },

    // 'Unpaid' is when `paymentDate` is undefined
    // 'paid' is when `paymentDate` <= `dueDate`
    // 'overdue' is when `paymentDate` <= `dueDate`
    // 'partially_paid' is when `paidAmount` <= `amount`
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS,
      default: 'unpaid',
    },

    // URL or file path to the proof of payment
    documents: { type: [documentSchema], required: true, default: [] },

    // Qr if using Gcash
    paymentQr: String,

    breakdown: {
      type: [
        {
          name: { type: String, required: true },
          amount: { type: Number, required: true },
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

export const Billing = mongoose.model('Billing', billingSchema);
