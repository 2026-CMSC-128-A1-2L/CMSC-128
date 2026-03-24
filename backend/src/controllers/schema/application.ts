import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common';

// POST /api/applications
export const CreateApplicationBodySchema = z.object({
  studentID: ObjectIdSchema,
  listingID: ObjectIdSchema,
  preferredRoomType: z.enum(['single', 'double', 'shared']).optional(),
  documentUrls: z.array(z.string()).optional(),
  unitID: ObjectIdSchema.optional(),
  accommodationNoticeUrl: z.string().optional(),
});

// GET /api/applications
export const GetApplicationsQuerySchema = QuerySchema;

export const ApplicationFilterSchema = z.object({
  studentID: ObjectIdSchema.optional(),
  listingID: ObjectIdSchema.optional(),
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
  unitID: ObjectIdSchema.optional(),
});

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
  unitID: ObjectIdSchema.optional(),
});
