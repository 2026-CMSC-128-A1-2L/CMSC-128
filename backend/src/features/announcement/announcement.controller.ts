import type { RequestHandler } from 'express';
import assert from 'node:assert';
import { ObjectIdSchema, SendAnnouncementSchema } from 'shared';
import { createAnnouncement, getAnnouncements, markAnnouncementRead } from './announcement.service.js';

export const routeSendAnnouncement: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const { subject, content, role } = SendAnnouncementSchema.parse(req.body);

  const announcement = await createAnnouncement({ subject, content, role });

  res.status(201).json({ data: announcement });
};

export const routeGetAnnouncements: RequestHandler = async (req, res) => {
  assert.ok(req.user);

  const announcements = await getAnnouncements(req.user._id, req.user.userType!);

  res.json({ data: announcements });
};

export const routeMarkAnnouncementRead: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const id = ObjectIdSchema.parse(req.params.announcementId);

  const result = await markAnnouncementRead(id, req.user._id);

  res.json({ data: result });
};
