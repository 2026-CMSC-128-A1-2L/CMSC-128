import mongoose, { QueryFilter } from 'mongoose';
import { combineFilters } from '../../middleware';
import { Billing } from './billing.model';
import { id } from 'zod/v4/locales';
import { AppError } from '../../error';

export type CreateBillingArguments = {
  userId: mongoose.Types.ObjectId;
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

// export type UpdateBillingArguments = {
//   dueDate?: Date;
//   paymentDate?: Date;
//   amount?: number;
//   paidAmount?: number;
//   paymentType?: string;
// };

export type GetBillingArguments = {
  userId: mongoose.Types.ObjectId;
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

export type UpdateBillingArguments = {
  dueDate?: Date;
  paymentDate?: Date;

  paidAmount?: number;
  amount?: number;
  paymentStatus?: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';

  proofOfPayment?: {
    file?: string;
    isVerified?: boolean;
  }
  paymentType?: string;
}

export const createBilling = async (data: CreateBillingArguments) => {
  const newBilling = new Billing({
    userId: data.userId,
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

  if (args.userId) {
    query.userId = args.userId;
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

export const getBilling = async (billingId: mongoose.Types.ObjectId, filters: any) => {
  return await Billing.findOne(combineFilters({ _id: billingId }, filters));
};

export const updateBilling = async (billingId: mongoose.Types.ObjectId, data: UpdateBillingArguments, filters: any) => {
  return await Billing.findOneAndUpdate(
    combineFilters({ _id: billingId }, filters),
    { $set: data },
  );
};

export const submitBillingPayment = async (
  billingId: mongoose.Types.ObjectId,
  data: UpdateBillingArguments,
  filters: any
) => {

  const billing = await Billing.findOne(
    combineFilters({ _id: billingId }, filters),
  );

  if (!billing) {
    throw new AppError(404, 'Billing not found.');
  }

  // send proof of payment
  billing.proofOfPayment = {
    file: data.proofOfPayment?.file || '',
    isVerified: false
  };
  // set payment amount
  billing.paidAmount = data.paidAmount;

  // set date
  billing.paymentDate = new Date();
  // set type
  billing.paymentType = data.paymentType;

  //TODO send notif

  return await billing.save();
};

export const verifyBillingPayment = async (
  billingId: mongoose.Types.ObjectId,
  data: UpdateBillingArguments,
  filters: any
) => {
  const billing = await Billing.findOne(
    combineFilters({ _id: billingId }, filters),
  );
  if (!billing) {
    const billingNoFilter = await Billing.findById(billingId);
    if (billingNoFilter) {
      throw new AppError(403, 'Forbidden: You do not have permission to update this billing.');
    } else {
      throw new AppError(404, 'Billing not found.');
    }
  }
  billing.proofOfPayment = { file: '', isVerified: true };
  //TODO set status of payment to relevant one
  //TODO add notif
  return await billing.save();
};

export const routeGetUserBillings = async (query: Partial<GetBillingArguments>, filters: any) => {
  const billing = await Billing.findOne(
    combineFilters(filters, { _id: id })
  );
  if (!billing) {
    throw new AppError(404, 'Billing not found.');
  }

};

export const routeGetUserBilling = async (query: Partial<GetBillingArguments>, filters: any) => { };
