import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { HousingFacilityParams } from '../factories';
import {
  landlord,
  landlordAgent,
  managerAgent,
  guestAgent,
  studentAgent,
  manager,
  otherManagerAgent,
} from './setup.js';

describe('Facilities API', () => {
  let facilityId: string;
  let validFacility: HousingFacilityParams;

  beforeAll(() => {
    validFacility = {
      name: `Test Facility 1`,
      landlordId: landlord._id,
      managers: [
        {
          managerId: manager._id,
          permissions: { manageBillings: true, manageApplications: true, manageListings: true },
        },
      ],
      type: 'on-campus',
      capacity: 100,
      documentUrls: [],
      isAcceptingApplications: false,
      applicationCloseDate: new Date(2026, 3, 6, 18, 15, 10).toISOString(),
      applicationOpenDate: new Date(2026, 2, 6, 18, 15, 10).toISOString(),
      listings: [],
    };
  });

  describe('POST /api/facilities', () => {
    describe('Authentication', () => {
      it('should create a facility as landlord', async () => {
        const response = await landlordAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        facilityId = response.body.id;
      });

      it('should not create a facility as manager', async () => {
        const response = await managerAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(403);
      });

      it('should return 401 for unauthenticated user', async () => {
        const response = await guestAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(401);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(403);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid data type', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...validFacility,
          applicationCloseDate: 'invalid-date',
        });
        expect(response).statusToBe(400);
      });

      it('should reject invalid facility type', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...validFacility,
          applicationCloseDate: 'invalid-date',
        });
        expect(response).statusToBe(400);
      });

      it('should reject missing required fields', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          name: 'Test',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 422 when close date is before open date', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...validFacility,
          applicationCloseDate: validFacility.applicationOpenDate,
          applicationOpenDate: validFacility.applicationCloseDate,
        });
        expect(response).statusToBe(422);
      });
    });
  });

  describe('GET /api/facilities/:id', () => {
    describe('Authentication', () => {
      it('should allow guests to get facility by id', async () => {
        const response = await guestAgent.get(`/api/facilities/${facilityId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.name).toBe(validFacility.name);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid facility id', async () => {
        const response = await guestAgent.get('/api/facilities/invalid-id');
        expect(response).statusToBe(400);
      });
    });
  });

  describe('PATCH /api/facilities/:id', () => {
    describe('Authentication', () => {
      it('should update facility as landlord', async () => {
        const response = await landlordAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Facility Name' });
        expect(response).statusToBe(200);
        expect(response.body.data.name).toBe('Updated Facility Name');
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Name' });
        expect(response).statusToBe(403);
      });

      it('should return 403 for wrong manager', async () => {
        const response = await otherManagerAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Name' });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager if changing managers', async () => {
        const response = await managerAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ managers: [] });
        expect(response).statusToBe(403);
      });

      it('should update facility as manager', async () => {
        const response = await managerAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated name' });
        expect(response).statusToBe(200);
        expect(response.body.data.name).toBe('Updated name');
      });

      it('should return 401 for unauthenticated user', async () => {
        const response = await guestAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Name' });
        expect(response).statusToBe(401);
      });
    });
  });
});
