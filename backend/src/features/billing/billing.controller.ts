import type { RequestHandler } from 'express';
import {
  CreateBillingBodySchema,
  GetBillingsQuerySchema,
  ObjectIdSchema,
  SubmitBillingPaymentArgumentsSchema,
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
  sumbitBillingPayment,
  getBillingsPdf,
} from './billing.service.js';
import { generateBillingPdfBuffer } from './pdf.js';
import { AppError } from '../../error.js';

import assert from 'node:assert';
import { buffer } from 'node:stream/consumers';

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

export const routeUpdateBillingPayment: RequestHandler = async (req, res, _next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const params = UpdateBillingPaymentRequestBodySchema.parse(req.body);
  const billing = await updateBillingPayment(billingId, params.amount, res.locals.filters);
  res.status(200).json({ data: billing });
};

// GET /users/me/billings
export const routeGetUserBillings: RequestHandler = async (req, res, _next) => {
  // using the setUserId middleware, the userId is in params.
  const userId = ObjectIdSchema.parse(req.params.userId);
  res.status(200).json({ data: await getBillings({ userId }, res.locals.filters) });
};

// GET /units/:unitId/billings
export const routeGetUnitBillings: RequestHandler = async (req, res, _next) => {
  const unitId = ObjectIdSchema.parse(req.params.unitId);
  res.status(200).json({ data: await getBillings({ unitId }, res.locals.filters) });
};

// GET /billings/summary
export const routeGetBillingsSummary: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const userId = ObjectIdSchema.parse(req.user._id);
  const billingsSummary = await getBillingsSummary(userId, res.locals.filters);
  res.status(200).json({ data: billingsSummary });
};

export const routeGetFacilityBillingsSummary: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const billingsSummary = await getfacilityBilling(facilityId, req.query, res.locals.filters);
  res.status(200).json({ data: billingsSummary });
};

export const routeGetUserBillingDashboard: RequestHandler = async (req, res, _next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const data = await getUserBillings(userId, req.query, res.locals.filters);
  res.status(200).json({ data });
};

export const routeSubmitBillingPayment: RequestHandler = async (req, res, _next) => {
  const billingId = ObjectIdSchema.parse(req.params.billingId);
  const params = SubmitBillingPaymentArgumentsSchema.parse(req.body);
  const billing = await sumbitBillingPayment(billingId, params, res.locals.filters);
  res.status(200).json({ data: billing });
};

export const routeDownloadBillingPdf: RequestHandler = async (req, res, _next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);

  // const pdfData = await getBillingsPdf(
  //   userId,
  //   req.query,
  //   res.locals.filters
  // );

  // if (!pdfData) {
  //   throw new AppError(404, 'No billing records found for this user.');
  // }

  // --- UPDATED FAKE DATA ---
  const pdfData = {
    studentName: 'Test User',
    studentId: userId,
    dateGenerated: new Date().toLocaleDateString(),
    // Try adding all these variations to see which one your pdf.ts uses:
    billings: [
      { name: 'Monthly Rent', amount: 5000 },
      { name: 'Electricity', amount: 850 },
    ],
    breakdown: [
      // Common name in your useFinance hook
      { name: 'Monthly Rent', amount: 5000 },
      { name: 'Electricity', amount: 850 },
    ],
    items: [
      { description: 'Monthly Rent', amount: 5000 },
      { description: 'Electricity', amount: 850 },
    ],
    totalAmount: 5850,
  };

  const pdf = await generateBillingPdfBuffer(pdfData);
  // Format name
  const safeName = pdfData.studentName ? pdfData.studentName.replace(/\s+/g, '_') : 'User';
  const filename = `Billing_${safeName}.pdf`;

  // Download headers
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${filename}"`,
    'Content-Length': pdf.length,
    'Cache-Control': 'no-cache',
  });

  res.status(200).send(pdf);
};
