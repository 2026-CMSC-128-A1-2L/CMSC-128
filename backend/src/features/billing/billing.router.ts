import { Router } from 'express';
import {
  routeGetBillings,
  routeCreateBilling,
  routeGetBilling,
  routeUpdateBilling,
  routeUpdateBillingPayment,
  routeGetBillingsSummary,
} from './billing.controller';
import {
  getBillingId,
  includeSelf,
  isSuperAdmin,
  manageBillingsFilter,
  selfFilter,
} from '../../middleware';
import { createDocumentRouter } from '../document/document.router';
import { Billing } from './billing.model';

const router = Router();

// ============================================================================
// Billings
//
// Billings are created by the manager, to be attached to a rental.
// At the minimum, it only contains the breakdown of the cost.
//
// The tenant then uploads a file showing proof of their payment.
// The manager then verifies the uploaded file, and sets the payment
// amount.
//
// TODO: clarify how partial payment works. This makes one payment have
// multiple documents, which might need to be verified separately.
//
// ============================================================================

// ============================================================================
// GET /api/billings
// ============================================================================
router.get('/', isSuperAdmin, routeGetBillings);

// ============================================================================
// POST /api/billings
// ============================================================================
router.post('/', manageBillingsFilter, routeCreateBilling);

// ============================================================================
// GET /api/billings/:billingId
// ============================================================================
router.get('/:billingId', manageBillingsFilter, includeSelf, routeGetBilling);

// ============================================================================
// PATCH /api/billings/:billingId
//
// Updates the breakdown (and the total amount) and the due date.
// This should only apply when the billing is unpaid.
// ============================================================================
router.patch('/:billingId', manageBillingsFilter, routeUpdateBilling);

// ============================================================================
// POST /api/billings/:billingId/verify
//
// Updates the total amount paid.
//
//  TODO: clarify when this should be available in relation to the files
//  should this be available even though not all documents are verified
//
// ============================================================================
router.post('/:billingId/verify', manageBillingsFilter, routeUpdateBillingPayment);

// ============================================================================
// GET /api/billings/:billingId/documents
//
// Documents for a billings's verification.
// ============================================================================
router.use(
  '/:billingId/documents',
  getBillingId,
  createDocumentRouter(
    selfFilter,
    manageBillingsFilter,
    [manageBillingsFilter, includeSelf],
    Billing,
  ),
);

// ============================================================================
// GET /api/billings/summary
//
// Use this to get information for Landlord Finance page.
// .dashboard to get details for the main dashboard
// .billingCards to get access to data for the cards.
// ============================================================================
router.get('/summary', manageBillingsFilter, includeSelf, routeGetBillingsSummary);

export default router;
