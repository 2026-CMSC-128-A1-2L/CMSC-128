import type mongoose from 'mongoose';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { Listing } from '../listing/listing.model.js';
import { Unit } from '../unit/unit.model.js';
import { TransferRequest } from './transfer.model.js';

export const getTransferRequests = async (userId: mongoose.Types.ObjectId) => {
  return await TransferRequest.find({ userId });
};

export const approveTransferRequest = async (transferID: mongoose.Types.ObjectId, filters: any) => {
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

export const rejectTransferRequest = async (transferID: mongoose.Types.ObjectId, filters: any) => {
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
