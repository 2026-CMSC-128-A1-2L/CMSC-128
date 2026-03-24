import { RequestHandler } from 'express';
import { createBooking, getBookings } from '../services/booking.js';
import { getListingsByFacility } from '../services/listing.js';
import { CreateBookingBodySchema, GetBookingQuerySchema } from './schema/booking.js';
import { ObjectIdSchema } from './schema/common.js';

export const routeCreateBooking: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;
  const params = CreateBookingBodySchema.parse(req.body);
  const newBooking = await createBooking(params, res.locals.filters);
  res.status(201).json({ id: newBooking.id });
};

export const routeGetBookings: RequestHandler = async (req, res, next) => {
  const params = GetBookingQuerySchema.parse(req.query);
  const Billings = await getBookings(params, res.locals.filters);
};
