import { RequestHandler } from 'express';
import { createBooking, getBookings } from '../services/booking.js';
import { CreateBookingBodySchema, GetBookingsQuerySchema } from './schema/booking.js';

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

export const routeUpdateBooking: RequestHandler = async (req, res, next) => {};
export const routeCancelBooking: RequestHandler = async (req, res, next) => {};
export const routeApproveBooking: RequestHandler = async (req, res, next) => {};
export const routeRejectBooking: RequestHandler = async (req, res, next) => {};
