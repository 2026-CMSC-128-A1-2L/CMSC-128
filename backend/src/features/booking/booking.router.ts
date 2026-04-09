import { Router } from 'express';
import { routeGetBookings, routeCreateBooking, routeUpdateBooking, routeCancelBooking, routeApproveBooking, routeRejectBooking } from './booking.controller';
import { isSuperAdmin, isVerifiedStudent, managerFilter } from '../../middleware';

const router = Router();

// GET /api/bookings
router.get('/bookings', isSuperAdmin, routeGetBookings);
// POST /api/bookings
router.post('/bookings', isVerifiedStudent, routeCreateBooking);
// PATCH /api/bookings/:bookingId
router.patch(
  '/bookings/:bookingId',
  managerFilter('facility', 'manageListings', true),
  routeUpdateBooking,
);
// DELETE /api/bookings/:bookingId
router.delete(
  '/bookings/:bookingId',
  managerFilter('facility', 'manageListings', true),
  routeCancelBooking,
);
// POST /api/bookings/:bookingId/approve
router.post(
  '/bookings/:bookingId/approve',
  managerFilter('facility', 'manageListings'),
  routeApproveBooking,
);
// POST /api/bookings/:bookingId/reject
router.post(
  '/bookings/:bookingId/reject',
  managerFilter('facility', 'manageListings'),
  routeRejectBooking,
);

export default router;
