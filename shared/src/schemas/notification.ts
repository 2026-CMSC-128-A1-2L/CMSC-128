import {
  DateTimeSchema,
  PaginationRequestSchema,
  PaginationResponseSchema,
  QuerySchema,
} from './common.js';
import z from 'zod';

export const NotificationFilterSchema = z.object({
  status: z.enum(['unread', 'read', 'archived']).optional(),
  limit: z.number().optional(),
});

export const GetNotificationQuerySchema = QuerySchema(NotificationFilterSchema);

export const GetNotificationsResponseBodySchema = z.object({
  messages: z.array(
    z.object({
      subject: z.string(),
      text: z.string(),
      createdAt: DateTimeSchema,
      readAt: DateTimeSchema.nullish(),
    }),
  ),
});
