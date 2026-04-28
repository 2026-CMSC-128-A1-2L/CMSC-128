import { GetBookmarksQuerySchema } from 'shared';
import type z from 'zod';

export type GetBookmarksQuery = z.infer<typeof GetBookmarksQuerySchema>;
