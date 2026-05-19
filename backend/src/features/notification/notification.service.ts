import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { combineFilters } from '../../middleware.js';
import { Notification, NotificationType } from './notification.model.js';
import { triggerNewNotification } from '../../pusher.js';

export const sendNotification = async (
  userId: mongoose.Types.ObjectId,
  subject: string,
  content: string,
) => {
  const notification = new Notification({ userId, subject, content });
  const saved = await notification.save();

  await triggerNewNotification(userId.toString(), {
    _id: saved._id.toString(),
    subject: saved.subject,
    content: saved.content,
    status: saved.status,
    createdAt: saved.createdAt,
  });

  return saved;
};

export const getNotifications = async (
  userId: mongoose.Types.ObjectId,
  filter: QueryFilter<NotificationType>,
) => {
  return await Notification.find(combineFilters(filter, { userId }), { createdAt: -1 });
};

export const getNotification = async (
  userId: mongoose.Types.ObjectId,
  notificationId: mongoose.Types.ObjectId,
) => {
  return await Notification.findOne({ _id: notificationId, userId });
};

export const readNotification = async (
  userId: mongoose.Types.ObjectId,
  notificationId: mongoose.Types.ObjectId,
) => {
  return await Notification.updateOne({ _id: notificationId, userId }, { status: 'read' });
};
