import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import {
  adminAgent,
  landlord,
  landlordAgent,
  manager,
  managerAgent,
  studentAgent,
  guestAgent,
} from './setup.js';
import { buildHousingFacility, buildListing, buildUnit, buildStudent } from '../factories';

describe('Rentals API', () => {
  let unitId: string;
  let otherLandlordUnitId: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({
      landlordID: landlord._id,
      managerID: manager._id,
    });

    const listing = await buildListing.create({
      housingID: (facility as any)._id,
      landlordID: landlord._id,
      managerID: manager._id,
    });

    const unit = await buildUnit.create({
      listingID: (listing as any)._id,
      landlordID: landlord._id,
      managerID: manager._id,
    });

    unitId = (unit as any)._id;

    const otherFacility = await buildHousingFacility.create({});
    const otherListing = await buildListing.create({
      housingID: (otherFacility as any)._id,
      landlordID: (otherFacility as any).landlordID,
    });
    const otherUnit = await buildUnit.create({
      listingID: (otherListing as any)._id,
      landlordID: (otherFacility as any).landlordID,
    });
    otherLandlordUnitId = (otherUnit as any)._id;
  });

  describe('GET /api/rentals', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get('/api/rentals');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get('/api/rentals');
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get('/api/rentals');
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get('/api/rentals');
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get('/api/rentals');
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 200 with valid query params', async () => {
        const filter = { status: 'active' };
        const response = await adminAgent.get(
          `/api/rentals?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(200);
      });

      it('should return 400 for invalid status enum', async () => {
        const filter = { status: 'invalid' };
        const response = await adminAgent.get(
          `/api/rentals?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should return empty array when no rentals exist', async () => {
        const response = await adminAgent.get('/api/rentals');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('POST /api/rentals', () => {
    describe('Authentication', () => {
      it('should return 201 for landlord', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should return 201 for manager', async () => {
        const studentUser = await buildStudent.create();
        const response = await managerAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(201);
      });

      it('should return 403 for landlord accessing other landlord unit', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: otherLandlordUnitId,
          status: 'inactive',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const studentUser = await buildStudent.create();
        const response = await studentAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const studentUser = await buildStudent.create();
        const response = await guestAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field studentID', async () => {
        const response = await landlordAgent.post('/api/rentals').send({
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field unitID', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          status: 'inactive',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field status', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid status enum', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'invalid',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid studentID format', async () => {
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: 'invalid-id',
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid unitID format', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: 'invalid-id',
          status: 'inactive',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid date format', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
          expectedMoveInDate: 'not-a-date',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent unit', async () => {
        const studentUser = await buildStudent.create();
        const fakeUnitId = '000000000000000000000000';
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: fakeUnitId,
          status: 'inactive',
        });
        expect(response).statusToBe(404);
      });

      it('should return 404 for non-existent student', async () => {
        const fakeStudentId = '000000000000000000000000';
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: fakeStudentId,
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(404);
      });

      it('should return 422 for expectedMoveInDate after expectedMoveOutDate', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
          expectedMoveInDate: '2026-06-01T00:00:00.000Z',
          expectedMoveOutDate: '2026-05-01T00:00:00.000Z',
        });
        expect(response).statusToBe(422);
      });
    });

    describe('Success', () => {
      it('should create rental with status inactive', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should create rental with applicationID', async () => {
        const studentUser = await buildStudent.create();
        const response = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          applicationID: '000000000000000000000000',
          status: 'inactive',
        });
        expect(response).statusToBe(201);
      });
    });
  });

  describe('PATCH /api/rentals/:rentalId', () => {
    let rentalId: string;

    beforeAll(async () => {
      const studentUser = await buildStudent.create();
      const response = await landlordAgent.post('/api/rentals').send({
        studentID: (studentUser as any)._id,
        unitID: unitId,
        status: 'inactive',
      });
      rentalId = response.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.patch(`/api/rentals/${rentalId}`).send({
          status: 'active',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.status).toBe('active');
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.patch(`/api/rentals/${rentalId}`).send({
          status: 'on_waitlist',
        });
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord accessing other landlord rental', async () => {
        const studentUser = await buildStudent.create();
        const otherRental = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: otherLandlordUnitId,
          status: 'inactive',
        });
        const response = await landlordAgent.patch(`/api/rentals/${otherRental.body.id}`).send({
          status: 'active',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.patch(`/api/rentals/${rentalId}`).send({
          status: 'active',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/rentals/${rentalId}`).send({
          status: 'active',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid status enum', async () => {
        const response = await landlordAgent.patch(`/api/rentals/${rentalId}`).send({
          status: 'invalid',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid rentalId format', async () => {
        const response = await landlordAgent.patch('/api/rentals/invalid-id').send({
          status: 'active',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid date format', async () => {
        const response = await landlordAgent.patch(`/api/rentals/${rentalId}`).send({
          expectedMoveInDate: 'not-a-date',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent rental', async () => {
        const fakeRentalId = '000000000000000000000000';
        const response = await landlordAgent.patch(`/api/rentals/${fakeRentalId}`).send({
          status: 'active',
        });
        expect(response).statusToBe(404);
      });

      it('should return 422 for invalid status transition', async () => {
        const response = await landlordAgent.patch(`/api/rentals/${rentalId}`).send({
          status: 'ended',
        });
        expect(response).statusToBe(422);
      });
    });

    describe('Success', () => {
      it('should update status successfully', async () => {
        const response = await landlordAgent.patch(`/api/rentals/${rentalId}`).send({
          status: 'active',
          actualMoveInDate: '2026-06-01T00:00:00.000Z',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.status).toBe('active');
      });

      it('should update dates successfully', async () => {
        const response = await landlordAgent.patch(`/api/rentals/${rentalId}`).send({
          expectedMoveOutDate: '2027-05-31T00:00:00.000Z',
        });
        expect(response).statusToBe(200);
      });
    });
  });

  describe('DELETE /api/rentals/:rentalId', () => {
    let deletableRentalId: string;

    beforeAll(async () => {
      const studentUser = await buildStudent.create();
      const response = await landlordAgent.post('/api/rentals').send({
        studentID: (studentUser as any)._id,
        unitID: unitId,
        status: 'inactive',
      });
      deletableRentalId = response.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.delete(`/api/rentals/${deletableRentalId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Rental deleted successfully.');
      });

      it('should return 403 for landlord', async () => {
        const studentUser = await buildStudent.create();
        const createResponse = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'inactive',
        });
        const response = await landlordAgent.delete(`/api/rentals/${createResponse.body.id}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.delete(`/api/rentals/${deletableRentalId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.delete(`/api/rentals/${deletableRentalId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/rentals/${deletableRentalId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent rental', async () => {
        const fakeRentalId = '000000000000000000000000';
        const response = await adminAgent.delete(`/api/rentals/${fakeRentalId}`);
        expect(response).statusToBe(404);
      });

      it('should return 422 for deleting rental with active status', async () => {
        const studentUser = await buildStudent.create();
        const createResponse = await landlordAgent.post('/api/rentals').send({
          studentID: (studentUser as any)._id,
          unitID: unitId,
          status: 'active',
        });
        const response = await adminAgent.delete(`/api/rentals/${createResponse.body.id}`);
        expect(response).statusToBe(422);
      });
    });
  });
});
