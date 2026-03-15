import z from 'zod';
import { LocationSchema, ObjectIdSchema } from './common';

export const CreateFacilityBodySchema = z.object({
  managerID: ObjectIdSchema.optional(),

  name: z.string(),
  type: z.enum(['on-campus', 'off-campus', 'partner housing']),
  location: LocationSchema.optional(),

  applicationCloseDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),
  applicationOpenDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),

  documentsUrl: z.string().optional(),
});

export const UpdateFacilityBodySchema = z.object({
  managerID: ObjectIdSchema.optional(),
  name: z.string().optional(),
  type: z.enum(['on-campus', 'off-campus', 'partner housing']).optional(),
  location: LocationSchema.optional(),

  applicationCloseDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),
  applicationOpenDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),

  documentsUrl: z.string().optional(),
});
