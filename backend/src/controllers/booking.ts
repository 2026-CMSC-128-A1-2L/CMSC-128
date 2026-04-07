import { RequestHandler } from 'express';
import { sendNotification } from '../services/notifications.js';
import { ObjectIdSchema } from './schema/common.js';
import {
  cancelBooking,
  createBooking,
  getBookings,
  updateBookingStatus,
  updateBooking,
  getBookingsByStudent,
  getBookingsByListing,
} from '../services/booking.js';
import {
  BookingParamsSchema,
  CreateBookingBodySchema,
  GetBookingsQuerySchema,
  UpdateBookingBodySchema,
} from './schema/booking.js';

export const routeCreateBooking: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = CreateBookingBodySchema.parse(req.body);
  const newBooking = await createBooking(params, {});
  res.status(201).json({ id: newBooking._id });
};

export const routeGetBookings: RequestHandler = async (req, res, next) => {
  const params = GetBookingsQuerySchema.parse(req.query);
  const bookings = await getBookings(params, {});
  res.status(200).json({ data: bookings });
};

export const routeApproveBooking: RequestHandler = async (req, res, next) => {
  const bookingId = ObjectIdSchema.parse(req.params.bookingId);
  const updatedBooking = await updateBookingStatus(bookingId, 'approved', res.locals.filters);
  await sendNotification(
    updatedBooking.userId,
    'Visit Booking Approved',
    'Your visit booking has been approved.',
  );
  res.status(200).json({ data: updatedBooking });
};

export const routeRejectBooking: RequestHandler = async (req, res, next) => {
  const bookingId = ObjectIdSchema.parse(req.params.bookingId);
  const updatedBooking = await updateBookingStatus(bookingId, 'rejected', res.locals.filters);
  await sendNotification(
    updatedBooking.userId,
    'Visit Booking Rejected',
    'Your visit booking has been rejected.',
  );
  res.status(200).json({ data: updatedBooking });
}

export const routeUpdateBooking: RequestHandler = async (req, res, next) => {
  const { bookingId } = BookingParamsSchema.parse(req.params);
  const data = UpdateBookingBodySchema.parse(req.body);

  const updated = await updateBooking(bookingId, data);

  res.status(200).json({ data: updated });
};

export const routeCancelBooking: RequestHandler = async (req, res, next) => {
  const { bookingId } = BookingParamsSchema.parse(req.params);

  const cancelled = await cancelBooking(bookingId);

  res.status(200).json({ data: cancelled });
};

export const routeGetVisitBookingsByStudent: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const bookings = await getBookingsByStudent(userId);

  res.status(200).json({ data: bookings });
};

export const routeGetVisitBookingsByListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const bookings = await getBookingsByListing(listingId, res.locals.filters ?? {});

  res.status(200).json({ data: bookings });
};

