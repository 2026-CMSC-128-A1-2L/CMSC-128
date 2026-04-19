import { Router } from 'express';
import {
  routeGetBillings,
  routeCreateBilling,
  routeGetBilling,
  routeSubmitBillingPayment,
  routeUpdateBilling,
  routeVerifyBillingPayment,
} from './billing.controller';
import { isSuperAdmin, managerFilter, selfFilter } from '../../middleware';

const router = Router();

// Billings
// GET /api/billings
router.get('/', isSuperAdmin, routeGetBillings);

// POST /api/billings
router.post('/', managerFilter('facility', 'manageBillings'), routeCreateBilling);

// GET /api/billings/:billingId
router.get('/:billingId', managerFilter('facility', 'manageBillings', true), routeGetBilling);

// PATCH /api/billings/:billingId
router.patch('/:billingId', managerFilter('facility', 'manageBillings', true), routeUpdateBilling);

// POST /api/billings/:billingId/pay
router.post('/:billingId/pay', selfFilter, routeSubmitBillingPayment);

// POST /api/billings/:billingId/verify
router.post(
  '/:billingId/verify',
  managerFilter('facility', 'manageBillings'),
  routeVerifyBillingPayment,
);

export default router;
