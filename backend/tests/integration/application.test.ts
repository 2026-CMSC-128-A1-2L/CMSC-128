import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { buildListing, buildStudent } from '../factories';
import {
  adminAgent,
  studentAgent,
  guestAgent,
  landlordAgent,
  managerAgent,
  landlord,
  manager,
} from './setup.js';

describe('Applications API', () => {
  let studentID: string;
  let listingID: string;
  let applicationID: string;
  let otherListingID: string;

  beforeAll(async () => {
    const testStudent = await buildStudent.create({});
    const testListing = buildListing.create({
      landlordID: landlord._id,
      managerID: manager._id,
    });

    const otherListing = buildListing.create({
      landlordID: landlord._id,
      managerID: manager._id,
    });

    studentID = (testStudent as any)._id;
    listingID = (testListing as any)._id;
    otherListingID = (otherListing as any)._id;
  });

  const applicationData = () => ({
    listingID,
    preferredRoomType: 'single',
    documentUrls: [],
  });

  describe('POST /api/applications', () => {
    describe('Authentication', () => {
      it('should return 201 for Student', async () => {
        const response = await studentAgent.post('/api/applications').send(applicationData());
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        applicationID = response.body.id;
      });

      it('should return 401 for Guest', async () => {
        const response = await guestAgent.post('/api/applications').send(applicationData());
        expect(response.status).toBe(401);
      });

      it('should return 403 for Landlord', async () => {
        const response = await landlordAgent.post('/api/applications').send(applicationData());
        expect(response.status).toBe(403);
      });

      it('should return 403 for Manager', async () => {
        const response = await managerAgent.post('/api/applications').send(applicationData());
        expect(response.status).toBe(403);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing listingID', async () => {
        const response = await studentAgent.post('/api/applications').send({
          preferredRoomType: 'single',
        });
        expect(response.status).toBe(400);
      });

      it('should return 400 for invalid listingID format', async () => {
        const response = await studentAgent.post('/api/applications').send({
          listingID: 'invalid-id',
        });
        expect(response.status).toBe(400);
      });

      it('should return 400 for invalid preferredRoomType', async () => {
        const response = await studentAgent.post('/api/applications').send({
          listingID,
          preferredRoomType: 'invalid',
        });
        expect(response.status).toBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeId = '000000000000000000000000';
        const response = await studentAgent.post('/api/applications').send({
          listingID: fakeId,
        });
        expect(response.status).toBe(404);
      });

      it('should return 409 for duplicate application', async () => {
        const response = await studentAgent.post('/api/applications').send({
          listingID,
        });
        expect(response.status).toBe(409);
      });
    });

    describe('Success', () => {
      it('should create application without optional fields', async () => {
        const response = await studentAgent.post('/api/applications').send({
          listingID: otherListingID,
        });
        expect(response.status).toBe(201);
      });
    });
  });

  describe('GET /api/applications', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get('/api/applications');
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get('/api/applications');
        expect(response.status).toBe(403);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get('/api/applications');
        expect(response.status).toBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get('/api/applications');
        expect(response.status).toBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get('/api/applications');
        expect(response.status).toBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid status', async () => {
        const filter = { status: 'invalid' };
        const response = await adminAgent.get(
          `/api/applications?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response.status).toBe(400);
      });

      it('should return 400 for invalid preferredRoomType', async () => {
        const filter = { preferredRoomType: 'invalid' };
        const response = await adminAgent.get(
          `/api/applications?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response.status).toBe(400);
      });
    });

    describe('Success', () => {
      it('should return applications array', async () => {
        const response = await adminAgent.get('/api/applications');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('GET /api/applications/:applicationId', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get(`/api/applications/${applicationID}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for self (student)', async () => {
        const response = await studentAgent.get(`/api/applications/${applicationID}`);
        expect(response.status).toBe(200);
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.get(`/api/applications/${applicationID}`);
        expect(response.status).toBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get(`/api/applications/${applicationID}`);
        expect(response.status).toBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/applications/${applicationID}`);
        expect(response.status).toBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid applicationId format', async () => {
        const response = await adminAgent.get('/api/applications/invalid-id');
        expect(response.status).toBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent application', async () => {
        const fakeId = '000000000000000000000000';
        const response = await adminAgent.get(`/api/applications/${fakeId}`);
        expect(response.status).toBe(404);
      });
    });
  });

  describe('PATCH /api/applications/:applicationId', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.patch(`/api/applications/${applicationID}`).send({
          preferredRoomType: 'double',
        });
        expect(response.status).toBe(200);
      });

      it('should return 200 for self (student)', async () => {
        const response = await studentAgent.patch(`/api/applications/${applicationID}`).send({
          preferredRoomType: 'shared',
        });
        expect(response.status).toBe(200);
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.patch(`/api/applications/${applicationID}`).send({
          documentUrls: ['http://example.com/doc.pdf'],
        });
        expect(response.status).toBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.patch(`/api/applications/${applicationID}`).send({
          preferredRoomType: 'single',
        });
        expect(response.status).toBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/applications/${applicationID}`).send({
          preferredRoomType: 'single',
        });
        expect(response.status).toBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid preferredRoomType', async () => {
        const response = await adminAgent.patch(`/api/applications/${applicationID}`).send({
          preferredRoomType: 'invalid',
        });
        expect(response.status).toBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent application', async () => {
        const fakeId = '000000000000000000000000';
        const response = await adminAgent.patch(`/api/applications/${fakeId}`).send({
          preferredRoomType: 'single',
        });
        expect(response.status).toBe(404);
      });
    });
  });

  describe('PATCH /api/applications/:applicationId/status', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent
          .patch(`/api/applications/${applicationID}/status`)
          .send({
            status: 'landlord-approved',
          });
        expect(response.status).toBe(200);
      });

      it('should return 200 for manager', async () => {
        const newStudent = await buildStudent.create({});
        const newListing = buildListing.create({
          landlordID: landlord._id,
          managerID: manager._id,
        });
        const createResponse = await studentAgent.post('/api/applications').send({
          listingID: (newListing as any)._id,
        });
        const newAppId = createResponse.body.id;

        const statusResponse = await managerAgent
          .patch(`/api/applications/${newAppId}/status`)
          .send({
            status: 'manager-approved',
          });
        expect(statusResponse.status).toBe(200);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent
          .patch(`/api/applications/${applicationID}/status`)
          .send({
            status: 'pending',
          });
        expect(response.status).toBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/applications/${applicationID}/status`).send({
          status: 'pending',
        });
        expect(response.status).toBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid status', async () => {
        const response = await landlordAgent
          .patch(`/api/applications/${applicationID}/status`)
          .send({
            status: 'invalid',
          });
        expect(response.status).toBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent application', async () => {
        const fakeId = '000000000000000000000000';
        const response = await landlordAgent.patch(`/api/applications/${fakeId}/status`).send({
          status: 'pending',
        });
        expect(response.status).toBe(404);
      });
    });
  });

  describe('PATCH /api/applications/:applicationId/assign', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent
          .patch(`/api/applications/${applicationID}/assign`)
          .send({
            unitID: '000000000000000000000001',
          });
        expect(response.status).toBe(200);
      });

      it('should return 200 for manager', async () => {
        const newStudent = await buildStudent.create({});
        const newListing = buildListing.create({
          landlordID: landlord._id,
          managerID: manager._id,
        });
        const createResponse = await studentAgent.post('/api/applications').send({
          listingID: (newListing as any)._id,
        });
        const newAppId = createResponse.body.id;

        const assignResponse = await managerAgent
          .patch(`/api/applications/${newAppId}/assign`)
          .send({
            unitID: '000000000000000000000001',
          });
        expect(assignResponse.status).toBe(200);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent
          .patch(`/api/applications/${applicationID}/assign`)
          .send({
            unitID: '000000000000000000000001',
          });
        expect(response.status).toBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/applications/${applicationID}/assign`).send({
          unitID: '000000000000000000000001',
        });
        expect(response.status).toBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing unitID', async () => {
        const response = await landlordAgent
          .patch(`/api/applications/${applicationID}/assign`)
          .send({});
        expect(response.status).toBe(400);
      });

      it('should return 400 for invalid unitID format', async () => {
        const response = await landlordAgent
          .patch(`/api/applications/${applicationID}/assign`)
          .send({
            unitID: 'invalid',
          });
        expect(response.status).toBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent application', async () => {
        const fakeId = '000000000000000000000000';
        const response = await landlordAgent.patch(`/api/applications/${fakeId}/assign`).send({
          unitID: '000000000000000000000001',
        });
        expect(response.status).toBe(404);
      });
    });
  });

  describe('DELETE /api/applications/:applicationId', () => {
    let deletableAppId: string;

    beforeAll(async () => {
      const newStudent = await buildStudent.create({});
      const newListing = buildListing.create({
        landlordID: landlord._id,
        managerID: manager._id,
      });
      const createResponse = await studentAgent.post('/api/applications').send({
        listingID: (newListing as any)._id,
      });
      deletableAppId = createResponse.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.delete(`/api/applications/${deletableAppId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Application deleted successfully.');
      });

      it('should return 200 for self (student)', async () => {
        const newStudent = await buildStudent.create({});
        const newListing = buildListing.create({
          landlordID: landlord._id,
          managerID: manager._id,
        });
        const createResponse = await studentAgent.post('/api/applications').send({
          listingID: (newListing as any)._id,
        });

        const response = await studentAgent.delete(`/api/applications/${createResponse.body.id}`);
        expect(response.status).toBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.delete(`/api/applications/${deletableAppId}`);
        expect(response.status).toBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.delete(`/api/applications/${deletableAppId}`);
        expect(response.status).toBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/applications/${deletableAppId}`);
        expect(response.status).toBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent application', async () => {
        const fakeId = '000000000000000000000000';
        const response = await adminAgent.delete(`/api/applications/${fakeId}`);
        expect(response.status).toBe(404);
      });
    });
  });
});
