import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common';

// POST /api/applications
export const CreateApplicationBodySchema = z.object({
  userId: ObjectIdSchema,
  listingId: ObjectIdSchema,
  preferredRoomType: z.enum(['single', 'double', 'shared']).optional(),
  documentUrls: z.array(z.string()).optional(),
  unitId: ObjectIdSchema.optional(),
  accommodationNoticeUrl: z.string().optional(),
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

// PATCH /api/applications
export const UpdateApplicationBodySchema = z.object({
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
  documentUrls: z.array(z.string()).optional(),
  unitId: ObjectIdSchema.optional(),
});
