import z from 'zod';
import { ObjectIdSchema } from './common.js';

// GET /visits
export const GetBookingsQuerySchema = z.object({
  userId: ObjectIdSchema.optional(),
  housingId: ObjectIdSchema.optional(),
  startDate: z.iso
    .date()
    .transform((x) => new Date(x))
    .optional(),
  endDate: z.iso
    .date()
    .transform((x) => new Date(x))
    .optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
  message: z.string().optional(),
});

// GET /visits/:visitId
export const GetBookingParamsSchema = z.object({
  visitId: ObjectIdSchema,
});

// POST /visits
export const CreateBookingBodySchema = z.object({
  userId: ObjectIdSchema,
  housingId: ObjectIdSchema,
  startDate: z.iso.datetime().transform((x) => new Date(x)),
  endDate: z.iso.datetime().transform((x) => new Date(x)),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).default('pending'),
  message: z.string().optional(),
});

// PATCH /bookings/:bookingId
export const UpdateBookingBodySchema = z.object({
  startDate: z.iso.datetime().transform((x) => new Date(x)).optional(),
  endDate: z.iso.datetime().transform((x) => new Date(x)).optional(),
  message: z.string().optional(),
});

export const BookingParamsSchema = z.object({
  bookingId: ObjectIdSchema,
});
