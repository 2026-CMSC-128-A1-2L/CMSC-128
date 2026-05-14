import type { RequestHandler } from 'express';
import assert from 'node:assert';
import { CreateTransferBodySchema, ObjectIdSchema } from 'shared';
import { sendNotification } from '../notification/notification.service.js';
import {
  approveTransferRequest,
  cancelTransferRequest,
  createTransferRequest,
  getTransferRequests,
  rejectTransferRequest,
} from './transfer.service.js';

export const routeGetTransferRequests: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const transferRequests = await getTransferRequests(req.user._id);

  res.status(200).json({
    data: transferRequests,
  });
};
export const routeCreateTransferRequest: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const params = CreateTransferBodySchema.parse(req.body);
  const transferRequest = await createTransferRequest(
    req.user._id,
    params.unitId,
    params.description,
  );

  res.status(201).json({
    data: transferRequest,
  });
};
export const routeCancelTransferRequest: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const transferID = ObjectIdSchema.parse(req.params.transferId);
  const transferRequest = await cancelTransferRequest(transferID, req.user._id);

  res.status(200).json({
    data: transferRequest,
  });
};
export const routeApproveTransferRequest: RequestHandler = async (req, res, _next) => {
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
export const routeRejectTransferRequest: RequestHandler = async (req, res, _next) => {
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
