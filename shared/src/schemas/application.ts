import z from 'zod';
import { DateTimeSchema, ObjectIdSchema, PaginationRequestSchema, QuerySchema } from './common.js';

// POST /api/applications
export const CreateApplicationBodySchema = z.object({
  listingId: ObjectIdSchema,
  leaseDuration: z.enum(['6-months', '12-months']),
  moveInDate: DateTimeSchema,
  message: z.string().nullish(),
});

// GET /api/applications
export const ApplicationFilterSchema = z
  .object({
    userId: ObjectIdSchema.nullish(),
    listingId: ObjectIdSchema.nullish(),
    facilityId: ObjectIdSchema.nullish(),
    status: z.enum(['pending', 'rejected', 'waitlisted', 'approved', 'finalized']).nullish(),
    leaseDuration: z.enum(['6-months', '12-months']).nullish(),
    moveInDate: z
      .object({
        min: DateTimeSchema.nullish(),
        max: DateTimeSchema.nullish(),
      })
      .nullish(),
    unitId: ObjectIdSchema.nullish(),
  })
  .extend(PaginationRequestSchema(50));

export const GetApplicationsQuerySchema = QuerySchema(ApplicationFilterSchema);

// POST /api/applications/:applicationId/assign-unit
export const AssignUnitRequestBodySchema = z.object({
  unitId: ObjectIdSchema,
});

// POST /api/applications/:applicationId/approve
export const ApproveApplicationRequestBodySchema = z.object({
  unitId: ObjectIdSchema,
});
