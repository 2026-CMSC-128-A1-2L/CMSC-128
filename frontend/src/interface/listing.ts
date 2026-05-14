import type z from 'zod';
import {
  TagFilterSchema,
  TagSchema,
  ListingFilterSchema,
  GetListingsQuerySchema,
  CreateListingBodySchema,
  UpdateListingBodySchema,
  UpdateListingTagsResponseBodySchema,
} from 'shared';

export type TagFilter = z.infer<typeof TagFilterSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type ListingFilter = z.infer<typeof ListingFilterSchema>;
export type GetListingsQuery = z.infer<typeof GetListingsQuerySchema>;
export type CreateListingBody = z.infer<typeof CreateListingBodySchema>;
export type UpdateListingBody = z.infer<typeof UpdateListingBodySchema>;
export type UpdateListingTagsResponseBody = z.infer<typeof UpdateListingTagsResponseBodySchema>;
export type UpdateListingTagsBody = UpdateListingTagsResponseBody;
