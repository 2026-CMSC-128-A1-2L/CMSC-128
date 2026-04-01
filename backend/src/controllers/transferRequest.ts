import { RequestHandler } from 'express';
import {
  CreateTransferRequest,
  CreateTransferRequestArguments,
  CancelTransferRequest,
} from '../services/transferRequest.js';
import { 
  CreateTransferBodySchema,
  CancelTransferBodySchema
 } from './schema/transfer.js';
import mongoose from 'mongoose';

export const routeCreateTransferRequest: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = CreateTransferBodySchema.parse(req.body);
  const newTransferRequest = await CreateTransferRequest(params, res.locals.filters ?? {});
  res.status(201).json({ id: newTransferRequest.id });
};

export const routeCancelTransferRequest: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = CancelTransferBodySchema.parse(req.params.transferRequestId);
  const transferID = new mongoose.Types.ObjectId(params.transferRequestID);

  //await CancelTransferRequest(params, res.locals.filters ?? {});
  const cancelTransferRequest = await CancelTransferRequest(transferID, res.locals.filters ?? {});

  res.status(200).json({data: cancelTransferRequest,});
};

