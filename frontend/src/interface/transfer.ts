import type { CreateTransferBodySchema } from 'shared';
import type z from 'zod';

export type CreateTransferBody = z.infer<typeof CreateTransferBodySchema>;
