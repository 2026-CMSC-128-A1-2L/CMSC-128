import z from 'zod';
import { LocationSchema, ObjectIdSchema, QuerySchema } from './common';
import { FACILITY_TYPES } from '../../constants';

const ManagerPermissionSchema = z.object({
  manageBillings: z.boolean().default(false),
  manageApplications: z.boolean().default(false),
  manageListings: z.boolean().default(false),
});

const ManagerEntrySchema = z.object({
  userId: ObjectIdSchema,
  permissions: ManagerPermissionSchema,
});

// POST /api/facilities
export const CreateFacilityBodySchema = z.object({
  managers: z.array(ManagerEntrySchema).optional(),
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
  managers: z.array(ManagerEntrySchema).optional(),
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
