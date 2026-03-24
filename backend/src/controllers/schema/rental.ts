import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';

// PATCH /rentals/:rentalId
export const UpdateRentalBodySchema = z.object({
  status: z.enum(['active', 'ended', 'on_waitlist', 'inactive']).optional(),
  expectedMoveInDate: z.iso.date().transform(x => new Date(x)).optional(),
  expectedMoveOutDate: z.iso.date().transform(x => new Date(x)).optional(),
  actualMoveInDate: z.iso.date().transform(x => new Date(x)).optional(),
  actualMoveOutDate: z.iso.date().transform(x => new Date(x)).optional(),
});

// GET /rentals
export const GetRentalsQuerySchema = QuerySchema;

export const RentalFilterSchema = z.object({
  studentId: ObjectIdSchema.optional(),
  unitId: ObjectIdSchema.optional(),
  status: z.enum(['active', 'ended', 'on_waitlist', 'inactive']).optional(),
});

// GET /rentals/:rentalId
export const RentalParamsSchema = z.object({
  rentalId: ObjectIdSchema,
});
