import { RequestHandler } from 'express';
import { createBilling, getBillings } from '../services/billing.js';
import { CreateBillingBodySchema, GetBillingsFilterSchema, UpdateBillingBodySchema } from './schema/billing.js';
import { Billing } from '../models/student-actions/Billing.js';

export const routeCreateBilling: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  // TODO: use userId instead of passing
  const userId = req.user!._id;
  const params = CreateBillingBodySchema.parse(req.body);
  const newBilling = await createBilling(params);
  res.status(201).json({ id: newBilling.id });
};

export const routeGetBillings: RequestHandler = async (req, res, next) => {
  const params = GetBillingsFilterSchema.parse(req.query);
  const billings = await getBillings(params, res.locals.filters);
  res.status(200).json({ data: billings });
};

export const routeGetBilling: RequestHandler = async (req, res, next) => {
  const { billingId } = req.params;
  const billing = await Billing.findById(billingId);
  if (!billing) {
    res.status(404).json({ message: 'Billing not found' });
    return;
  }
  res.status(200).json({ data: billing });
};

export const routeUpdateBilling: RequestHandler = async (req, res, next) => {
  const { billingId } = req.params;
  const params = UpdateBillingBodySchema.parse(req.body);
  const billing = await Billing.findByIdAndUpdate(
    billingId,
    { $set: params },
    { new: true, runValidators: true }
  );
  if (!billing) {
    res.status(404).json({ message: 'Billing not found' });
    return;
  }
  res.status(200).json({ data: billing });
};

export const routeSubmitBillingPayment: RequestHandler = async (req, res, next) => {};
export const routeVerifyBillingPayment: RequestHandler = async (req, res, next) => {};
export const routeGetUserBillings: RequestHandler = async (req, res, next) => {};
export const routeGetUnitBillings: RequestHandler = async (req, res, next) => {};
