import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common';

// POST /api/applications
export const CreateApplicationBodySchema = z.object({
  listingId: ObjectIdSchema,
});

// GET /api/applications
export const ApplicationFilterSchema = z.object({
  userId: ObjectIdSchema.optional(),
  listingId: ObjectIdSchema.optional(),
  preferredRoomType: z.enum(['single', 'double', 'shared']).optional(),
  status: z
    .enum([
      'pending',
      'manager-approved',
      'manager-rejected',
      'manager-waitlisted',
      'landlord-rejected',
      'landlord-approved',
      'landlord-waitlisted',
      'contract-signed',
    ])
    .optional(),
  unitId: ObjectIdSchema.optional(),
});

export const GetApplicationsQuerySchema = QuerySchema(ApplicationFilterSchema);

// POST /api/applications/:applicationId/assign-unit
export const UpdateApplicationBodySchema = z.object({
  unitId: ObjectIdSchema,
});
