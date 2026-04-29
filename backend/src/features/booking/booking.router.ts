import { Router } from 'express';
import {
  routeGetBookings,
  routeCreateBooking,
  routeCancelBooking,
  routeUpdateBookingStatus,
} from "./booking.controller.js";
import {
  isSuperAdmin,
  isVerifiedStudent,
  manageListingsFilter,
  selfFilter,
} from "../../middleware.js";

const router = Router();

// ============================================================================
// GET /api/bookings
// ============================================================================
router.get('/', isSuperAdmin, routeGetBookings);

// ============================================================================
// POST /api/bookings
// ============================================================================
router.post('/', isVerifiedStudent, routeCreateBooking);

// ============================================================================
// PATCH /api/bookings/:bookingId
// ============================================================================
router.patch('/:bookingId', manageListingsFilter, routeUpdateBookingStatus);

// ============================================================================
// DELETE /api/bookings/:bookingId
//
// Cancels a booking
// ============================================================================
router.delete('/:bookingId', selfFilter, routeCancelBooking);

export default router;
