import type { RequestHandler } from 'express';
import type z from 'zod';
import type { QueryFilter } from 'mongoose';
import { type NotificationFilterSchema, GetNotificationQuerySchema, ObjectIdSchema } from 'shared';
import type { Notification } from './notification.model.js';
import { getNotifications, getNotification, readNotification } from './notification.service.js';

const buildNotificationQuery = (args: z.infer<typeof NotificationFilterSchema>) => {
  const query: QueryFilter<typeof Notification> = {};

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  if (args.status) {
    if (args.status == 'unread') {
      query.status = 'unread';
    } else if (args.status == 'read') {
      query.status = 'read';
      query.updatedAt = {
        $gt: sevenDaysAgo,
      };
    } else if (args.status == 'archived') {
      query.status = 'read';
      query.updatedAt = {
        $lte: sevenDaysAgo,
      };
    }
  } else {
    query.$or = [
      { status: 'unread' },
      {
        status: 'read',
        updatedAt: {
          $gt: sevenDaysAgo,
        },
      },
    ];
  }

  return query;
};

export const routeGetNotifications: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = GetNotificationQuerySchema.parse(req.query);
  const filters = buildNotificationQuery(params);

  res.json({ data: await getNotifications(userId, filters) });
};

export const routeGetNotification: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const id = ObjectIdSchema.parse(req.params.notificationId);

  res.json({ data: await getNotification(userId, id) });
};

export const routeReadNotification: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const id = ObjectIdSchema.parse(req.params.notificationId);

  res.json({ data: await readNotification(userId, id) });
};
