import type { GetNotificationsResponseBodySchema, AnnouncementResponseSchema } from 'shared';
import type z from 'zod';

export type GetNotificationsResponse = z.infer<typeof GetNotificationsResponseBodySchema>;

export type AnnouncementResponse = z.infer<typeof AnnouncementResponseSchema>;

export type StoreNotification = {
  _id: string;
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
  _isAnnouncement?: boolean;
};
