import { Router } from 'express';
import { includeSelf, isSuperAdmin, manageListingsFilter } from "../../middleware.js";
import {
  routeGetRentals,
  routeGetRental,
  routeUpdateRental,
  routeMoveIn,
  routeMoveOut,
} from "./rental.controller.js";

const router = Router();

// GET /api/rentals
router.get('/', isSuperAdmin, routeGetRentals);
// GET /api/rentals/:rentalId
router.get('/:rentalId', manageListingsFilter, includeSelf, routeGetRental);
// PATCH /api/rentals/:rentalId
router.patch('/:rentalId', manageListingsFilter, routeUpdateRental);
// POST /api/rentals/:rentalId/move-in
router.post('/:rentalId/move-in', manageListingsFilter, routeMoveIn);
// POST /api/rentals/:rentalId/move-out
router.post('/:rentalId/move-out', manageListingsFilter, routeMoveOut);

// TODO: check what else changes when a rental is deleted
// router.delete('/:rentalId', isSuperAdmin, routeDeleteRental);

export default router;
