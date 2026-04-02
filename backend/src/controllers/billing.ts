import { RequestHandler } from 'express';
import { createBilling, getBillings, getUnitBillings, getUserBillings } from '../services/billing.js';
import { CreateBillingBodySchema, GetBillingsFilterSchema, UnitParamsSchema } from './schema/billing.js';
import mongoose from 'mongoose';

export const routeCreateBilling: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  // TODO: use userId instead of passing
  const userId = req.user!._id;
  const params = CreateBillingBodySchema.parse(req.body);
  const newBilling = await createBilling(params);
  res.status(201).json({ id: newBilling.id });
};

export const routeGetBilling: RequestHandler = async (req, res, next) => {
  const params = GetBillingsFilterSchema.parse(req.query);
  const billings = await getBillings(params, res.locals.filters);
  res.status(200).json({ data: billings });
};

export const routeUpdateBilling: RequestHandler = async (req, res, next) => {};
export const routeSubmitBillingPayment: RequestHandler = async (req, res, next) => {};
export const routeVerifyBillingPayment: RequestHandler = async (req, res, next) => {};

export const routeGetUserBillings: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;;
  const billings = await getUserBillings(userId,res.locals.filters);
  res.status(200).json({ data: billings });
};

  export const routeGetUnitBillings: RequestHandler = async (req, res, next) => {
    const { unitId } = UnitParamsSchema.parse(req.params);
    const billings = await getUnitBillings(unitId,res.locals.filters);
    return res.status(200).json({ data: billings });
  };

