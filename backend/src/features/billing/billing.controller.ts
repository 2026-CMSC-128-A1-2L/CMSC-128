import type { RequestHandler } from 'express';
import {
  CreateBillingBodySchema,
  GetBillingsFilterSchema,
  ObjectIdSchema,
  UpdateBillingBodySchema,
} from 'shared';
import { sendNotification } from '../notification/notification.service';
import {
  createBilling,
  getBilling,
  getBillings,
  submitBillingPayment,
  updateBilling,
  verifyBillingPayment,
} from './billing.service';

export const routeCreateBilling: RequestHandler = async (req, res, next) => {
  const params = CreateBillingBodySchema.parse(req.body);
  const newBilling = await createBilling(params);
  await sendNotification(
    params.userId,
    'New Billing Created',
    `A new billing of type ${params.paymentType} has been created. Due date: ${params.dueDate.toISOString().split('T')[0]}.`,
  );
  res.status(201).json({ id: newBilling.id });
};

export const routeGetBillings: RequestHandler = async (req, res, next) => {
  const params = GetBillingsFilterSchema.parse(req.query);
  const billings = await getBillings(params, res.locals.filters);
  res.status(200).json({ data: billings });
};

export const routeGetBilling: RequestHandler = async (req, res, next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const billing = getBilling(billingId, res.locals.filters);
  if (!billing) {
    res.status(404).json({ message: 'Billing not found' });
    return;
  }
  res.status(200).json({ data: billing });
};

export const routeUpdateBilling: RequestHandler = async (req, res, next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const body = UpdateBillingBodySchema.parse(req.body);
  const billing = updateBilling(billingId, body, res.locals.filters);
  if (!billing) {
    res.status(404).json({ message: 'Billing not found' });
    return;
  }
  res.status(200).json({ data: billing });
};

export const routeSubmitBillingPayment: RequestHandler = async (req, res, next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const params = UpdateBillingBodySchema.parse(req.body);

  const updatedBilling = await submitBillingPayment(billingId, params, res.locals.filters);
  res.status(200).json({ data: updatedBilling });
};

export const routeVerifyBillingPayment: RequestHandler = async (req, res, next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const params = UpdateBillingBodySchema.parse(req.body);

  const updatedBilling = await verifyBillingPayment(billingId, params, res.locals.filters);
  // TODO notifs
  res.status(200).json({ data: updatedBilling });
};

export const routeGetUserBillings: RequestHandler = async (req, res, next) => {};
export const routeGetUnitBillings: RequestHandler = async (req, res, next) => {};
