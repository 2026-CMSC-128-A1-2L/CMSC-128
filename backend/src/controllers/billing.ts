import { RequestHandler } from 'express';
import {
  createBilling,
  getBillings
} from '../services/billing.js';
import { CreateBillingBodySchema, GetBillingsQuerySchema } from './schema/billing.js';
import { ObjectIdSchema } from './schema/common.js';

export const routeCreateBilling: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;
  const params = CreateBillingBodySchema.parse(req.body);

  const newBilling = await createBilling(params);
  res.status(201).json({ id: newBilling.id });
}

export const routeGetBillings: RequestHandler = async (req, res, next) => {
  const params = GetBillingsQuerySchema.parse(req.query);
  const Billings = await getBillings(params, res.locals.filters);
}

export const routeGetBilling: RequestHandler = async (req, res, next) => { }
export const routeUpdateBilling: RequestHandler = async (req, res, next) => { }
export const routeSubmitBillingPayment: RequestHandler = async (req, res, next) => { }
export const routeVerifyBillingPayment: RequestHandler = async (req, res, next) => { }
export const routeGetUserBillings: RequestHandler = async (req, res, next) => { }
export const routeGetUnitBillings: RequestHandler = async (req, res, next) => { }
