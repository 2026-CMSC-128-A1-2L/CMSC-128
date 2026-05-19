import type { RequestHandler } from 'express';
import assert from 'node:assert';
import { CreateTransferBodySchema, ObjectIdSchema } from 'shared';
import { sendNotification } from '../notification/notification.service.js';
import {
  approveTransferRequest,
  cancelTransferRequest,
  createTransferRequest,
  getApprovedPasaloListings,
  getApprovedPasaloTransfer,
  getManagedTransferRequestById,
  getManagedTransferRequests,
  getTransferRequests,
  rejectTransferRequest,
} from './transfer.service.js';

export const routeGetApprovedPasaloListings: RequestHandler = async (_req, res, _next) => {
  res.status(200).json({ data: await getApprovedPasaloListings() });
};

export const routeGetApprovedPasaloTransfer: RequestHandler = async (req, res, _next) => {
  const transferID = ObjectIdSchema.parse(req.params.transferId);
  const transfer = await getApprovedPasaloTransfer(transferID);

  if (!transfer) {
    res.status(404).json({ message: 'Pasalo transfer not found.' });
    return;
  }

  res.status(200).json({ data: transfer });
};

export const routeGetTransferRequests: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const transferRequests = await getTransferRequests(req.user._id);

  res.status(200).json({
    data: transferRequests,
  });
};

export const routeGetManagedTransferRequests: RequestHandler = async (req, res, _next) => {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const transferRequests = await getManagedTransferRequests(res.locals.filters ?? {}, status);

  res.status(200).json({
    data: transferRequests,
  });
};

export const routeGetManagedTransferRequest: RequestHandler = async (req, res, _next) => {
  const transferID = ObjectIdSchema.parse(req.params.transferId);
  const transferRequest = await getManagedTransferRequestById(
    transferID,
    res.locals.filters ?? {},
  );

  if (!transferRequest) {
    res.status(404).json({ message: 'Transfer request not found.' });
    return;
  }

  res.status(200).json({
    data: transferRequest,
  });
};

export const routeCreateTransferRequest: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const params = CreateTransferBodySchema.parse(req.body);
  const transferRequest = await createTransferRequest(
    req.user._id,
    params.unitId,
    {
      reasonCategory: params.reasonCategory,
      intendedTransferDate: params.intendedTransferDate,
      description: params.description,
      transferFee: params.transferFee,
      depositHandling: params.depositHandling,
      advanceRentStatus: params.advanceRentStatus,
      documents: params.documents,
      termsAccepted: params.termsAccepted,
    },
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
