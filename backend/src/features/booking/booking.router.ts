import { Router } from 'express';
import {
  routeGetBookings,
  routeCreateBooking,
  routeUpdateBooking,
  routeCancelBooking,
  routeApproveBooking,
  routeRejectBooking,
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
  routeUpdateBooking,
);
// DELETE /api/bookings/:bookingId
router.delete(
  '/:bookingId',
  managerFilter('facility', 'manageListings', true),
  routeCancelBooking,
);
// POST /api/bookings/:bookingId/approve
router.post(
  '/:bookingId/approve',
  managerFilter('facility', 'manageListings'),
  routeApproveBooking,
);
// POST /api/bookings/:bookingId/reject
router.post(
  '/:bookingId/reject',
  managerFilter('facility', 'manageListings'),
  routeRejectBooking,
);

export default router;
