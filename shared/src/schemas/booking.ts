import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';

// POST /visits
export const CreateBookingBodySchema = z.object({
  facilityId: ObjectIdSchema,
  startDate: z.iso.datetime().transform((x) => new Date(x)),
  endDate: z.iso.datetime().transform((x) => new Date(x)),
  message: z.string().optional(),
});

// PATCH /visits/:visitId
export const UpdateBookingBodySchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
  startDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  endDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  message: z.string().optional(),
});

// GET /visits
export const BookingFilterSchema = z.object({
  userId: ObjectIdSchema.optional(),
  facilityId: ObjectIdSchema.optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
});

export const GetBookingsQuerySchema = QuerySchema(BookingFilterSchema);
