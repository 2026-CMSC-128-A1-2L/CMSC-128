import { RequestHandler } from 'express';
import z from 'zod';
import { QueryFilter } from 'mongoose';
import { NotificationFilterSchema, GetNotificationQuerySchema, ObjectIdSchema } from 'shared';
import { Notification } from './notification.model';
import { getNotifications, getNotification, readNotification } from './notification.service';

const buildNotificationQuery = (args: z.infer<typeof NotificationFilterSchema>) => {
  const query: QueryFilter<typeof Notification> = {};

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  if (args.status) {
    if (args.status == 'unread') {
      query.status = 'unread';
    } else if (args.status == 'read') {
      query.status = 'read';
      query.updateAt = {
        $gt: sevenDaysAgo,
      };
    } else if (args.status == 'archived') {
      query.status = 'read';
      query.updateAt = {
        $lte: sevenDaysAgo,
      };
    }
  } else {
    query.$or = [
      { status: 'unread' },
      {
        status: 'read',
        updateAt: {
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

  return await getNotifications(userId, filters);
};

export const routeGetNotification: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const id = ObjectIdSchema.parse(req.params.notificationId);

  return await getNotification(userId, id);
};

export const routeReadNotification: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const id = ObjectIdSchema.parse(req.params.notificationId);

  return await readNotification(userId, id);
};
