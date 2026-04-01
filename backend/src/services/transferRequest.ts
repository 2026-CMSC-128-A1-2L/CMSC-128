import mongoose from 'mongoose';
import { TransferRequest } from '../models/student-actions/TransferRequest';
import { Unit } from '../models/housing/Unit.js';
import { User } from '../models/user/User.js';
import { combineFilters } from '../controllers/middleware';
import { AppError } from '../controllers/error';

export type CreateTransferRequestArguments = {
  studentID: mongoose.Types.ObjectId;
  unitID: mongoose.Types.ObjectId;
  status?: 'pending' | 'approved' | 'cancelled';
  description?: string;
};

export type GetTransferRequestsArguments = {
  studentID?: mongoose.Types.ObjectId;
  unitID?: mongoose.Types.ObjectId;
  status?: 'pending' | 'approved' | 'cancelled';
  description?: string;
};

export const CreateTransferRequest = async ( data: CreateTransferRequestArguments, filters: any ) => {
    //check if ids actually exist and can access
    const unit = await Unit.findOne(combineFilters(filters, { _id: data.unitID }));
    if (!unit) {
      const unitNoFilter = await Unit.findById(data.unitID);
      if (unitNoFilter) {
        throw new AppError(403, 'You are not allowed to create a transfer request for this unit.');
      } else {
        throw new AppError(404, 'Unit not found.');
      }
    }
    //not sure if this checks for all users? inassume ko lang na users a student lang and walang halong manager/landlord/admin dito
    const user = await Unit.findOne(combineFilters(filters, { _id: data.studentID }));
    if (!user) {
      const userNoFilter = await User.findById(data.studentID);
      if (userNoFilter) {
        throw new AppError(403, 'You are not allowed to create a transfer request for this user.');
      } else {
        throw new AppError(404, 'User not found.');
      }
    }
  
    //data is ok, create transfer request
    const newTransferRequest = new TransferRequest({
      studentID: data.studentID,
      unitID: data.unitID,
      status: data.status ?? 'pending',
      description: data.description,
    });
    return await newTransferRequest.save();
};

export const CancelTransferRequest = async (transferRequestId: mongoose.Types.ObjectId, filters: any) => {
    //check if it exists and can access
    const request = await TransferRequest.findOne(combineFilters(filters, { _id: transferRequestId }));
    if (!request){
        const requestNoFilter = await TransferRequest.findById(transferRequestId);
        if (requestNoFilter) {
          throw new AppError(403, 'You are not allowed to cancel this transfer request.');
        } else {
          throw new AppError(404, 'Transfer request not found.');
        }
    }

    //check status if we can cancel
    if (request.status === 'approved') {
        throw new AppError(403, 'Approved transfer requests cannot be cancelled.');
    } else if (request.status === 'cancelled') {
        throw new AppError(403, 'This transfer request is already cancelled.');
    }

    //no issues, cancel transfer request
    request.status = 'cancelled';
    return await request.save();
}