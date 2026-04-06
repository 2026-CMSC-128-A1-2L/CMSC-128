import { RequestHandler } from 'express';
import {
  approveBooking,
  cancelBooking,
  createBooking,
  getBookings,
  rejectBooking,
  updateBooking,
} from '../services/booking.js';
import {
  BookingParamsSchema,
  CreateBookingBodySchema,
  GetBookingsQuerySchema,
  UpdateBookingBodySchema,
} from './schema/booking.js';

export const routeCreateBooking: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;
  const params = CreateBookingBodySchema.parse(req.body);
  const newBooking = await createBooking(params);
  res.status(201).json({ id: newBooking._id });
};

export const routeGetBookings: RequestHandler = async (req, res, next) => {
  const params = GetBookingsQuerySchema.parse(req.query);
  const bookings = await getBookings(params);
  res.status(200).json({ data: bookings });
};

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

export const routeApproveBooking: RequestHandler = async (req, res, next) => {
  const { bookingId } = BookingParamsSchema.parse(req.params);

  const approved = await approveBooking(bookingId, res.locals.filters ?? {});

  res.status(200).json({ data: approved });
};

export const routeRejectBooking: RequestHandler = async (req, res, next) => {
  const { bookingId } = BookingParamsSchema.parse(req.params);

  const rejected = await rejectBooking(bookingId, res.locals.filters ?? {});

  res.status(200).json({ data: rejected });
};
