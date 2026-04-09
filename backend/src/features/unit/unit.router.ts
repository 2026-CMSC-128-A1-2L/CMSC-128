import { Router } from 'express';
import { isSuperAdmin, currentTenantManagerFilter, managerFilter } from '../../middleware';
import { routeGetUnits, routeGetUnit, routeUpdateUnit, routeDeleteUnit } from './unit.controller';
import { routeGetRentalsByUnit } from '../rental/rental.controller';
import { routeGetUnitBillings } from '../billing/billing.controller';

const router = Router();

// GET /api/units
//
// TODO: clarify role of superadmin
router.get('/', isSuperAdmin, routeGetUnits);

// TODO: applications or listings permission

// GET /api/units/:unitId
//
// current tenant, manager, or landlord
router.get('/:unitId', currentTenantManagerFilter, routeGetUnit);

// PATCH /api/units/:unitId
router.patch('/:unitId', managerFilter('listing', 'manageListings'), routeUpdateUnit);

// DELETE /api/units/:unitId
router.delete('/:unitId', managerFilter('listing', 'manageListings'), routeDeleteUnit);

// GET /api/units/:unitId/rentals
router.get(
  '/:unitId/rentals',
  managerFilter('facility', 'manageListings'),
  routeGetRentalsByUnit,
);

// GET /api/units/:unitId/billings
router.get(
  '/:unitId/billings',
  managerFilter('facility', 'manageBillings'),
  routeGetUnitBillings,
);

export default router;
