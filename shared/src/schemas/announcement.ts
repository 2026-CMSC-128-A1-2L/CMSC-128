import z from 'zod';
import { USER_TYPE } from '../constants.js';

export const SendAnnouncementSchema = z.object({
  subject: z.string().min(1),
  content: z.string().min(1),
  role: z.enum([...USER_TYPE, 'All']),
});

export type SendAnnouncementType = z.infer<typeof SendAnnouncementSchema>;

export const AnnouncementResponseSchema = z.object({
  _id: z.string(),
  subject: z.string(),
  content: z.string(),
  targetRole: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isRead: z.boolean(),
});

export type AnnouncementResponseType = z.infer<typeof AnnouncementResponseSchema>;

export const GetAnnouncementsResponseBodySchema = z.object({
  data: z.array(AnnouncementResponseSchema),
});

export const MarkReadResponseSchema = z.object({
  data: z.object({
    success: z.boolean(),
  }),
});
