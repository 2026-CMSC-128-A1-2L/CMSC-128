import mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { Billing, BillingType } from './billing.model';
import { AppError } from '../../error';
import { Rental, RentalType } from '../rental/rental.model';
import { sendNotification } from '../notification/notification.service';

export type CreateBillingArguments = {
  rentalId: mongoose.Types.ObjectId;
  dueDate: Date;
  breakdown: {
    name: string;
    amount: number;
  }[];
};

export type UpdateBillingArguments = {
  dueDate?: Date;
};

export type GetBillingArguments = {
  userId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  dueDate: {
    min?: Date;
    max?: Date;
  };
  paymentDate: {
    min?: Date;
    max?: Date;
  };
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
};

export const createBilling = async (
  data: CreateBillingArguments,
  filters: QueryFilter<RentalType>,
) => {
  const rental = await Rental.where(filters).findOne({ _id: data.rentalId, status: 'active' });
  if (!rental) throw new AppError(404, 'Rental not found.');

  const totalAmount = data.breakdown.map((x) => x.amount).reduce((x, y) => x + y);
  const billing = new Billing({
    userId: rental.userId,
    unitId: rental.unitId,
    facilityId: rental.facilityId,
    dueDate: data.dueDate,
    totalAmount,
    breakdown: data.breakdown,
  });

  const savedBilling = await billing.save();
  await sendNotification(
    rental.userId,
    'New Billing Created',
    `A new billing for ${totalAmount} has been created.`,
  );

  return savedBilling;
};

type Range<T> = {
  min: T;
  max: T;
};

function buildQuery<T>(
  args: Partial<
    Record<
      keyof T,
      number | string | boolean | mongoose.Types.ObjectId | undefined | Partial<Range<any>>
    >
  >,
): QueryFilter<T> {
  const query: QueryFilter<T> = {};

  for (const k of Object.keys(args)) {
    const kk = k as keyof T;
    const key = k as keyof QueryFilter<T>;
    if (args[kk] === undefined) continue;

    if (args[kk] instanceof mongoose.Types.ObjectId) {
      query[key] = args[kk] as any;
    } else if (typeof args[kk] === 'object') {
      if (args[kk]) {
        query[key] = {} as any;
        if (args[kk].min) {
          query[key].$gte = args[kk].min;
        }
        if (args[kk].max) {
          query[key].lt = args[kk].max;
        }
      }
    } else {
      query[key] = args[kk] as any;
    }
  }

  return query;
}

export const getBillings = (
  query: Partial<GetBillingArguments>,
  filters: QueryFilter<BillingType>,
) => Billing.where(buildQuery(query)).find(filters);

export const getBilling = (billingId: mongoose.Types.ObjectId, filters: QueryFilter<BillingType>) =>
  Billing.where(filters).findById(billingId);

export const updateBilling = async (
  billingId: mongoose.Types.ObjectId,
  data: UpdateBillingArguments,
  filters: QueryFilter<BillingType>,
) => {
  return await Billing.where(filters).findOneAndUpdate(
    { _id: billingId },
    { $set: data },
    { returnDocument: 'after' },
  );
};

export const updateBillingPayment = async (
  billingId: mongoose.Types.ObjectId,
  amount: number,
  filters: QueryFilter<BillingType>,
) => {
  const billing = await Billing.where(filters).findById(billingId);
  if (!billing) throw new AppError(404, 'Billing not found.');

  let allAccepted = true;
  for (const doc of billing.documents) {
    if (doc.status !== 'accepted') {
      allAccepted = false;
      break;
    }
  }

  if (!allAccepted) {
    throw new AppError(422, 'Cannot verify payment without verifying files.');
  }

  billing.totalAmount = amount;
  return await billing.save();
};
