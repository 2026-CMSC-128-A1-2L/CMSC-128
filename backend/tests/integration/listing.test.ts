import '../../src/config.js';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildHousingFacility, buildEnumTag } from '../factories';
import {
  landlord,
  landlordAgent,
  guestAgent,
  studentAgent,
  managerAgent,
  manager,
} from './setup.js';

describe('Listings API', () => {
  let listingId: string;
  let existingFacilityId: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({
      landlordId: landlord._id,
      managerId: manager._id,
    });

    const tag = await buildEnumTag.create();

    existingFacilityId = (facility as any)._id;
  });

  const listingData = {
    roomType: 'double',
    capacity: 2,
    isPrivate: true,
    allowVisit: true,
    allowTransfer: false,
    description: 'Test listing',
    tags: [{ name: 'wifi-status', value: { type: 'enum', value: 'No WiFi' } }],
  };

  describe('POST /api/listings', () => {
    describe('Authentication', () => {
      it('should create listing and return 201 for Landlord', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          housingId: existingFacilityId,
        });

        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        listingId = response.body.id;
      });

      it('should create listing and return 201 for Manager', async () => {
        const response = await managerAgent.post('/api/listings').send({
          ...listingData,
          capacity: 6,
          isPrivate: false,
          housingId: existingFacilityId,
        });

        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        listingId = response.body.id;
      });

      it('should return 401 for Guest (Not Logged In)', async () => {
        const response = await guestAgent.post('/api/listings').send({
          ...listingData,
          housingId: existingFacilityId,
        });
        expect(response).statusToBe(401);
      });

      it('should return an error for Student (Not Authorized to Create)', async () => {
        const response = await studentAgent.post('/api/listings').send({
          ...listingData,
          housingId: existingFacilityId,
        });
        expect(response).statusToBe(403);
      });
    });

    describe('Validation', () => {
      it('should return a 400 when passing a negative capacity', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          capacity: -1,
          housingId: existingFacilityId,
        });

        expect(response).statusToBe(400);
      });
      it('should return a 404 when passing an invalid housing facility', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          housingId: 'ffffffffffffffffffffffff',
        });

        expect(response).statusToBe(404);
      });
      it('should return a 400 when passing a non-existent tag', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          tags: [{ name: 'water', value: { type: 'boolean', value: true } }],
          housingId: existingFacilityId,
        });

        expect(response).statusToBe(400);
      });
      it('should return a 400 when passing an invalid tag value', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          tags: [{ name: 'wifi-status', value: { type: 'enum', value: 'Invalid Value' } }],
          housingId: existingFacilityId,
        });

        expect(response).statusToBe(400);
      });
      it('should return a 400 when passing an invalid room type', async () => {
        const response = await landlordAgent.post('/api/listings').send({
          ...listingData,
          roomType: 'invalid-room-type',
          housingId: existingFacilityId,
        });

        expect(response).statusToBe(400);
      });
      it.skip('should return a 400 when passing invalid media', async () => { });
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

  describe('GET /api/listings/:listingId', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get(`/api/listings/${listingId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for verified student', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}`);
        expect(response).statusToBe(200);
      });

      it('should return 401 for guest (private listing)', async () => {
        const response = await guestAgent.get(`/api/listings/${listingId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.get('/api/listings/invalid-id');
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeId = '000000000000000000000000';
        const response = await studentAgent.get(`/api/listings/${fakeId}`);
        expect(response).statusToBe(404);
      });
    });
  });

  describe('PATCH /api/listings/:listingId', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}`).send({
          description: 'Updated description',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.description).toBe('Updated description');
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.patch(`/api/listings/${listingId}`).send({
          capacity: 5,
        });
        expect(response).statusToBe(200);
        expect(response.body.data.capacity).toBe(5);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.patch(`/api/listings/${listingId}`).send({
          description: 'Hacked',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/listings/${listingId}`).send({
          description: 'Hacked',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid room type', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}`).send({
          roomType: 'invalid',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for negative capacity', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}`).send({
          capacity: -1,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid tag', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}`).send({
          tags: [{ name: 'non-existent', value: { type: 'boolean', value: true } }],
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeId = '000000000000000000000000';
        const response = await landlordAgent.patch(`/api/listings/${fakeId}`).send({
          description: 'Test',
        });
        expect(response).statusToBe(404);
      });
    });
  });

  describe('DELETE /api/listings/:listingId', () => {
    let deletableListingId: string;

    beforeAll(async () => {
      const response = await landlordAgent.post('/api/listings').send({
        roomType: 'single',
        capacity: 1,
        isPrivate: false,
        allowVisit: false,
        allowTransfer: false,
        description: 'To be deleted',
        housingId: existingFacilityId,
      });
      deletableListingId = response.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.delete(`/api/listings/${deletableListingId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Listing deleted successfully.');
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.delete(`/api/listings/${listingId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.delete(`/api/listings/${listingId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/listings/${listingId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeId = '000000000000000000000000';
        const response = await landlordAgent.delete(`/api/listings/${fakeId}`);
        expect(response).statusToBe(404);
      });
    });
  });

  describe('GET /api/listings/:listingId/units', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get(`/api/listings/${listingId}/units`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.get(`/api/listings/${listingId}/units`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}/units`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/listings/${listingId}/units`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listing id', async () => {
        const response = await landlordAgent.get('/api/listings/invalid-id/units');
        expect(response).statusToBe(400);
      });
    });
  });

  describe('GET /api/listings/:listingId/reviews', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for student', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(200);
      });

      it('should return 200 for guest', async () => {
        const response = await guestAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(200);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.get('/api/listings/invalid-id/reviews');
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should return empty array for listing with no reviews', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('GET /api/listings/:listingId/applications', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get(`/api/listings/${listingId}/applications`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.get(`/api/listings/${listingId}/applications`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}/applications`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/listings/${listingId}/applications`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listing id', async () => {
        const response = await landlordAgent.get('/api/listings/invalid-id/applications');
        expect(response).statusToBe(400);
      });
    });
  });

  describe('GET /api/listings/:listingId/visits', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get(`/api/listings/${listingId}/visits`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.get(`/api/listings/${listingId}/visits`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}/visits`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/listings/${listingId}/visits`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listing id', async () => {
        const response = await landlordAgent.get('/api/listings/invalid-id/visits');
        expect(response).statusToBe(400);
      });
    });
  });

  describe('PATCH /api/listings/:listingId/tags', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}/tags`).send({
          tags: [{ name: 'wifi-status', value: { type: 'enum', value: 'Has WiFi' } }],
        });
        expect(response).statusToBe(200);
        expect(response.body.data.tags).toBeDefined();
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.patch(`/api/listings/${listingId}/tags`).send({
          tags: [{ name: 'wifi-status', value: { type: 'enum', value: 'No WiFi' } }],
        });
        expect(response).statusToBe(200);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.patch(`/api/listings/${listingId}/tags`).send({
          tags: [{ name: 'wifi-status', value: { type: 'enum', value: 'Has WiFi' } }],
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/listings/${listingId}/tags`).send({
          tags: [{ name: 'wifi-status', value: { type: 'enum', value: 'Has WiFi' } }],
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid tag name', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}/tags`).send({
          tags: [{ name: '', value: { type: 'boolean', value: true } }],
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for non-existent tag', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}/tags`).send({
          tags: [{ name: 'non-existent-tag', value: { type: 'boolean', value: true } }],
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid tag value type', async () => {
        const response = await landlordAgent.patch(`/api/listings/${listingId}/tags`).send({
          tags: [{ name: 'wifi-status', value: { type: 'enum', value: 123 } }],
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeId = '000000000000000000000000';
        const response = await landlordAgent.patch(`/api/listings/${fakeId}/tags`).send({
          tags: [{ name: 'wifi-status', value: { type: 'enum', value: 'Has WiFi' } }],
        });
        expect(response).statusToBe(404);
      });
    });
  });
});
