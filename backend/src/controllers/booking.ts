import { RequestHandler } from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../services/booking.js';
import { sendNotification } from '../services/notifications.js';
import { CreateBookingBodySchema, GetBookingsQuerySchema } from './schema/booking.js';
import { ObjectIdSchema } from './schema/common.js';

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

export const routeUpdateBooking: RequestHandler = async (req, res, next) => {};
export const routeCancelBooking: RequestHandler = async (req, res, next) => {};

export const routeApproveBooking: RequestHandler = async (req, res, next) => {
  const bookingId = ObjectIdSchema.parse(req.params.bookingId);
  const updatedBooking = await updateBookingStatus(bookingId, 'approved', res.locals.filters);
  await sendNotification(updatedBooking.studentId, 'Visit Booking Approved', 'Your visit booking has been approved.');
  res.status(200).json({ data: updatedBooking });
};

export const routeRejectBooking: RequestHandler = async (req, res, next) => {
  const bookingId = ObjectIdSchema.parse(req.params.bookingId);
  const updatedBooking = await updateBookingStatus(bookingId, 'rejected', res.locals.filters);
  await sendNotification(updatedBooking.studentId, 'Visit Booking Rejected', 'Your visit booking has been rejected.');
  res.status(200).json({ data: updatedBooking });
};
