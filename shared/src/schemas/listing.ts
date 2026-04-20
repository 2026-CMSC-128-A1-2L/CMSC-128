import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common';
import { ROOM_TYPES } from '../constants';

// GET /listings
// Schema for filtering for tag values
export const TagFilterSchema = z.object({
  name: z.string(),
  value: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('enum'),
      value: z.string(),
    }),
    z.object({
      type: z.literal('boolean'),
      value: z.boolean(),
    }),
    z.object({
      type: z.literal('numeric'),
      value: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
      }),
    }),
  ]),
});

// Schema for tag values
export const TagSchema = z.object({
  name: z.string(),
  value: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('enum'),
      value: z.string(),
    }),
    z.object({
      type: z.literal('boolean'),
      value: z.boolean(),
    }),
    z.object({
      type: z.literal('numeric'),
      value: z.number(),
    }),
  ]),
});

export const ListingFilterSchema = z.object({
  facilityId: ObjectIdSchema.optional(),
  tags: z.array(TagFilterSchema).optional(),
  capacity: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  isPrivate: z.boolean().optional(),
  allowVisit: z.boolean().optional(),
  allowTransfer: z.boolean().optional(),
});

export const GetListingsQuerySchema = QuerySchema(ListingFilterSchema);

const TagsMapSchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]));

// POST /facilities/:facilityId/listings
export const CreateListingBodySchema = z.object({
  tags: TagsMapSchema.default({}),
  roomType: z.enum(ROOM_TYPES),
  capacity: z.int().min(1),
  isPrivate: z.boolean(),
  allowVisit: z.boolean(),
  allowTransfer: z.boolean(),
  description: z.string(),
  mediaUrls: z.array(z.string()).optional(),
});

// PATCH /listings/:listingId
export const UpdateListingBodySchema = z.object({
  tags: TagsMapSchema.default({}),
  roomType: z.enum(ROOM_TYPES).optional(),
  capacity: z.number().optional(),
  isPrivate: z.boolean().optional(),
  allowVisit: z.boolean().optional(),
  allowTransfer: z.boolean().optional(),
  description: z.string().optional(),
  mediaUrls: z.array(z.string()).optional(),
  units: z.array(z.string()).optional(),
});

export const UpdateListingTagsResponseBodySchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]));

