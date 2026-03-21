import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import {
  adminAgent,
  landlord,
  landlordAgent,
  manager,
  managerAgent,
  otherManagerAgent,
  studentAgent,
  guestAgent,
} from './setup.js';
import { buildHousingFacility, buildListing, buildUnit } from '../factories';

describe('Units API', () => {
  let listingId: string;
  let unitId: string;
  let otherLandlordListingId: string;

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

    listingId = (listing as any)._id;

    const otherLandlordFacility = await buildHousingFacility.create({});
    const otherLandlordListing = await buildListing.create({
      housingID: (otherLandlordFacility as any)._id,
      landlordID: (otherLandlordFacility as any).landlordID,
    });
    otherLandlordListingId = (otherLandlordListing as any)._id;
  });

  const validUnitData = {
    roomNumber: '101',
    capacity: 2,
    currentOccupancy: 0,
    price: 5000,
    location: 'Floor 1',
    isAvailable: true,
    listingID: '',
  };

  describe('GET /api/units', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get('/api/units');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get('/api/units');
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get('/api/units');
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get('/api/units');
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get('/api/units');
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 200 with valid query params', async () => {
        const filter = { capacity: 2, price: 5000, isAvailable: true };
        const response = await adminAgent.get(
          `/api/units?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(200);
      });

      it('should return 400 for invalid isAvailable type', async () => {
        const filter = { isAvailable: 'invalid' };
        const response = await adminAgent.get(
          `/api/units?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(400);
      });
    });
  });

  describe('POST /api/units', () => {
    describe('Authentication', () => {
      it('should return 201 for landlord', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          listingID: listingId,
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        unitId = response.body.id;
      });

      it('should return 201 for manager', async () => {
        const response = await managerAgent.post('/api/units').send({
          ...validUnitData,
          roomNumber: '102',
          listingID: listingId,
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should return 403 for other landlord', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          roomNumber: '103',
          listingID: otherLandlordListingId,
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.post('/api/units').send({
          ...validUnitData,
          listingID: listingId,
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post('/api/units').send({
          ...validUnitData,
          listingID: listingId,
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field roomNumber', async () => {
        const { roomNumber, ...dataWithoutRoomNumber } = validUnitData;
        const response = await landlordAgent.post('/api/units').send({
          ...dataWithoutRoomNumber,
          listingID: listingId,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field capacity', async () => {
        const { capacity, ...dataWithoutCapacity } = validUnitData;
        const response = await landlordAgent.post('/api/units').send({
          ...dataWithoutCapacity,
          listingID: listingId,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for negative capacity', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          capacity: -1,
          listingID: listingId,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for zero capacity', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          capacity: 0,
          listingID: listingId,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for negative price', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          price: -100,
          listingID: listingId,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid isAvailable', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          isAvailable: 'invalid',
          listingID: listingId,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid listingID format', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          listingID: 'invalid-id',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeListingId = '000000000000000000000000';
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          listingID: fakeListingId,
        });
        expect(response).statusToBe(404);
      });

      it('should return 409 for duplicate room number', async () => {
        const response = await landlordAgent.post('/api/units').send({
          ...validUnitData,
          roomNumber: '101',
          listingID: listingId,
        });
        expect(response).statusToBe(409);
      });
    });
  });

  describe('GET /api/units/:unitId', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get(`/api/units/${unitId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.get(`/api/units/${unitId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for student (tenant)', async () => {
        const response = await studentAgent.get(`/api/units/${unitId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for other landlord', async () => {
        const otherUnit = await buildUnit.create({
          listingID: otherLandlordListingId,
          landlordID: (await buildHousingFacility.create({})).landlordID,
        });
        const response = await landlordAgent.get(`/api/units/${(otherUnit as any)._id}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/units/${unitId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid unitId format', async () => {
        const response = await landlordAgent.get('/api/units/invalid-id');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent unit', async () => {
        const fakeUnitId = '000000000000000000000000';
        const response = await landlordAgent.get(`/api/units/${fakeUnitId}`);
        expect(response).statusToBe(404);
      });
    });

    describe('Success', () => {
      it('should return correct unit data structure', async () => {
        const response = await landlordAgent.get(`/api/units/${unitId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toMatchObject({
          roomNumber: '101',
          capacity: 2,
          currentOccupancy: 0,
          price: 5000,
        });
      });
    });
  });

  describe('PATCH /api/units/:unitId', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord updating their unit', async () => {
        const response = await landlordAgent.patch(`/api/units/${unitId}`).send({
          roomNumber: '101-A',
          capacity: 3,
        });
        expect(response).statusToBe(200);
        expect(response.body.data.roomNumber).toBe('101-A');
      });

      it('should return 200 for manager updating their assigned unit', async () => {
        const response = await managerAgent.patch(`/api/units/${unitId}`).send({
          price: 6000,
        });
        expect(response).statusToBe(200);
        expect(response.body.data.price).toBe(6000);
      });

      it('should return 403 for other landlord', async () => {
        const otherUnit = await buildUnit.create({
          listingID: otherLandlordListingId,
          landlordID: (await buildHousingFacility.create({})).landlordID,
        });
        const response = await landlordAgent.patch(`/api/units/${(otherUnit as any)._id}`).send({
          price: 7000,
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.patch(`/api/units/${unitId}`).send({
          price: 7000,
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/units/${unitId}`).send({
          price: 7000,
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for negative capacity', async () => {
        const response = await landlordAgent.patch(`/api/units/${unitId}`).send({
          capacity: -1,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for negative price', async () => {
        const response = await landlordAgent.patch(`/api/units/${unitId}`).send({
          price: -100,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid isAvailable', async () => {
        const response = await landlordAgent.patch(`/api/units/${unitId}`).send({
          isAvailable: 'invalid',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for currentOccupancy greater than capacity', async () => {
        const response = await landlordAgent.patch(`/api/units/${unitId}`).send({
          currentOccupancy: 10,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid unitId format', async () => {
        const response = await landlordAgent.patch('/api/units/invalid-id').send({
          price: 7000,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 422 when currentOccupancy exceeds capacity', async () => {
        const response = await landlordAgent.patch(`/api/units/${unitId}`).send({
          capacity: 2,
          currentOccupancy: 3,
        });
        expect(response).statusToBe(422);
      });

      it('should return 404 for non-existent unit', async () => {
        const fakeUnitId = '000000000000000000000000';
        const response = await landlordAgent.patch(`/api/units/${fakeUnitId}`).send({
          price: 7000,
        });
        expect(response).statusToBe(404);
      });
    });
  });

  describe('DELETE /api/units/:unitId', () => {
    let deletableUnitId: string;

    beforeAll(async () => {
      const response = await landlordAgent.post('/api/units').send({
        ...validUnitData,
        roomNumber: 'DELETE-ME',
        listingID: listingId,
      });
      deletableUnitId = response.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for landlord deleting their unit', async () => {
        const response = await landlordAgent.delete(`/api/units/${deletableUnitId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Unit deleted successfully.');
      });

      it('should return 403 for manager', async () => {
        const unit = await buildUnit.create({
          listingID: listingId,
          landlordID: landlord._id,
        });
        const response = await managerAgent.delete(`/api/units/${(unit as any)._id}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const unit = await buildUnit.create({
          listingID: listingId,
          landlordID: landlord._id,
        });
        const response = await studentAgent.delete(`/api/units/${(unit as any)._id}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const unit = await buildUnit.create({
          listingID: listingId,
          landlordID: landlord._id,
        });
        const response = await guestAgent.delete(`/api/units/${(unit as any)._id}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent unit', async () => {
        const fakeUnitId = '000000000000000000000000';
        const response = await landlordAgent.delete(`/api/units/${fakeUnitId}`);
        expect(response).statusToBe(404);
      });

      it('should return 422 when deleting unit with active rentals', async () => {});
    });
  });

  describe('GET /api/units/listing/:listingId', () => {
    describe('Authentication', () => {
      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get(`/api/units/listing/${listingId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should return 200 for manager', async () => {
        const response = await managerAgent.get(`/api/units/listing/${listingId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for other landlord', async () => {
        const response = await landlordAgent.get(`/api/units/listing/${otherLandlordListingId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get(`/api/units/listing/${listingId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listingId format', async () => {
        const response = await landlordAgent.get('/api/units/listing/invalid-id');
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should return empty array for listing with no units', async () => {
        const newFacility = await buildHousingFacility.create({});
        const newListing = await buildListing.create({
          housingID: (newFacility as any)._id,
          landlordID: (newFacility as any).landlordID,
        });
        const response = await landlordAgent.get(`/api/units/listing/${(newListing as any)._id}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toEqual([]);
      });
    });
  });
});
