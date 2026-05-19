import mongoose from 'mongoose';
import { Announcement, AnnouncementRead, type AnnouncementType } from './announcement.model.js';
import { triggerNewAnnouncement } from '../../pusher.js';

type CreateAnnouncementParams = {
  subject: string;
  content: string;
  role: 'Student' | 'Landlord' | 'Manager' | 'Admin' | 'All';
};

export const createAnnouncement = async (params: CreateAnnouncementParams) => {
  const targetRole = params.role === 'All' ? null : params.role;

  const announcement = await Announcement.create({
    subject: params.subject,
    content: params.content,
    targetRole,
  });

  await triggerNewAnnouncement({
    _id: announcement._id.toString(),
    subject: announcement.subject,
    content: announcement.content,
    targetRole: announcement.targetRole,
    createdAt: announcement.createdAt.toISOString(),
    updatedAt: announcement.updatedAt.toISOString(),
  });

  return announcement;
};

export const getAnnouncements = async (userId: mongoose.Types.ObjectId, userType: string) => {
  const roleFilter: Record<string, unknown> = {};

  if (userType === 'Admin') {
    roleFilter.targetRole = null;
  } else {
    roleFilter.targetRole = { $in: [userType, null] };
  }

  const announcements = (await Announcement.find(roleFilter)
    .sort({ createdAt: -1 })
    .lean()) as (AnnouncementType & { _id: mongoose.Types.ObjectId })[];

  if (announcements.length === 0) return [];

  const readRecords = await AnnouncementRead.find({
    userId,
    announcementId: { $in: announcements.map((a) => a._id) },
  }).lean();

  const readIds = new Set(readRecords.map((r) => r.announcementId.toString()));

  return announcements.map((a) => ({
    _id: a._id.toString(),
    subject: a.subject,
    content: a.content,
    targetRole: a.targetRole,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    isRead: readIds.has(a._id.toString()),
  }));
};

export const markAnnouncementRead = async (
  announcementId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  await AnnouncementRead.updateOne(
    { announcementId, userId },
    { $setOnInsert: { announcementId, userId, readAt: new Date() } },
    { upsert: true },
  );

  return { success: true };
};
