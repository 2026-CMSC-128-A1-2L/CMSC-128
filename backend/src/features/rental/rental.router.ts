import { Router } from 'express';
import { isSuperAdmin, managerFilter } from '../../middleware';
import {
  routeGetRentals,
  routeGetRental,
  routeUpdateRental,
  routeMoveIn,
  routeMoveOut,
} from './rental.controller';

const router = Router();

// GET /api/rentals
router.get('/', isSuperAdmin, routeGetRentals);
// GET /api/rentals/:rentalId
router.get('/:rentalId', managerFilter('facility', 'manageListings', true), routeGetRental);
// PATCH /api/rentals/:rentalId
router.patch('/:rentalId', managerFilter('facility', 'manageListings'), routeUpdateRental);
// POST /api/rentals/:rentalId/move-in
router.post('/:rentalId/move-in', managerFilter('facility', 'manageListings'), routeMoveIn);
// POST /api/rentals/:rentalId/move-out
router.post('/:rentalId/move-out', managerFilter('facility', 'manageListings'), routeMoveOut);

// TODO: check what else changes when a rental is deleted
// router.delete('/:rentalId', isSuperAdmin, routeDeleteRental);

export default router;
