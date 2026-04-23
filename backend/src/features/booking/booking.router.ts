import { Router } from 'express';
import {
  routeGetBookings,
  routeCreateBooking,
  routeCancelBooking,
  routeUpdateBookingStatus,
} from './booking.controller';
import { isSuperAdmin, isVerifiedStudent, managerFilter } from '../../middleware';

const router = Router();

// GET /api/bookings
router.get('/', isSuperAdmin, routeGetBookings);
// POST /api/bookings
router.post('/', isVerifiedStudent, routeCreateBooking);
// PATCH /api/bookings/:bookingId
router.patch(
  '/:bookingId',
  managerFilter('facility', 'manageListings', true),
  routeUpdateBookingStatus,
);
// DELETE /api/bookings/:bookingId
router.delete('/:bookingId', managerFilter('facility', 'manageListings', true), routeCancelBooking);

export default router;
