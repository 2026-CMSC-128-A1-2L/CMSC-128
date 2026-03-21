import z from 'zod';
import { ObjectIdSchema } from './common';

export const CreateApplicationBodySchema = z.object({
  studentID: ObjectIdSchema,
  listingID: ObjectIdSchema,
  preferredRoomType: z.enum(['single', 'double', 'shared']).optional(),
  documentUrls: z.array(z.string()).optional(),
  unitID: ObjectIdSchema.optional(),
  accommodationNoticeUrl: z.string().optional(),
});

export const GetApplicationsQuerySchema = z.object({
  q: z.string().transform((x) => (x ? JSON.parse(x) : {})),
});

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
    ])
    .optional(),
  unitID: ObjectIdSchema.optional(),
});
