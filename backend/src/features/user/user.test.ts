import '../../config.js';
import { describe, it, expect } from 'vitest';
import {
  buildStudent,
  buildUnverifiedLandlord,
} from '../../test/factories.js';
import {
  student,
  landlordAgent,
  managerAgent,
  guestAgent,
  studentAgent,
} from '../../test/setup.js';
import mongoose from 'mongoose';

describe('Users API', () => {
  describe('GET /api/users', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.get('/api/users');
      expect(response).statusToBe(401);
    });

    it('should return 403 for students', async () => {
      const response = await studentAgent.get('/api/users');
      expect(response).statusToBe(403);
    });

    it('should return 403 for landlords', async () => {
      const response = await landlordAgent.get('/api/users');
      expect(response).statusToBe(403);
    });

    it('should return 200 for managers', async () => {
      const response = await managerAgent.get('/api/users');
      expect(response).statusToBe(200);
    });
  });

  describe('GET /api/users/me', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.get('/api/users/me');
      expect(response).statusToBe(401);
    });

    it('should return 200 for authenticated students', async () => {
      const response = await studentAgent.get('/api/users/me');
      expect(response).statusToBe(200);
      expect(response.body.data).toHaveProperty('firstName');
    });

    it('should return 200 for authenticated landlords', async () => {
      const response = await landlordAgent.get('/api/users/me');
      expect(response).statusToBe(200);
      expect(response.body.data).toHaveProperty('firstName');
    });

    it('should return 200 for authenticated managers', async () => {
      const response = await managerAgent.get('/api/users/me');
      expect(response).statusToBe(200);
      expect(response.body.data).toHaveProperty('firstName');
    });
  });

  describe('GET /api/users/:userId', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.get(`/api/users/${new mongoose.Types.ObjectId()}`);
      expect(response).statusToBe(401);
    });

    it('should return 403 for students', async () => {
      const response = await studentAgent.get(`/api/users/${new mongoose.Types.ObjectId()}`);
      expect(response).statusToBe(403);
    });

    it('should return 403 for landlords', async () => {
      const response = await landlordAgent.get(`/api/users/${new mongoose.Types.ObjectId()}`);
      expect(response).statusToBe(403);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await managerAgent.get(`/api/users/${new mongoose.Types.ObjectId()}`);
      expect(response).statusToBe(404);
    });

    it('should return 200 for managers for existing user', async () => {
      const studentData = await buildStudent.create();
      const response = await managerAgent.get(`/api/users/${studentData._id}`);
      expect(response).statusToBe(200);
      expect(response.body.data._id).toBe(studentData._id.toString());
    });
  });

  describe('PATCH /api/users/:userId', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent
        .patch(`/api/users/${student._id}`)
        .send({ address: 'New Address' });
      expect(response).statusToBe(401);
    });

    it('should update own profile', async () => {
      const response = await studentAgent
        .patch(`/api/users/${student._id}`)
        .send({ address: 'New Address' });
      expect(response).statusToBe(200);
    });

    it('should prevent updating other users profile', async () => {
      const otherStudent = await buildStudent.create();
      const response = await studentAgent
        .patch(`/api/users/${otherStudent._id}`)
        .send({ address: 'New Address' });
      expect(response).statusToBe(403);
    });
  });

  describe('DELETE /api/users/:userId', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.delete(`/api/users/${student._id}`);
      expect(response).statusToBe(401);
    });

    it('should allow self deletion', async () => {
      const newStudent = await buildStudent.create();
      const response = await studentAgent.delete(`/api/users/${newStudent._id}`);
      expect(response).statusToBe(200);
    });

    it('should allow manager to delete users', async () => {
      const newStudent = await buildStudent.create();
      const response = await managerAgent.delete(`/api/users/${newStudent._id}`);
      expect(response).statusToBe(200);
    });

    it('should prevent students from deleting other users', async () => {
      const newStudent = await buildStudent.create();
      const otherStudent = await buildStudent.create();
      const response = await studentAgent.delete(`/api/users/${otherStudent._id}`);
      expect(response).statusToBe(403);
    });
  });

  describe('POST /api/users/:userId/approve', () => {
    it('should return 401 for unauthenticated users', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
      });
      const response = await guestAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(401);
    });

    it('should return 403 for students', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
      });
      const response = await studentAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(403);
    });

    it('should return 403 for landlords', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
      });
      const response = await landlordAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(403);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await managerAgent.post(
        `/api/users/${new mongoose.Types.ObjectId()}/approve`,
      );
      expect(response).statusToBe(404);
    });

    it('should return 422 if verification not submitted', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'pending',
        status: 'unverified',
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(422);
    });

    it('should return 422 if already approved', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'approved',
        status: 'verified',
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(422);
    });

    it('should return 422 if user is disabled', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'disabled',
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(422);
    });

    it('should approve user with all documents accepted', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Valid ID', status: 'accepted', files: ['file1.pdf'] },
          { docId: 'id2', name: 'Enrollment Form', status: 'accepted', files: ['file2.pdf'] },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(204);
    });

    it('should return 422 if some documents are pending', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Valid ID', status: 'accepted', files: ['file1.pdf'] },
          { docId: 'id2', name: 'Enrollment Form', status: 'pending', files: ['file2.pdf'] },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(422);
    });

    it('should return 422 if some documents are rejected', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Valid ID', status: 'accepted', files: ['file1.pdf'] },
          {
            docId: 'id2',
            name: 'Enrollment Form',
            status: 'rejected',
            message: 'Invalid',
            files: ['file2.pdf'],
          },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/approve`);
      expect(response).statusToBe(422);
    });
  });

  describe('POST /api/users/:userId/reject', () => {
    it('should return 401 for unauthenticated users', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
      });
      const response = await guestAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(401);
    });

    it('should return 403 for students', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
      });
      const response = await studentAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(403);
    });

    it('should return 403 for landlords', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
      });
      const response = await landlordAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(403);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await managerAgent.post(
        `/api/users/${new mongoose.Types.ObjectId()}/reject`,
      );
      expect(response).statusToBe(404);
    });

    it('should return 422 if verification not submitted', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'pending',
        status: 'unverified',
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(422);
    });

    it('should return 422 if already approved', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'approved',
        status: 'verified',
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(422);
    });

    it('should return 422 if all documents are accepted', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Valid ID', status: 'accepted', files: ['file1.pdf'] },
          { docId: 'id2', name: 'Enrollment Form', status: 'accepted', files: ['file2.pdf'] },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(422);
    });

    it('should reject user with some documents pending', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Valid ID', status: 'accepted', files: ['file1.pdf'] },
          { docId: 'id2', name: 'Enrollment Form', status: 'pending', files: ['file2.pdf'] },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(204);
    });

    it('should reject user with some documents rejected', async () => {
      const newStudent = await buildStudent.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Valid ID', status: 'accepted', files: ['file1.pdf'] },
          {
            docId: 'id2',
            name: 'Enrollment Form',
            status: 'rejected',
            message: 'Invalid',
            files: ['file2.pdf'],
          },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newStudent._id}/reject`);
      expect(response).statusToBe(204);
    });
  });

  describe('POST /api/users/:userId/approve (Landlord)', () => {
    it('should approve landlord with all documents accepted', async () => {
      const newLandlord = await buildUnverifiedLandlord.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Property Title', status: 'accepted', files: ['file1.pdf'] },
          { docId: 'id2', name: 'Business Permit', status: 'accepted', files: ['file2.pdf'] },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newLandlord._id}/approve`);
      expect(response).statusToBe(204);
    });

    it('should return 422 if landlord has documents pending', async () => {
      const newLandlord = await buildUnverifiedLandlord.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Property Title', status: 'accepted', files: ['file1.pdf'] },
          { docId: 'id2', name: 'Business Permit', status: 'pending', files: ['file2.pdf'] },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newLandlord._id}/approve`);
      expect(response).statusToBe(422);
    });
  });

  describe('POST /api/users/:userId/reject (Landlord)', () => {
    it('should return 422 if all landlord documents are accepted', async () => {
      const newLandlord = await buildUnverifiedLandlord.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Property Title', status: 'accepted', files: ['file1.pdf'] },
          { docId: 'id2', name: 'Business Permit', status: 'accepted', files: ['file2.pdf'] },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newLandlord._id}/reject`);
      expect(response).statusToBe(422);
    });

    it('should reject landlord with some documents rejected', async () => {
      const newLandlord = await buildUnverifiedLandlord.create({
        verificationStatus: 'submitted',
        status: 'unverified',
        documents: [
          { docId: 'id1', name: 'Property Title', status: 'accepted', files: ['file1.pdf'] },
          {
            docId: 'id2',
            name: 'Business Permit',
            status: 'rejected',
            message: 'Expired',
            files: ['file2.pdf'],
          },
        ],
      });
      const response = await managerAgent.post(`/api/users/${newLandlord._id}/reject`);
      expect(response).statusToBe(204);
    });
  });
});
