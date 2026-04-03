import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' },
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
