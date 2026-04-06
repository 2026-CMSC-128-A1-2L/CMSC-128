import { QuerySchema } from './common';
import z from 'zod';

export const GetNotificationQuerySchema = QuerySchema;

export const NotificationFilterSchema = z.object({
  status: z.enum(['unread', 'read', 'archived']).optional(),
});
