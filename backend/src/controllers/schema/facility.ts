import z from 'zod';
import { LocationSchema, ObjectIdSchema, QuerySchema } from './common';
import { FACILITY_TYPES } from '../../constants';

// POST /api/facilities
export const CreateFacilityBodySchema = z.object({
  managerId: ObjectIdSchema.optional(),
  name: z.string(),
  type: z.enum(FACILITY_TYPES),
  location: LocationSchema.optional(),
  applicationCloseDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  applicationOpenDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  documentsUrl: z.string().optional(),
});

// PATCH /api/facilities
export const UpdateFacilityBodySchema = z.object({
  managerId: ObjectIdSchema.optional(),
  name: z.string().optional(),
  type: z.enum(FACILITY_TYPES).optional(),
  location: LocationSchema.optional(),
  applicationCloseDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  applicationOpenDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),
  documentsUrl: z.string().optional(),
});

// GET /api/facilities/:facilityId
export const GetFacilityParamsSchema = z.object({
  facilityId: ObjectIdSchema,
});

// GET /api/facilities
export const GetFacilitiesQuerySchema = QuerySchema;

export const FacilityFilterSchema = z.object({
  landlordId: ObjectIdSchema.optional(),
  managerId: ObjectIdSchema.optional(),
  type: z.enum(FACILITY_TYPES).optional(),
});
