import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const CreateVisitBodySchema = z.object({
  housingID: ObjectIdSchema,
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  message: z.string().optional(),
});

export const UpdateVisitBodySchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  message: z.string().optional(),
});

export const GetVisitsQuerySchema = z.object({
  q: z.string().transform((x) => (x ? JSON.parse(x) : {})),
});

export const VisitFilterSchema = z.object({
  studentID: ObjectIdSchema.optional(),
  housingID: ObjectIdSchema.optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
});

export const VisitParamsSchema = z.object({
  visitId: ObjectIdSchema,
});
