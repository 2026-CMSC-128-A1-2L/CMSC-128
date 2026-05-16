import { Router } from 'express';
import { isSuperAdmin, manageBillingsFilter, manageListingsFilter } from '../../middleware.js';
import {
  routeGetUnits,
  routeGetUnit,
  routeUpdateUnit,
  routeDeleteUnit,
} from './unit.controller.js';
import { routeGetRentalsByUnit } from '../rental/rental.controller.js';
import { routeGetUnitBillings } from '../billing/billing.controller.js';
import { currentTenantManagerFilter, currentTenantManagerRentalFilter } from './unit.middleware.js';

const router = Router();

// ============================================================================
// GET /api/units
//
// TODO: clarify role of superadmin
// ============================================================================
router.get('/', isSuperAdmin, routeGetUnits);

// ============================================================================
// GET /api/units/:unitId
//
// current tenant, manager, or landlord
// ============================================================================
router.get('/:unitId', currentTenantManagerFilter, routeGetUnit);

// ============================================================================
// PATCH /api/units/:unitId
//
// TODO:
//   Clarify whether to use applications, listings, or a new permission
//
// ============================================================================
router.patch('/:unitId', manageListingsFilter, routeUpdateUnit);

// ============================================================================
// DELETE /api/units/:unitId
//
// TODO:
//   implement soft deletion
//
// ============================================================================
router.delete('/:unitId', manageListingsFilter, routeDeleteUnit);

// GET /api/units/:unitId/rentals
router.get('/:unitId/rentals', currentTenantManagerRentalFilter, routeGetRentalsByUnit);

// GET /api/units/:unitId/billings
router.get('/:unitId/billings', manageBillingsFilter, routeGetUnitBillings);

export default router;
