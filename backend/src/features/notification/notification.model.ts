import mongoose from 'mongoose';

export type NotificationType = {
  userId: mongoose.Types.ObjectId;
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'archived';

  createdAt: Date;
  updatedAt: Date;
};

const notificationSchema = new mongoose.Schema<NotificationType>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' },
  },
  { timestamps: true },
);

export const Notification = mongoose.model('Notification', notificationSchema);
