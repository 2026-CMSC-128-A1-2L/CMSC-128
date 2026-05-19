import mongoose from 'mongoose';
import { USER_TYPE, type UserTypeType } from 'shared';

export type AnnouncementType = {
  _id: mongoose.Types.ObjectId;
  subject: string;
  content: string;
  targetRole: UserTypeType | null;
  createdAt: Date;
  updatedAt: Date;
};

const announcementSchema = new mongoose.Schema<AnnouncementType>(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    targetRole: {
      type: String,
      enum: [...USER_TYPE, null],
      default: null,
    },
  },
  { timestamps: true },
);

export const Announcement = mongoose.model<AnnouncementType>('Announcement', announcementSchema);

export type AnnouncementReadType = {
  _id: mongoose.Types.ObjectId;
  announcementId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  readAt: Date;
};

const announcementReadSchema = new mongoose.Schema<AnnouncementReadType>({
  announcementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  readAt: { type: Date, default: Date.now },
});

announcementReadSchema.index({ announcementId: 1, userId: 1 }, { unique: true });

export const AnnouncementRead = mongoose.model<AnnouncementReadType>(
  'AnnouncementRead',
  announcementReadSchema,
);
