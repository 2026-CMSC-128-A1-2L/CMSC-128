import { RequestHandler } from 'express';
import { getNotification, getNotifications, readNotification } from '../services/notifications';
import { GetNotificationQuerySchema, NotificationFilterSchema } from './schema/notifications';
import { ObjectIdSchema } from './schema/common';

export const routeGetNotifications: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = GetNotificationQuerySchema.parse(req.query);
  const filters = NotificationFilterSchema.parse(params.q);

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
