import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const CreateRentalBodySchema = z.object({
  studentID: ObjectIdSchema,
  unitID: ObjectIdSchema,
  applicationID: ObjectIdSchema.optional(),
  status: z.enum(['active', 'ended', 'on_waitlist', 'inactive']),
  expectedMoveInDate: z.iso.date().optional(),
  expectedMoveOutDate: z.iso.date().optional(),
  actualMoveInDate: z.iso.date().optional(),
  actualMoveOutDate: z.iso.date().optional(),
});

export const UpdateRentalBodySchema = z.object({
  status: z.enum(['active', 'ended', 'on_waitlist', 'inactive']).optional(),
  expectedMoveInDate: z.iso.date().optional(),
  expectedMoveOutDate: z.iso.date().optional(),
  actualMoveInDate: z.iso.date().optional(),
  actualMoveOutDate: z.iso.date().optional(),
});

export const GetRentalsQuerySchema = z.object({
  q: z.string().transform((x) => (x ? JSON.parse(x) : {})),
});

export const RentalFilterSchema = z.object({
  studentID: ObjectIdSchema.optional(),
  unitID: ObjectIdSchema.optional(),
  status: z.enum(['active', 'ended', 'on_waitlist', 'inactive']).optional(),
});

export const RentalParamsSchema = z.object({
  rentalId: ObjectIdSchema,
});
