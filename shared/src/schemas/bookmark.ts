import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /bookmarks/:listingId
export const CreateBookmarkBodySchema = z.object({
  listingId: ObjectIdSchema,
});

// GET /bookmarks?sortBy=date&order=desc
export const GetBookmarksQuerySchema = z.object({
  sortBy: z.enum(['date', 'name', 'price']).default('date'),
  order: z.enum(['asc', 'desc']).default('desc'),
});
