import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /bookmarks
export const CreateBookmarkBodySchema = z.object({
  listingId: ObjectIdSchema,
  notes: z.string().optional(),
});
