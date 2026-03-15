import '../../src/config.js';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildHousingFacility } from '../factories';
import {
  landlord,
  landlordAgent,
  guestAgent,
  studentAgent,
  managerAgent,
  manager,
} from './setup.js';

describe('Listings API', () => {
  let listingID: string;
  let existingFacilityID: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({
      landlordID: landlord._id,
      managerID: manager._id,
    });

    existingFacilityID = (facility as any)._id;
  });

  // No tags incuded
  const listingData = {
    roomType: 'double',
    capacity: 2,
    isPrivate: true,
    allowVisit: true,
    allowTransfer: false,
    description: 'Test listing',
  };

  // Testing creating a listing as landlord
  describe('POST /api/listings', () => {
    describe('Authentication', () => {
      it('should create listing and return 201 for Landlord', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          housingID: existingFacilityID,
        });

        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        listingID = response.body.id;
      });

      it('should create listing and return 201 for Manager', async () => {
        const response = await managerAgent.post('/api/listings').send({
          ...listingData,
          capacity: 6,
          isPrivate: false,
          housingID: existingFacilityID,
        });

        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        listingID = response.body.id;
      });

      // Testing error for unauthorized creation
      it('should return 401 for Guest (Not Logged In)', async () => {
        const response = await guestAgent.post('/api/listings').send({
          ...listingData,
          housingID: existingFacilityID,
        });
        expect(response).statusToBe(401);
      });

      it('should return an error for Student (Not Authorized to Create)', async () => {
        const response = await studentAgent.post('/api/listings').send({
          ...listingData,
          housingID: existingFacilityID,
        });
        expect(response).statusToBe(403);
      });
    });

    describe('Validation', () => {
      it('should return a 400 when passing a negative capacity', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          capacity: -1,
          housingID: existingFacilityID,
        });

        expect(response).statusToBe(400);
      });
      it('should return a 404 when passing an invalid housing facility', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          housingID: 'ffffffffffffffffffffffff',
        });

        expect(response).statusToBe(404);
      });
      it('should return a 400 when passing a non-existent tag', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          tags: [{ name: 'water', value: { type: 'boolean', value: true } }],
          housingID: existingFacilityID,
        });

        expect(response).statusToBe(400);
      });
      it('should return a 400 when passing an invalid tag value', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          tags: [{ name: 'wifi', value: { type: 'enum', value: 'Invalid Value' } }],
          housingID: existingFacilityID,
        });

        expect(response).statusToBe(400);
      });
      it('should return a 400 when passing an invalid room type', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          roomType: 'invalid-room-type',
          housingID: existingFacilityID,
        });

        expect(response).statusToBe(400);
      });
      it.skip('should return a 400 when passing invalid media', async () => {});
    });
  });

  describe('GET /api/listings', () => {
    describe('Logic', () => {
      it('should retrieve two listings with empty query', async () => {
        const response = await studentAgent.get(`/api/listings?q=`);

        expect(response).statusToBe(200);
        expect(response.body.data.length).toBe(2);
      });

      it('should retrieve one listing', async () => {
        const filter = { capacity: { min: 0, max: 4 } };
        const response = await studentAgent.get(
          `/api/listings?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );

        expect(response).statusToBe(200);
        expect(response.body.data.length).toBe(1);
      });

      it('should not retrieve any listing (filtered out)', async () => {
        const filter = { capacity: { min: 10, max: 14 } };
        const response = await studentAgent.get(
          `/api/listings?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );

        expect(response).statusToBe(200);
        expect(response.body.data.length).toBe(0);
      });

      it('should retrieve one listing (public only)', async () => {
        const response = await guestAgent.get(`/api/listings?q=`);

        expect(response).statusToBe(200);
        expect(response.body.data.length).toBe(1);
      });
    });
  });
});
