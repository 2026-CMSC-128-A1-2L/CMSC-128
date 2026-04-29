import mongoose from 'mongoose';
import { documentSchema, type DocumentType } from "../document/document.model.js";

// Transfer request flow:
// 1. Student (with contract-signed rental) requests a transfer
// 2. Manager approves the request
// 3. The student is only removed from their current unit when someone else takes it
// 4. Target unit is the one specified in the request
// TODO: Billing implications when a transfer occurs need to be defined.

const TRANSFER_REASON_CATEGORIES = [
  'academic',
  'financial',
  'personal',
  'medical',
  'relocation',
  'other',
] as const;

const TRANSFER_STATUS = ['pending', 'approved', 'rejected', 'cancelled'] as const;

const DEPOSIT_HANDLING = ['refunded', 'transferred', 'forfeited'] as const;

const ADVANCE_RENT_STATUS = ['credited', 'forfeited', 'transferred'] as const;

export type TransferStatus = (typeof TRANSFER_STATUS)[number];
export type TransferReasonCategory = (typeof TRANSFER_REASON_CATEGORIES)[number];
export type DepositHandling = (typeof DEPOSIT_HANDLING)[number];
export type AdvanceRentStatus = (typeof ADVANCE_RENT_STATUS)[number];

export type TransferRequestType = {
  userId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  status: TransferStatus;

  // Page 1
  reasonCategory: TransferReasonCategory;
  intendedTransferDate: Date;
  description: string;

  // Lease information from rental
  leaseStartDate?: Date;
  leaseEndDate?: Date;
  monthsRemaining?: number;
  outstandingBalance?: number; // galing billings na to

  // Page 2
  transferFee?: number;
  depositHandling?: DepositHandling;
  advanceRentStatus?: AdvanceRentStatus;
  moveInDate?: Date;
  // Documents
  documents: DocumentType[];
  // Page 3
  termsAccepted: boolean;
};

const TransferRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    status: { type: String, enum: TRANSFER_STATUS, default: 'pending', required: true },

    // Page 1
    reasonCategory: { type: String, enum: TRANSFER_REASON_CATEGORIES },
    intendedTransferDate: { type: Date },
    description: { type: String },

    // Lease info
    leaseStartDate: { type: Date },
    leaseEndDate: { type: Date },
    monthsRemaining: { type: Number },
    outstandingBalance: { type: Number },

    // Page 2
    transferFee: { type: Number, default: 0 },
    depositHandling: { type: String, enum: DEPOSIT_HANDLING },
    advanceRentStatus: { type: String, enum: ADVANCE_RENT_STATUS },
    moveInDate: { type: Date },
    documents: { type: [documentSchema], required: true, default: [] },

    // Page 3
    termsAccepted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const TransferRequest = mongoose.model('TransferRequest', TransferRequestSchema);
