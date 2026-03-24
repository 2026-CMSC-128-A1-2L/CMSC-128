import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /bookmarks
export const CreateBookmarkBodySchema = z.object({
  listingID: ObjectIdSchema,
  notes: z.string().optional(),
});
