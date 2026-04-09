import mongoose, { QueryFilter } from 'mongoose';
import { combineFilters } from '../controllers/middleware.js';
import { Billing } from '../models/student-actions/Billing.js';

export type CreateBillingArguments = {
  studentId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId;
  dueDate: Date;
  paymentDate?: Date; // Needed yet
  amount?: number;
  paidAmount?: number; // Not needed yet
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  proofOfPayment?: string; // Not needed yet
  paymentType: string; // 'rent', 'deposit', 'utility', etc. // Description of billing
};

export type UpdateBillingArguments = {
// just assumed that amount here is the monthly amount because there is no record of total balance
  billingId: string;
  data: {
    dueDate?: Date;
    paymentDate?: Date;
    amount?: number;//assumed monthly
    paidAmount?: number;
    paymentStatus?: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
    proofOfPayment?: string;
    paymentType?: string;
  };
};

export type GetBillingArguments = {
  studentId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  managerId: mongoose.Types.ObjectId;
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
    managerId: data.managerId,
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

  if (args.managerId) {
    query.managerId = args.managerId;
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

export const getBilling = async (billingId: string) => {
  return await Billing.findById(billingId);
};

export const updateBilling = async (billingId: string, data: UpdateBillingArguments) => {
  return await Billing.findByIdAndUpdate(
    billingId,
    { $set: data },
    { new: true, runValidators: true }
  );
};
