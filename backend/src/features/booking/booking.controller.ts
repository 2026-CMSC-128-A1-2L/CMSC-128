import type { RequestHandler } from 'express';
import {
  CreateBookingBodySchema,
  GetBookingsQuerySchema,
  ObjectIdSchema,
  UpdateBookingStatusBodySchema,
} from 'shared';
import { createBooking, getBookings, cancelBooking, updateBookingStatus } from "./booking.service.js";
import { AppError } from "../../error.js";

export const routeCreateBooking: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = CreateBookingBodySchema.parse(req.body);
  const newBooking = await createBooking({ ...params, userId }, res.locals.filters);
  res.status(201).json({ id: newBooking._id });
};

export const routeGetBookings: RequestHandler = async (req, res, next) => {
  const params = GetBookingsQuerySchema.parse(req.query);
  const bookings = await getBookings(params, res.locals.filters);
  res.status(200).json({ data: bookings });
};

export const routeUpdateBookingStatus: RequestHandler = async (req, res, next) => {
  const bookingId = ObjectIdSchema.parse(req.params.bookingId);
  const data = UpdateBookingStatusBodySchema.parse(req.body);
  const updated = await updateBookingStatus(bookingId, data.status, res.locals.filters);
  if (!updated) throw new AppError(404, 'Booking not found.');

  res.status(200).json({ data: updated });
};

export const routeCancelBooking: RequestHandler = async (req, res, next) => {
  const bookingId = ObjectIdSchema.parse(req.params.bookingId);
  const cancelled = await cancelBooking(bookingId);
  if (!cancelled) throw new AppError(404, 'Booking not found.');

  res.status(200).json({ data: cancelled });
};

export const routeGetVisitBookingsByStudent: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const bookings = await getBookings({ userId }, res.locals.filters);

  res.status(200).json({ data: bookings });
};

export const routeGetVisitBookingsByFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const bookings = await getBookings({ facilityId }, res.locals.filters);

  res.status(200).json({ data: bookings });
};
