import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { buildHousingFacility, buildListing, HousingFacilityParams } from '../factories';
import {
  landlord,
  landlordAgent,
  managerAgent,
  guestAgent,
  studentAgent,
  manager,
  otherManagerAgent,
} from './setup.js';
import mongoose from 'mongoose';

describe('Facilities API', () => {
  let listingId: mongoose.Types.ObjectId;
  let otherListingId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({
      landlordID: landlord._id,
      managerID: manager._id,
    });

    const listing = await buildListing.create({
      landlordID: landlord._id,
      managerID: manager._id,
      housingID: (facility as any)._id
    })

    const otherListing = await buildListing.create({
      landlordID: landlord._id,
      managerID: manager._id,
      housingID: (facility as any)._id
    })

    listingId = (listing as any)._id;
    otherListingId = (otherListing as any)._id;
  });

  describe('POST /api/bookmarks', () => {
    describe('Authentication', () => {
      it('should not bookmark as landlord', async () => {
        const response = await landlordAgent.post('/api/bookmarks').send({
          listingID: listingId
        });
        expect(response).statusToBe(403);
      });

      it('should not bookmark as unauthenticated user', async () => {
        const response = await guestAgent.post('/api/bookmarks').send({ listingID: listingId });
        expect(response).statusToBe(401);
      });

      it('should bookmark as student', async () => {
        const response = await studentAgent.post('/api/bookmarks').send({ listingID: listingId });
        expect(response).statusToBe(201);
      });
    });
  });
});
