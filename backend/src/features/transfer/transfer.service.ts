import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { Listing, type ListingType } from '../listing/listing.model.js';
import { Unit } from '../unit/unit.model.js';
import { TransferRequest } from './transfer.model.js';

export const getTransferRequests = async (userId: mongoose.Types.ObjectId) => {
  return await TransferRequest.find({ userId });
};

export const createTransferRequest = async (
  userId: mongoose.Types.ObjectId,
  unitId: mongoose.Types.ObjectId,
  description?: string,
) => {
  const unit = await Unit.findById(unitId);
  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  return await new TransferRequest({
    userId,
    unitId,
    description,
    documents: [],
    status: 'pending',
    termsAccepted: false,
  }).save();
};

export const cancelTransferRequest = async (
  transferID: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  const transfer = await TransferRequest.findOne({ _id: transferID, userId });
  if (!transfer) {
    throw new AppError(404, 'Transfer request not found.');
  }
  if (transfer.status !== 'pending') {
    throw new AppError(422, 'Only pending transfer requests can be cancelled.');
  }

  transfer.status = 'cancelled';
  return await transfer.save();
};

export const approveTransferRequest = async (
  transferID: mongoose.Types.ObjectId,
  filters: QueryFilter<ListingType>,
) => {
  const transfer = await TransferRequest.findById(transferID);

  if (!transfer) {
    throw new AppError(404, 'Transfer request not found.');
  }

  const unit = await Unit.findById(transfer.unitId);
  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  const listing = await Listing.findOne(combineFilters({ _id: unit.listingId }, filters));

  if (!listing) {
    throw new AppError(403, 'Forbidden.');
  }

  transfer.status = 'approved';

  return await transfer.save();
};

export const rejectTransferRequest = async (
  transferID: mongoose.Types.ObjectId,
  filters: QueryFilter<ListingType>,
) => {
  const transfer = await TransferRequest.findById(transferID);

  if (!transfer) {
    throw new AppError(404, 'Transfer request not found.');
  }

  const unit = await Unit.findById(transfer.unitId);
  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  const listing = await Listing.findOne(combineFilters({ _id: unit.listingId }, filters));

  if (!listing) {
    throw new AppError(403, 'Forbidden.');
  }

  transfer.status = 'rejected';

  return await transfer.save();
};
