import { RequestHandler } from 'express';
import { ObjectIdSchema } from 'shared';
import { sendNotification } from '../notification/notification.service';
import { getTransferRequests, approveTransferRequest, rejectTransferRequest } from './transfer.service';

export const routeGetTransferRequests: RequestHandler = async (req, res, next) => {
  const transferRequests = await getTransferRequests(req.user!._id);

  res.status(200).json({
    data: transferRequests,
  });
};
export const routeCreateTransferRequest: RequestHandler = async (req, res, next) => { };
export const routeCancelTransferRequest: RequestHandler = async (req, res, next) => { };
export const routeApproveTransferRequest: RequestHandler = async (req, res, next) => {
  const transferID = ObjectIdSchema.parse(req.params.transferId);

  const updatedTransfer = await approveTransferRequest(transferID, res.locals.filters ?? {});

  await sendNotification(
    updatedTransfer.userId,
    'Transfer Request Approved',
    'Your transfer request has been approved.',
  );

  res.status(200).json({
    data: updatedTransfer,
  });
};
export const routeRejectTransferRequest: RequestHandler = async (req, res, next) => {
  const transferID = ObjectIdSchema.parse(req.params.transferId);

  const updatedTransfer = await rejectTransferRequest(transferID, res.locals.filters ?? {});

  await sendNotification(
    updatedTransfer.userId,
    'Transfer Request Rejected',
    'Your transfer request has been rejected.',
  );

  res.status(200).json({
    data: updatedTransfer,
  });
};
