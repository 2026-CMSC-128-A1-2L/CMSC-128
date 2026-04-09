import { Router } from 'express';
import { routeGetBillings, routeCreateBilling, routeGetBilling, routeSubmitBillingPayment, routeUpdateBilling, routeVerifyBillingPayment } from './billing.controller';
import { isSuperAdmin, managerFilter, isVerifiedStudent } from '../../middleware';

const router = Router();

// Billings
// GET /api/billings
router.get('/billings', isSuperAdmin, routeGetBillings);

// POST /api/billings
router.post('/billings', managerFilter('facility', 'manageBillings'), routeCreateBilling);

// GET /api/billings/:billingId
router.get(
  '/billings/:billingId',
  managerFilter('facility', 'manageBillings', true),
  routeGetBilling,
);

// PATCH /api/billings/:billingId
router.patch(
  '/billings/:billingId',
  managerFilter('facility', 'manageBillings', true),
  routeUpdateBilling,
);

// POST /api/billings/:billingId/pay
router.post('/billings/:billingId/pay', isVerifiedStudent, routeSubmitBillingPayment);

// POST /api/billings/:billingId/verify
router.post(
  '/billings/:billingId/verify',
  managerFilter('facility', 'manageBillings'),
  routeVerifyBillingPayment,
);

export default router;
