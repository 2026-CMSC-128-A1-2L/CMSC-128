import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const CreateBookmarkBodySchema = z.object({
  listingID: ObjectIdSchema,
  notes: z.string().optional(),
});

export const DeleteBookmarkBodySchema = z.object({
  listingID: ObjectIdSchema,
  notes: z.string().optional(),
});

export const BookmarkParamsSchema = z.object({
  unitId: ObjectIdSchema,
});

export const GetBookmarksQuerySchema = z.object({
  listingID: ObjectIdSchema.optional(),
});

export const DeleteBookmarkParamsSchema = z.object({
  listingID: ObjectIdSchema,
});
