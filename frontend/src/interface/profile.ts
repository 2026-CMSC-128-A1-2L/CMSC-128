import { ProfileSchema } from 'shared';
import type z from 'zod';

export type Profile = z.infer<typeof ProfileSchema>;
