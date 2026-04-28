import { CreateBookmarkBodySchema, GetBookmarksQuerySchema } from 'shared';
import type z from 'zod';

export type CreateBookmarkBody = z.infer<typeof CreateBookmarkBodySchema>;
export type GetBookmarksQuery = z.infer<typeof GetBookmarksQuerySchema>;
