import '../../src/config.js';
import { describe, it, expect } from 'vitest';
import {
  adminAgent,
  landlord,
  landlordAgent,
  managerAgent,
  studentAgent,
  guestAgent,
} from './setup.js';
import { buildManager } from '../factories';

describe('Invites API', () => {
  describe('POST /api/invites/landlord/:inviteId/accept', () => {
    describe('Authentication', () => {
      it('should return 200 for any authenticated user', async () => {
        const response = await landlordAgent.post('/api/invites/landlord/invite-123/accept');
        expect(response).statusToBe(200);
      });

      it('should return 200 for student', async () => {
        const response = await studentAgent.post('/api/invites/landlord/invite-456/accept');
        expect(response).statusToBe(200);
      });

      it('should return 200 for guest (invite accepts are typically token-based)', async () => {
        const response = await guestAgent.post('/api/invites/landlord/invite-789/accept');
        expect(response).statusToBe(200);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid inviteId format', async () => {
        const response = await landlordAgent.post('/api/invites/landlord/invalid-id/accept');
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent invite', async () => {
        const fakeInviteId = '000000000000000000000000';
        const response = await landlordAgent.post(`/api/invites/landlord/${fakeInviteId}/accept`);
        expect(response).statusToBe(404);
      });

      it('should return 410 for expired invite', async () => {
        const response = await landlordAgent.post('/api/invites/landlord/expired-invite/accept');
        expect(response).statusToBe(410);
      });
    });

    describe('Success', () => {
      it('should accept invite and return user data', async () => {
        const response = await landlordAgent.post('/api/invites/landlord/valid-invite/accept');
        expect(response).statusToBe(200);
        expect(response.body).toHaveProperty('user');
      });
    });
  });

  describe('POST /api/invites/manager', () => {
    describe('Authentication', () => {
      it('should return 201 for landlord', async () => {
        const response = await landlordAgent.post('/api/invites/manager').send({
          email: `new-manager-${Date.now()}@example.com`,
        });
        expect(response).statusToBe(201);
        expect(response.body.inviteId).toBeDefined();
      });

      it('should return 403 for admin', async () => {
        const response = await adminAgent.post('/api/invites/manager').send({
          email: 'admin-manager@test.com',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.post('/api/invites/manager').send({
          email: 'manager-manager@test.com',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.post('/api/invites/manager').send({
          email: 'student-manager@test.com',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post('/api/invites/manager').send({
          email: 'guest-manager@test.com',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field email', async () => {
        const response = await landlordAgent.post('/api/invites/manager').send({});
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid email format', async () => {
        const response = await landlordAgent.post('/api/invites/manager').send({
          email: 'not-an-email',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid email type', async () => {
        const response = await landlordAgent.post('/api/invites/manager').send({
          email: 123,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 409 for already invited email', async () => {
        const email = `duplicate-${Date.now()}@example.com`;
        await landlordAgent.post('/api/invites/manager').send({ email });
        const response = await landlordAgent.post('/api/invites/manager').send({ email });
        expect(response).statusToBe(409);
      });

      it('should return 409 for existing manager email', async () => {
        const existingManager = await buildManager.create();
        const response = await landlordAgent.post('/api/invites/manager').send({
          email: existingManager.email,
        });
        expect(response).statusToBe(409);
      });
    });

    describe('Success', () => {
      it('should create invite successfully', async () => {
        const response = await landlordAgent.post('/api/invites/manager').send({
          email: `invite-success-${Date.now()}@example.com`,
        });
        expect(response).statusToBe(201);
        expect(response.body).toHaveProperty('inviteId');
      });

      it('should send invite email', async () => {
        const response = await landlordAgent.post('/api/invites/manager').send({
          email: `invite-email-${Date.now()}@example.com`,
        });
        expect(response).statusToBe(201);
        expect(response.body.message).toBe('Invite sent successfully.');
      });
    });
  });
});
