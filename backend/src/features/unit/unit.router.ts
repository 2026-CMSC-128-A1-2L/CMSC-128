import { Router } from 'express';
import { isSuperAdmin, manageBillingsFilter, manageListingsFilter } from '../../middleware';
import { routeGetUnits, routeGetUnit, routeUpdateUnit, routeDeleteUnit } from './unit.controller';
import { routeGetRentalsByUnit } from '../rental/rental.controller';
import { routeGetUnitBillings } from '../billing/billing.controller';
import { currentTenantManagerFilter } from './unit.middleware';

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
router.get('/:unitId/rentals', manageListingsFilter, routeGetRentalsByUnit);

// GET /api/units/:unitId/billings
router.get('/:unitId/billings', manageBillingsFilter, routeGetUnitBillings);

export default router;
