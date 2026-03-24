import mongoose, { QueryFilter } from 'mongoose';
import { combineFilters } from '../controllers/middleware.js';
import { Billing } from '../models/student-actions/Billing.js';
import { AppError } from '../controllers/error.js';

export type CreateBillingArguments = {
  studentID: mongoose.Types.ObjectId;
  unitID: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId;

  dueDate: Date;
  paymentDate?: Date; // Needed yet

  amount?: number;
  paidAmount?: number; // Not needed yet

  paymentStatus?: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';

  proofOfPayment?: string; // Not needed yet
  paymentType: string; // 'rent', 'deposit', 'utility', etc. // Description of billing
};

export type GetBillingArguments = {
  studentID?: mongoose.Types.ObjectId;
  unitID?: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId;

  dueDate?: Date;
  paymentDate?: Date;

  amount?: number;
  paidAmount?: number;

  paymentStatus?: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';

  proofOfPayment?: string;
  paymentType?: string;
};

export const createBilling = async (data: CreateBillingArguments) => {
  const newBilling = new Billing({
    studentID: data.studentID,
    unitID: data.unitID,
    managerID: data.managerID,

    dueDate: data.dueDate,
    paymentDate: data.paymentDate,

    amount: data.amount,
    paidAmount: data.paidAmount,

    paymentStatus: data.paymentStatus ?? 'unpaid',

    proofOfPayment: data.proofOfPayment,
    paymentType: data.paymentType,
  });
  return await newBilling.save();
}


export function buildBillingQuery(args: Partial<GetBillingArguments>,): QueryFilter<typeof Billing> { 
  const query: QueryFilter<typeof Billing> = {};

  if (args.studentID) {
    query.studentID = args.studentID;
  }

  if (args.unitID) {
    query.unitID = args.unitID;
  }

  if (args.managerID) {
    query.managerID = args.managerID;
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
