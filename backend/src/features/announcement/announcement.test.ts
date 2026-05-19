import '../../config.js';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  adminAgent,
  landlordAgent,
  managerAgent,
  studentAgent,
  guestAgent,
  admin,
  student,
} from '../../test/setup.js';
import mongoose from 'mongoose';
import { Announcement, AnnouncementRead } from './announcement.model.js';

describe('Announcements API', () => {
  beforeEach(async () => {
    await Announcement.deleteMany({});
    await AnnouncementRead.deleteMany({});
  });

  describe('POST /api/announcements', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.post('/api/announcements').send({
        subject: 'Test',
        content: 'Test content',
        role: 'All',
      });
      expect(response).statusToBe(401);
    });

    it('should return 403 for non-admin users', async () => {
      const response = await studentAgent.post('/api/announcements').send({
        subject: 'Test',
        content: 'Test content',
        role: 'All',
      });
      expect(response).statusToBe(403);
    });

    it('should return 403 for landlord users', async () => {
      const response = await landlordAgent.post('/api/announcements').send({
        subject: 'Test',
        content: 'Test content',
        role: 'All',
      });
      expect(response).statusToBe(403);
    });

    it('should return 403 for manager users', async () => {
      const response = await managerAgent.post('/api/announcements').send({
        subject: 'Test',
        content: 'Test content',
        role: 'All',
      });
      expect(response).statusToBe(403);
    });

    it('should return 400 for empty subject', async () => {
      const response = await adminAgent.post('/api/announcements').send({
        subject: '',
        content: 'Test content',
        role: 'All',
      });
      expect(response).statusToBe(400);
    });

    it('should return 400 for empty content', async () => {
      const response = await adminAgent.post('/api/announcements').send({
        subject: 'Test',
        content: '',
        role: 'All',
      });
      expect(response).statusToBe(400);
    });

    it('should successfully create an announcement for role All', async () => {
      const response = await adminAgent.post('/api/announcements').send({
        subject: 'System Maintenance',
        content: 'The system will be down tonight.',
        role: 'All',
      });

      expect(response).statusToBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('subject', 'System Maintenance');
      expect(response.body.data).toHaveProperty('content', 'The system will be down tonight.');
      expect(response.body.data.targetRole).toBeNull();
    });

    it('should successfully create an announcement targeting a specific role', async () => {
      const response = await adminAgent.post('/api/announcements').send({
        subject: 'For Students',
        content: 'Reminder: Register for next semester.',
        role: 'Student',
      });

      expect(response).statusToBe(201);
      expect(response.body.data.targetRole).toBe('Student');
    });
  });

  describe('GET /api/announcements', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.get('/api/announcements');
      expect(response).statusToBe(401);
    });

    it('should return empty array when no announcements exist', async () => {
      const response = await studentAgent.get('/api/announcements');
      expect(response).statusToBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });

    it('should return announcements with targetRole matching the user role', async () => {
      await Announcement.create({
        subject: 'Student Announcement',
        content: 'For students only',
        targetRole: 'Student',
      });

      const response = await studentAgent.get('/api/announcements');
      expect(response).statusToBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].subject).toBe('Student Announcement');
    });

    it('should not return announcements targeting a different role', async () => {
      await Announcement.create({
        subject: 'Landlord Announcement',
        content: 'For landlords only',
        targetRole: 'Landlord',
      });

      const response = await studentAgent.get('/api/announcements');
      expect(response).statusToBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should return announcements with targetRole null for all roles', async () => {
      await Announcement.create({
        subject: 'Global Announcement',
        content: 'For everyone',
        targetRole: null,
      });

      const studentResponse = await studentAgent.get('/api/announcements');
      expect(studentResponse.body.data.length).toBe(1);
      expect(studentResponse.body.data[0].subject).toBe('Global Announcement');

      const landlordResponse = await landlordAgent.get('/api/announcements');
      expect(landlordResponse.body.data.length).toBe(1);
      expect(landlordResponse.body.data[0].subject).toBe('Global Announcement');
    });

    it('should return announcements sorted by newest first', async () => {
      await Announcement.create({
        subject: 'Older',
        content: 'First announcement',
        targetRole: null,
        createdAt: new Date('2024-01-01'),
      });

      await Announcement.create({
        subject: 'Newer',
        content: 'Second announcement',
        targetRole: null,
        createdAt: new Date('2024-06-01'),
      });

      const response = await studentAgent.get('/api/announcements');
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0].subject).toBe('Newer');
      expect(response.body.data[1].subject).toBe('Older');
    });

    it('should return isRead as false for unread announcements', async () => {
      const announcement = await Announcement.create({
        subject: 'Test',
        content: 'Unread announcement',
        targetRole: null,
      });

      const response = await studentAgent.get('/api/announcements');
      const target = response.body.data.find(
        (a: any) => a._id === announcement._id.toString(),
      );
      expect(target.isRead).toBe(false);
    });

    it('should return isRead as true after user marks it as read', async () => {
      const announcement = await Announcement.create({
        subject: 'Test',
        content: 'Read announcement',
        targetRole: null,
      });

      await AnnouncementRead.create({
        announcementId: announcement._id,
        userId: student._id,
        readAt: new Date(),
      });

      const response = await studentAgent.get('/api/announcements');
      const target = response.body.data.find(
        (a: any) => a._id === announcement._id.toString(),
      );
      expect(target.isRead).toBe(true);
    });
  });

  describe('POST /api/announcements/:id/read', () => {
    it('should return 401 for unauthenticated users', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const response = await guestAgent.post(`/api/announcements/${fakeId}/read`);
      expect(response).statusToBe(401);
    });

    it('should successfully mark an announcement as read', async () => {
      const announcement = await Announcement.create({
        subject: 'Test',
        content: 'Mark as read',
        targetRole: null,
      });

      const response = await studentAgent.post(
        `/api/announcements/${announcement._id.toString()}/read`,
      );
      expect(response).statusToBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('success', true);

      const readRecord = await AnnouncementRead.findOne({
        announcementId: announcement._id,
        userId: student._id,
      });
      expect(readRecord).not.toBeNull();
    });

    it('should be idempotent (marking already read returns success)', async () => {
      const announcement = await Announcement.create({
        subject: 'Test',
        content: 'Already read',
        targetRole: null,
      });

      const first = await studentAgent.post(
        `/api/announcements/${announcement._id.toString()}/read`,
      );
      expect(first).statusToBe(200);

      const second = await studentAgent.post(
        `/api/announcements/${announcement._id.toString()}/read`,
      );
      expect(second).statusToBe(200);
      expect(second.body.data.success).toBe(true);
    });
  });
});
