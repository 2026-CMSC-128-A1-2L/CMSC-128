import type { CreateTagBodySchema, UpdateTagBodySchema } from 'shared';
import type z from 'zod';

export type CreateTagBody = z.infer<typeof CreateTagBodySchema>;
export type UpdateTagBody = z.infer<typeof UpdateTagBodySchema>;
export type EnrichTagsBody = Record<string, string | number | boolean>;
