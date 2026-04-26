import type { RequestHandler } from 'express';
import {
  CreateBillingBodySchema,
  GetBillingsQuerySchema,
  ObjectIdSchema,
  UpdateBillingPaymentRequestBodySchema,
  UpdateBillingRequestBodySchema,
} from 'shared';
import {
  createBilling,
  getBilling,
  getBillings,
  getBillingsSummary,
  getfacilityBilling,
  getUserBillings,
  updateBilling,
  updateBillingPayment,
} from './billing.service';

import { AppError } from '../../error';
import { receiveMessageOnPort } from 'node:worker_threads';

export const routeCreateBilling: RequestHandler = async (req, res, _next) => {
  const params = CreateBillingBodySchema.parse(req.body);
  const billing = await createBilling(params, res.locals.filters);
  res.status(201).json({ data: billing });
};

export const routeGetBillings: RequestHandler = async (req, res, _next) => {
  const params = GetBillingsQuerySchema.parse(req.query);
  const billings = await getBillings(params, res.locals.filters);
  res.status(200).json({ data: billings });
};

export const routeGetBilling: RequestHandler = async (req, res, _next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const billing = await getBilling(billingId, res.locals.filters);
  if (!billing) throw new AppError(404, 'Billing not found');
  res.status(200).json({ data: billing });
};

export const routeUpdateBilling: RequestHandler = async (req, res, _next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const body = UpdateBillingRequestBodySchema.parse(req.body);
  const billing = await updateBilling(billingId, body, res.locals.filters);
  if (!billing) throw new AppError(404, 'Billing not found');
  res.status(200).json({ data: billing });
};

export const routeUpdateBillingPayment: RequestHandler = async (req, res, next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const params = UpdateBillingPaymentRequestBodySchema.parse(req.body);
  const billing = await updateBillingPayment(billingId, params.amount, res.locals.filters);
  res.status(200).json({ data: billing });
};

// GET /users/me/billings
export const routeGetUserBillings: RequestHandler = async (req, res, next) => {
  // using the setUserId middleware, the userId is in params.
  const userId = ObjectIdSchema.parse(req.params.userId);
  res.status(200).json({ data: await getBillings({ userId }, res.locals.filters) });
};

// GET /units/:unitId/billings
export const routeGetUnitBillings: RequestHandler = async (req, res, next) => {
  const unitId = ObjectIdSchema.parse(req.params.unitId);
  res.status(200).json({ data: await getBillings({ unitId }, res.locals.filters) });
};

export const routeGetBillingsSummary: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const billingsSummary = await getBillingsSummary(userId, res.locals.filters);
  res.status(200).json({ data: billingsSummary });
};

export const routeGetFacilityBillingsSummary: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const billingsSummary = await getfacilityBilling(facilityId, req.query, res.locals.filters);
  res.status(200).json({ data: billingsSummary });
};

export const routeGetUserBillingDashboard: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const data = await getUserBillings(userId, req.query, res.locals.filters);
  res.status(200).json({ data });
};
