import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const GetBookingQuerySchema = z.object({
  studentID: ObjectIdSchema.optional(),
  housingID: ObjectIdSchema.optional(),

  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),

  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),

  message: z.string().optional(),
});

export const CreateBookingBodySchema = z.object({
  studentID: ObjectIdSchema,
  housingID: ObjectIdSchema,

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),

  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),

  message: z.string().optional(),
});
