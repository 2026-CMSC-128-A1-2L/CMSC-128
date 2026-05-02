import type { GetCalendarQuerySchema } from 'shared';
import type z from 'zod';

export type GetCalendarQuery = z.infer<typeof GetCalendarQuerySchema>;
