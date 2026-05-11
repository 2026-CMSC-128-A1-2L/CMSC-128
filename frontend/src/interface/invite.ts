import type { CreateInviteManagerBodySchema } from 'shared';
import type z from 'zod';

export type CreateInviteManagerBody = z.infer<typeof CreateInviteManagerBodySchema>;
