import { RequestHandler } from 'express';
import { getTransferRequests, approveTransferRequest, rejectTransferRequest } from '../services/transfer';
import { ObjectIdSchema } from './schema/common.js';

export const routeGetTransferRequests: RequestHandler = async (req, res, next) => {
  const transferRequests = await getTransferRequests(req.user!._id);

  res.status(200).json({
    data: transferRequests,
  });
};
export const routeCreateTransferRequest: RequestHandler = async (req, res, next) => {};
export const routeCancelTransferRequest: RequestHandler = async (req, res, next) => {};
export const routeApproveTransferRequest: RequestHandler = async (req, res, next) => {
  const transferID = ObjectIdSchema.parse(req.params.transferId);

  const updatedTransfer = await approveTransferRequest(
    transferID,
    res.locals.filters ?? {},
  );

  res.status(200).json({
    data: updatedTransfer,
  });
};
export const routeRejectTransferRequest: RequestHandler = async (req, res, next) => {
  const transferID = ObjectIdSchema.parse(req.params.transferId);

  const updatedTransfer = await rejectTransferRequest(
    transferID,
    res.locals.filters ?? {},
  );

  res.status(200).json({
    data: updatedTransfer,
  });
};
