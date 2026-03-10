import z from 'zod';
import { ObjectIdSchema } from './common';

export const GetListingsQuerySchema = z.object({
  q: z.string().transform((x) => JSON.parse(x)),
});

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

export const CreateListingBodySchema = z.object({
  housingID: ObjectIdSchema,
  tags: z.array(TagSchema).optional(),
  roomType: z.string(),
  capacity: z.number(),
  isPrivate: z.boolean(),
  allowVisit: z.boolean(),
  allowTransfer: z.boolean(),
  description: z.string(),
  mediaUrls: z.array(z.string()).optional(),
});

export const UpdateListingBodySchema = z.object({
  tags: z.array(TagSchema).optional(),
  roomType: z.string().optional(),
  capacity: z.number().optional(),
  isPrivate: z.boolean().optional(),
  allowVisit: z.boolean().optional(),
  allowTransfer: z.boolean().optional(),
  description: z.string().optional(),
  mediaUrls: z.array(z.string()).optional(),
  units: z.array(z.string()).optional(),
});

export const SearchQuerySchema = z.object({
  housingID: ObjectIdSchema.optional(),
  tags: z.array(TagFilterSchema).optional(),
  capacity: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
  isPrivate: z.boolean().optional(),
  allowVisit: z.boolean().optional(),
  allowTransfer: z.boolean().optional(),
});
