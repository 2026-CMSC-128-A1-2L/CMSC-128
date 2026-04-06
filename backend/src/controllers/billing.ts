import { RequestHandler } from 'express';
import { createBilling, getBillings } from '../services/billing.js';
import { sendNotification } from '../services/notifications.js';
import { CreateBillingBodySchema, GetBillingsFilterSchema } from './schema/billing.js';

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

export const routeGetBilling: RequestHandler = async (req, res, next) => {};
export const routeUpdateBilling: RequestHandler = async (req, res, next) => {};
export const routeSubmitBillingPayment: RequestHandler = async (req, res, next) => {};
export const routeVerifyBillingPayment: RequestHandler = async (req, res, next) => {};
export const routeGetUserBillings: RequestHandler = async (req, res, next) => {};
export const routeGetUnitBillings: RequestHandler = async (req, res, next) => {};
