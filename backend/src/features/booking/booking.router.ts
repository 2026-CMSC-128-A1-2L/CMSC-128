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
  manageListingsFilter,
  selfFilter,
} from '../../middleware.js';

const router = Router();

// ============================================================================
// GET /api/bookings
// ============================================================================
router.get('/', isSuperAdmin, routeGetBookings);

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
router.patch('/:bookingId', manageListingsFilter, routeUpdateBookingStatus);

// ============================================================================
// DELETE /api/bookings/:bookingId
//
// Cancels a booking
// ============================================================================
router.delete('/:bookingId', selfFilter, routeCancelBooking);

export default router;
