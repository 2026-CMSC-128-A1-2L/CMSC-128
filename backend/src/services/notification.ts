import mongoose from 'mongoose';
import { Notification } from '../models/communication/Notification.js';

export const createNotification = async (
  userId: mongoose.Types.ObjectId,
  subject: string,
  content: string,
) => {
  const notification = new Notification({ userId, subject, content });
  return await notification.save();
};

export const getNotificationsByUser = async (userId: mongoose.Types.ObjectId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

export const markNotificationAsRead = async (
  notificationId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { status: 'read' },
    { new: true },
  );
};

export const markAllNotificationsAsRead = async (userId: mongoose.Types.ObjectId) => {
  return await Notification.updateMany(
    { userId, status: 'unread' },
    { status: 'read' },
  );
};
