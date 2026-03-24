import '../../src/config.js';
import { describe, it, expect } from 'vitest';
import {
  adminAgent,
  landlord,
  landlordAgent,
  manager,
  managerAgent,
  studentAgent,
  guestAgent,
} from './setup.js';
import { buildLandlord, buildManager, buildStudent } from '../factories';

describe('Users API', () => {
  let userId: string;

  beforeAll(async () => {
    userId = studentAgent ? 'test-user-id' : '';
  });

  describe('GET /api/users', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get('/api/users');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get('/api/users');
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get('/api/users');
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get('/api/users');
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get('/api/users');
        expect(response).statusToBe(401);
      });
    });

    describe('Success', () => {
      it('should return users array', async () => {
        const response = await adminAgent.get('/api/users');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('GET /api/users/:userId', () => {
    let studentUserId: string;

    beforeAll(async () => {
      const studentUser = await buildStudent.create();
      studentUserId = (studentUser as any)._id;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get(`/api/users/${studentUserId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for self', async () => {
        const response = await studentAgent.get(`/api/users/${studentUserId}`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord accessing other user', async () => {
        const response = await landlordAgent.get(`/api/users/${studentUserId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager accessing other user', async () => {
        const response = await managerAgent.get(`/api/users/${studentUserId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/users/${studentUserId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid userId format', async () => {
        const response = await adminAgent.get('/api/users/invalid-id');
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent user', async () => {
        const fakeUserId = '000000000000000000000000';
        const response = await adminAgent.get(`/api/users/${fakeUserId}`);
        expect(response).statusToBe(404);
      });
    });

    describe('Success', () => {
      it('should return user data with correct structure', async () => {
        const response = await adminAgent.get(`/api/users/${studentUserId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toMatchObject({
          _id: studentUserId,
        });
      });
    });
  });

  describe('PATCH /api/users/:userId', () => {
    let studentUserId: string;

    beforeAll(async () => {
      const studentUser = await buildStudent.create();
      studentUserId = (studentUser as any)._id;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.patch(`/api/users/${studentUserId}`).send({
          firstName: 'AdminUpdated',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.firstName).toBe('AdminUpdated');
      });

      it('should return 200 for self', async () => {
        const response = await studentAgent.patch(`/api/users/${studentUserId}`).send({
          firstName: 'SelfUpdated',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.firstName).toBe('SelfUpdated');
      });

      it('should return 403 for landlord updating other user', async () => {
        const response = await landlordAgent.patch(`/api/users/${studentUserId}`).send({
          firstName: 'Hacked',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager updating other user', async () => {
        const response = await managerAgent.patch(`/api/users/${studentUserId}`).send({
          firstName: 'Hacked',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/users/${studentUserId}`).send({
          firstName: 'Hacked',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid firstName type', async () => {
        const response = await studentAgent.patch(`/api/users/${studentUserId}`).send({
          firstName: 123,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid email format', async () => {
        const response = await studentAgent.patch(`/api/users/${studentUserId}`).send({
          email: 'not-an-email',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid birthDate format', async () => {
        const response = await studentAgent.patch(`/api/users/${studentUserId}`).send({
          birthDate: 'not-a-date',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid isActive type', async () => {
        const response = await adminAgent.patch(`/api/users/${studentUserId}`).send({
          isActive: 'yes',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid userId format', async () => {
        const response = await studentAgent.patch('/api/users/invalid-id').send({
          firstName: 'Test',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent user', async () => {
        const fakeUserId = '000000000000000000000000';
        const response = await adminAgent.patch(`/api/users/${fakeUserId}`).send({
          firstName: 'Test',
        });
        expect(response).statusToBe(404);
      });
    });

    describe('Success', () => {
      it('should update firstName successfully', async () => {
        const response = await studentAgent.patch(`/api/users/${studentUserId}`).send({
          firstName: 'NewName',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.firstName).toBe('NewName');
      });

      it('should update lastName successfully', async () => {
        const response = await studentAgent.patch(`/api/users/${studentUserId}`).send({
          lastName: 'NewLastName',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.lastName).toBe('NewLastName');
      });

      it('should update profilePicture successfully', async () => {
        const response = await studentAgent.patch(`/api/users/${studentUserId}`).send({
          profilePicture: 'https://example.com/photo.jpg',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.profilePicture).toBe('https://example.com/photo.jpg');
      });

      it('should update contact for landlord', async () => {
        const landlordUser = await buildLandlord.create();
        const response = await adminAgent.patch(`/api/users/${(landlordUser as any)._id}`).send({
          contact: '09991112222',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.contact).toBe('09991112222');
      });

      it('should update studentNumber for student', async () => {
        const response = await adminAgent.patch(`/api/users/${studentUserId}`).send({
          studentNumber: '2024-00001',
        });
        expect(response).statusToBe(200);
      });

      it('should deactivate user', async () => {
        const response = await adminAgent.patch(`/api/users/${studentUserId}`).send({
          isActive: false,
        });
        expect(response).statusToBe(200);
        expect(response.body.data.isActive).toBe(false);
      });
    });
  });

  describe('DELETE /api/users/:userId', () => {
    let deletableUserId: string;

    beforeAll(async () => {
      const newUser = await buildStudent.create();
      deletableUserId = (newUser as any)._id;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.delete(`/api/users/${deletableUserId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('User deleted successfully.');
      });

      it('should return 200 for self', async () => {
        const newUser = await buildStudent.create();
        const response = await adminAgent.delete(`/api/users/${(newUser as any)._id}`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.delete(`/api/users/${deletableUserId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.delete(`/api/users/${deletableUserId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.delete(`/api/users/${deletableUserId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/users/${deletableUserId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 400 for invalid userId format', async () => {
        const response = await adminAgent.delete('/api/users/invalid-id');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent user', async () => {
        const fakeUserId = '000000000000000000000000';
        const response = await adminAgent.delete(`/api/users/${fakeUserId}`);
        expect(response).statusToBe(404);
      });

      it('should return 422 for deleting admin', async () => {
        const response = await adminAgent.delete(`/api/users/${landlord._id}`);
        expect(response).statusToBe(422);
      });
    });
  });

  describe('GET /api/users/:userId/applications', () => {
    let studentUserId: string;

    beforeAll(async () => {
      const studentUser = await buildStudent.create();
      studentUserId = (studentUser as any)._id;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get(`/api/users/${studentUserId}/applications`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for self', async () => {
        const response = await studentAgent.get(`/api/users/${studentUserId}/applications`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get(`/api/users/${studentUserId}/applications`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get(`/api/users/${studentUserId}/applications`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/users/${studentUserId}/applications`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid userId format', async () => {
        const response = await adminAgent.get('/api/users/invalid-id/applications');
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should return applications array', async () => {
        const response = await adminAgent.get(`/api/users/${studentUserId}/applications`);
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('GET /api/users/:userId/visits', () => {
    let studentUserId: string;

    beforeAll(async () => {
      const studentUser = await buildStudent.create();
      studentUserId = (studentUser as any)._id;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get(`/api/users/${studentUserId}/visits`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for self', async () => {
        const response = await studentAgent.get(`/api/users/${studentUserId}/visits`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get(`/api/users/${studentUserId}/visits`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get(`/api/users/${studentUserId}/visits`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/users/${studentUserId}/visits`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid userId format', async () => {
        const response = await adminAgent.get('/api/users/invalid-id/visits');
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should return visits array', async () => {
        const response = await adminAgent.get(`/api/users/${studentUserId}/visits`);
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });
})
