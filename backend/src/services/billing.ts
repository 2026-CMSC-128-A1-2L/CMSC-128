import mongoose, { QueryFilter } from 'mongoose';
import { combineFilters } from '../controllers/middleware.js';
import { Billing } from '../models/student-actions/Billing.js';

export type CreateBillingArguments = {
  studentId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  dueDate: Date;
  paymentDate?: Date; // Needed yet
  amount?: number;
  paidAmount?: number; // Not needed yet
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  proofOfPayment?: string; // Not needed yet
  paymentType: string; // 'rent', 'deposit', 'utility', etc. // Description of billing
};

export type GetBillingArguments = {
  studentId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  dueDate: Date;
  paymentDate: Date;
  amount: number;
  paidAmount: number;
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  proofOfPayment: string;
  paymentType: string;
};

export const createBilling = async (data: CreateBillingArguments) => {
  const newBilling = new Billing({
    studentId: data.studentId,
    unitId: data.unitId,
    facilityId: data.facilityId,
    dueDate: data.dueDate,
    paymentDate: data.paymentDate,
    amount: data.amount,
    paidAmount: data.paidAmount,
    paymentStatus: data.paymentStatus,
    proofOfPayment: data.proofOfPayment,
    paymentType: data.paymentType,
  });
  return await newBilling.save();
};

export function buildBillingQuery(args: Partial<GetBillingArguments>): QueryFilter<typeof Billing> {
  const query: QueryFilter<typeof Billing> = {};

  if (args.studentId) {
    query.studentId = args.studentId;
  }

  if (args.unitId) {
    query.unitId = args.unitId;
  }

  if (args.facilityId) {
    query.facilityId = args.facilityId;
  }

  if (args.dueDate) {
    query.dueDate = args.dueDate;
  }

  if (args.paymentDate) {
    query.paymentDate = args.paymentDate;
  }

  if (args.amount !== undefined) {
    query.amount = args.amount;
  }

  if (args.paidAmount !== undefined) {
    query.paidAmount = args.paidAmount;
  }

  if (args.paymentStatus) {
    query.paymentStatus = args.paymentStatus;
  }

  if (args.proofOfPayment) {
    query.proofOfPayment = args.proofOfPayment;
  }

  if (args.paymentType) {
    query.paymentType = args.paymentType;
  }

  return query;
}

export const getBillings = async (query: Partial<GetBillingArguments>, filters: any) => {
  const dbFilters = buildBillingQuery(query);
  return await Billing.find(combineFilters(filters, dbFilters));
};
