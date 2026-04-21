import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { combineFilters } from '../../middleware';
import { Notification } from './notification.model';

export const sendNotification = async (
  userId: mongoose.Types.ObjectId,
  subject: string,
  content: string,
) => {
  const notification = new Notification({ userId, subject, content });
  return await notification.save();
};

export const getNotifications = async (
  userId: mongoose.Types.ObjectId,
  filter: QueryFilter<typeof Notification>,
) => {
  return await Notification.find(combineFilters({ userId }, filter), { createdAt: -1 });
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
