import z from 'zod';
import { ObjectIdSchema, QuerySchema, RangeSchema } from './common';
import { DOCUMENT_STATUS, FACILITY_TYPES, FacilityType, ROOM_TYPES } from '../constants';

const DateTimeSchema = z.iso.datetime().transform((x) => new Date(x));

const FacilityTypeSchema: z.ZodType<FacilityType> = z.enum(FACILITY_TYPES);

const DocumentSchema = z.object({
  // Name of the document used as path segment in the URL.
  docId: z.string(),

  // Name of the document used to show to the user.
  name: z.string(),
  status: z.enum(DOCUMENT_STATUS).default('pending'),

  // Only used when rejected, as rejection message, but this it is not enforced
  // in the database, so this is kept as is.
  message: z.string().optional(),

  // This information is enough to fetch the file from the object store with
  // no additional API calls, and can fetch the rest of the metadata with
  // one additional API call.
  files: z.array(z.string()),
});

const ManagerPermissionsSchema = z.object({
  manageBillings: z.boolean(),
  manageApplications: z.boolean(),
  manageListings: z.boolean(),
});

const FacilityLocationSchema = z.object({
  coordinates: z
    .object({
      lat: z.number(),
      long: z.number(),
    })
    .optional(),
  text: z.string().optional(),
});

const ManagerSchema = z.object({
  id: ObjectIdSchema,
  profilePicture: z.string().optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const LandlordSchema = z.object({
  id: ObjectIdSchema,
  profilePicture: z.string().optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),

  numUnits: z.int(),
  createdAt: DateTimeSchema,
});

const UserFacilitySchema = z.object({
  id: ObjectIdSchema,
  name: z.string(),
  landlord: LandlordSchema,
  managers: z.array(ManagerSchema),
  location: FacilityLocationSchema.optional(),
  type: FacilityTypeSchema,

  // the value of the override
  isAcceptingApplications: z.boolean().optional(),
  applicationOpenDate: Date,
  applicationCloseDate: Date,
});

const UserListing = z.object({
  name: z.string(),
  price: RangeSchema(z.number()),
  tags: z.record(z.string(), z.union([z.number(), z.boolean(), z.string()])),
});

const UserFacilityWithListingsSchema = UserFacilitySchema.extend({
  listings: z.array(UserListing),
});

const ManagerFacilitySchema = UserFacilitySchema.extend({
  capacity: z.int(),
  documents: z.array(DocumentSchema),
});

const ManagerEntrySchema = z.object({
  userId: ObjectIdSchema,
  permissions: ManagerPermissionsSchema,
});

// ============================================================================
// GET /facilities: routeGetFacilities
//
// Retrieves the facilities with filters.
// Intended to be used by admin and manager routes. User routes should use
// POST /facilities/search instead.
//
// This may return a combination of facilities with extended information for
// managers and ones with basic information for users.
// ============================================================================
export const GetFacilitiesFilterSchema = z.object({
  // Lowercase, substring search
  name: z.string().optional(),
  landlordId: ObjectIdSchema.optional(),

  // Search within a rectangle
  location: z.object({
    coordinates: z
      .object({
        lat: RangeSchema(z.number()),
        long: RangeSchema(z.number()),
      })
      .optional(),

    // Lowercase, substring search
    text: z.string().optional(),
  }),

  // OR
  types: z.array(FacilityTypeSchema).optional(),
  capacity: RangeSchema(z.int().optional()).optional(),

  // Checks true state, not only the override
  isAcceptingApplications: z.boolean().optional(),
});
export const GetFacilitiesRequestQuerySchema = QuerySchema(GetFacilitiesFilterSchema);
export const GetFacilitiesResponseBodySchema = z.array(
  z.union([ManagerFacilitySchema, UserFacilitySchema]),
);

// ============================================================================
// POST /facilities: routeCreateFacility
//
// Creates a facility.
// ============================================================================
export const CreateFacilityRequestBodySchema = z.object({
  // This automatically creates an invite to the listed managers.
  managers: z.array(ManagerEntrySchema).optional(),
  name: z.string(),
  type: FacilityTypeSchema,
  location: FacilityLocationSchema.optional(),

  // Not accepting applications as default
  isAcceptingApplications: z.boolean().default(false),
  applicationCloseDate: DateTimeSchema.optional(),
  applicationOpenDate: DateTimeSchema.optional(),

  // Documents are not required to be uploaded on creation, verification
  // happens after Listing creation, but verification of facility documents
  // is shared across different listings.
});
export const CreateFacilityResponseBodySchema = z.object({ id: ObjectIdSchema });

// ============================================================================
// POST /facilities/search: routeSearchFacilities
//
// Searches facilities based on filters on listings.
// ============================================================================
export const SearchFacilitiesRequestBodySchema = z.object({
  facilityId: ObjectIdSchema.optional(),
  landlordId: ObjectIdSchema.optional(),

  // TODO: confirm requirement:
  //   Filtering by manager, it is omitted.
  //   Filtering by private status

  tags: z.union([z.string(), z.boolean(), RangeSchema(z.number())]),
  roomType: z.enum(ROOM_TYPES).optional(),
  capacity: RangeSchema(z.int()),
  allowVisit: z.boolean(),
  allowTransfer: z.boolean(),
});
export const SearchFacilitiesResponseBodySchema = z.array(UserFacilityWithListingsSchema);

// ============================================================================
// GET /facilities/:facilityId: routeGetFacility
//
// Retrieves a specific facility by ID.
// ============================================================================
export const GetFacilityResponseBodySchema = z.union([ManagerFacilitySchema, UserFacilitySchema]);

// PATCH /facilities/:facilityId: routeUpdateFacility
export const UpdateFacilityRequestBodySchema = z
  .object({
    name: z.string(),
    type: FacilityTypeSchema,
    location: FacilityLocationSchema,
    isAcceptingApplications: z.boolean(),
    applicationCloseDate: DateTimeSchema,
    applicationOpenDate: DateTimeSchema,
  })
  .partial();

// ============================================================================
// DELETE /facilities/:facilityId: routeDeleteFacility
//
// No request body, returns 204 on success, no types required.
// ============================================================================

// ============================================================================
// DELETE /facilities/:facilityId/managers/:managerId: routeRemoveManager
//
// No request body, returns 204 on success, no types required.
// ============================================================================

// ============================================================================
// PATCH /facilities/:facilityId/managers/:managerId: routeUpdateManagerPermissions
// ============================================================================
export const UpdateManagerPermissionsRequestBodySchema = ManagerPermissionsSchema;
