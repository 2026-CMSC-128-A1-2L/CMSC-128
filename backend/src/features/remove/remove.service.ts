import mongoose from 'mongoose';
import { AppError } from '../../error.js';
import { RemovalRequest } from './remove.model.js';
import { User } from '../user/user.model.js';
import { Rental } from '../rental/rental.model.js';
import { Unit } from '../unit/unit.model.js';

export type CreateRemovalRequestArgs = {
  landlordId: mongoose.Types.ObjectId;
  tenantId?: string;
  tenantDisplayName: string;
  tenantEmail: string;
  facilityName: string;
  reasons: {
    backedOut: boolean;
    noDocuments: boolean;
    other: boolean;
    otherReason?: string;
  };
};

export const getRequests = async () => {
  const requests = await RemovalRequest.find()
    .populate('landlordId', 'firstName middleName lastName emails')
    .sort({ createdAt: -1 })
    .lean();

  return requests;
};

export const createRequest = async (data: CreateRemovalRequestArgs) => {
  const request = await RemovalRequest.create(data);
  return request;
};

export const approveRequest = async (requestId: mongoose.Types.ObjectId) => {
  const request = await RemovalRequest.findById(requestId);
  if (!request) throw new AppError(404, 'Removal request not found.');
  if (request.status !== 'pending') throw new AppError(400, 'Request is not pending.');

  const userId = request.tenantId
    ? new mongoose.Types.ObjectId(request.tenantId as unknown as string)
    : null;

  let tenantUser = null;
  if (userId) {
    tenantUser = await User.findById(userId);
  }
  if (!tenantUser) {
    tenantUser = await User.findOne({ emails: request.tenantEmail });
  }
  if (!tenantUser) throw new AppError(404, 'Tenant user not found.');

  const activeRental = await Rental.findOne({
    userId: tenantUser._id,
    status: { $in: ['active', 'inactive'] },
  });
  if (!activeRental) throw new AppError(404, 'No active rental found for this tenant.');

  activeRental.status = 'ended';
  activeRental.actualMoveOutDate = new Date();
  await activeRental.save();

  const unit = await Unit.findById(activeRental.unitId);
  if (unit) {
    unit.currentRentals = unit.currentRentals.filter(
      (id) => id.toString() !== activeRental._id.toString(),
    );
    unit.isAvailable = unit.currentRentals.length < unit.capacity;
    await unit.save();
  }

  request.status = 'approved';
  await request.save();
  return request;
};

export const rejectRequest = async (requestId: mongoose.Types.ObjectId) => {
  const request = await RemovalRequest.findById(requestId);
  if (!request) throw new AppError(404, 'Removal request not found.');
  if (request.status !== 'pending') throw new AppError(400, 'Request is not pending.');

  request.status = 'rejected';
  await request.save();
  return request;
};
