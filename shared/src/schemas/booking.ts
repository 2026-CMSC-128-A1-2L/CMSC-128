import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';
import { BOOKING_STATUS } from '../constants.js';

// POST /visits
export const CreateBookingBodySchema = z.object({
  facilityId: ObjectIdSchema,
  startDate: z.iso.datetime().transform((x) => new Date(x)),
  endDate: z.iso.datetime().transform((x) => new Date(x)),
  message: z.string().optional(),
});

// PATCH /visits/:visitId
export const UpdateBookingStatusBodySchema = z.object({
  status: z.enum(BOOKING_STATUS),
});

// GET /visits
export const BookingFilterSchema = z
  .object({
    userId: ObjectIdSchema,
    facilityId: ObjectIdSchema,
    status: z.enum(BOOKING_STATUS),
  })
  .partial();

export const GetBookingsQuerySchema = QuerySchema(BookingFilterSchema);
