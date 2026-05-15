import { Router } from 'express';
import {
  routeGetBookings,
  routeCreateBooking,
  routeCancelBooking,
  routeUpdateBookingStatus,
  routeGetAvailableVisitSlots,
} from './booking.controller.js';
import {
  isSuperAdmin,
  isVerifiedStudent,
  isLoggedIn,
  manageBookingsFilter,
  selfFilter,
} from '../../middleware.js';

const router = Router();

// ============================================================================
// GET /api/bookings
// ============================================================================
router.get('/', isLoggedIn, manageBookingsFilter, routeGetBookings);

// ============================================================================
// GET /api/bookings/facilities/:facilityId/available-slots
// ============================================================================
router.get(
  '/facilities/:facilityId/available-slots',
  isVerifiedStudent,
  routeGetAvailableVisitSlots,
);

// ============================================================================
// POST /api/bookings
// ============================================================================
router.post('/', isVerifiedStudent, routeCreateBooking);

// ============================================================================
// PATCH /api/bookings/:bookingId
// ============================================================================
router.patch('/:bookingId', isLoggedIn, manageBookingsFilter, routeUpdateBookingStatus);

// ============================================================================
// DELETE /api/bookings/:bookingId
//
// Cancels a booking
// ============================================================================
router.delete('/:bookingId', selfFilter, routeCancelBooking);

export default router;
