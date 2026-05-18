import type { RequestHandler } from 'express';
import {
  ObjectIdSchema,
  CreateRemovalRequestBodySchema,
} from 'shared';
import {
  getRequests,
  createRequest,
  approveRequest,
  rejectRequest,
} from './remove.service.js';

export const routeGetRequests: RequestHandler = async (req, res) => {
  const requests = await getRequests();
  res.status(200).json({ data: requests });
};

export const routeCreateRemovalRequest: RequestHandler = async (req, res) => {
  const body = CreateRemovalRequestBodySchema.parse(req.body);

  const request = await createRequest({
    landlordId: req.user!._id,
    ...body,
  });

  res.status(201).json({ id: request.id });
};

export const routeApproveRequest: RequestHandler = async (req, res) => {
  const requestId = ObjectIdSchema.parse(req.params.requestId);
  const resolved = await approveRequest(requestId);
  res.status(200).json({ data: resolved });
};

export const routeRejectRequest: RequestHandler = async (req, res) => {
  const requestId = ObjectIdSchema.parse(req.params.requestId);
  const resolved = await rejectRequest(requestId);
  res.status(200).json({ data: resolved });
};
