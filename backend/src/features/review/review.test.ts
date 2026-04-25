/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '../../config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { buildHousingFacility } from '../../test/factories.js';
import {
  landlord,
  landlordAgent,
  studentAgent,
  guestAgent,
  student,
} from '../../test/setup.js';
import { Listing } from '../listing/listing.model.js';
import mongoose from 'mongoose';

describe('Reviews API', () => {
  let listingId: string;
  let reviewId: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({
      landlordId: landlord._id,
    });

    const listing = await new Listing({
      facilityId: facility._id,
      landlordId: landlord._id,
      managers: [],
      roomType: 'single',
      capacity: 1,
      isPrivate: false,
      allowVisit: true,
      allowTransfer: false,
      description: 'Test listing',
    }).save();

    listingId = listing._id.toString();
  });

  describe('POST /api/listings/:listingId/reviews', () => {
    describe('Authentication', () => {
      it('should create a review as a student', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          userId: student._id,
          listingId,
          ratings: { quality: 4, comfort: 3, environment: 5 },
          description: 'Great place!',
        });
        expect(response).statusToBe(201);
        expect(response.body.data._id).toBeDefined();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        reviewId = response.body.data._id;
      });

      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.post('/api/listings/invalid-id/reviews').send({
          userId: student._id,
          listingId: 'invalid-id',
          ratings: { quality: 4, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Validation', () => {
      it('should return 400 for out-of-range ratings', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          userId: student._id,
          listingId,
          ratings: { quality: 6, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required fields', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          userId: student._id,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await studentAgent.post(`/api/listings/${fakeId}/reviews`).send({
          userId: student._id,
          listingId: fakeId,
          ratings: { quality: 4, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(404);
      });
    });
  });

  describe('GET /api/listings/:listingId/reviews', () => {
    describe('Authentication', () => {
      it('should return reviews for authenticated students', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should return 404 for guests (listing not visible without auth)', async () => {
        const response = await guestAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(404);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.get('/api/listings/invalid-id/reviews');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent listing', async () => {
        const response = await studentAgent.get(
          `/api/listings/${new mongoose.Types.ObjectId()}/reviews`,
        );
        expect(response).statusToBe(404);
      });
    });
  });

  describe('GET /api/reviews', () => {
    describe('Authentication', () => {
      it('should return reviews for authenticated students', async () => {
        const response = await studentAgent.get('/api/reviews');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should return reviews for landlords', async () => {
        const response = await landlordAgent.get('/api/reviews');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should return reviews for guests (public listings only)', async () => {
        const response = await guestAgent.get('/api/reviews');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('PATCH /api/reviews/:reviewId', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.patch(`/api/reviews/${reviewId}`).send({
          reviewId,
          ratings: { quality: 5, comfort: 5, environment: 5 },
        });
        expect(response).statusToBe(401);
      });

      it('should allow the author to update their own review', async () => {
        const response = await studentAgent.patch(`/api/reviews/${reviewId}`).send({
          reviewId,
          ratings: { quality: 5, comfort: 5, environment: 5 },
          description: 'Updated description',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.ratings.quality).toBe(5);
      });
    });

    describe('Logic', () => {
      it('should return 404 when updating a review that does not belong to the user', async () => {
        const response = await landlordAgent.patch(`/api/reviews/${reviewId}`).send({
          reviewId,
          ratings: { quality: 1, comfort: 1, environment: 1 },
        });
        expect(response).statusToBe(404);
      });
    });
  });

  describe('DELETE /api/reviews/:reviewId', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 404 when deleting a review that does not belong to the user', async () => {
        const response = await landlordAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(404);
      });

      it('should allow the author to delete their own review', async () => {
        const response = await studentAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(200);
      });

      it('should return 404 after deletion', async () => {
        const response = await studentAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(404);
      });
    });
  });
});
