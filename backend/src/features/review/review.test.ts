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
import { Unit } from '../unit/unit.model.js';
import { Rental } from '../rental/rental.model.js';
import mongoose from 'mongoose';

describe('Reviews API', () => {
  let listingId: string;
  let facilityId: string;
  let reviewId: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({
      landlordId: landlord._id,
    });

    facilityId = facility._id.toString();

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

    // Create a unit under the listing, then an active rental for the student.
    // createReview checks that the reviewer has an active rental in the listing.
    const unit = await new Unit({
      listingId: listing._id,
      roomNumber: 'REVIEW-TEST-101',
      capacity: 1,
      price: 5000,
    }).save();

    await new Rental({
      userId: student._id,
      facilityId: facility._id,
      unitId: unit._id,
      status: 'active',
    }).save();
  });

  describe('POST /api/listings/:listingId/reviews', () => {
    describe('Authentication', () => {
      it('should create a review as an active tenant student', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
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
          ratings: { quality: 4, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Validation', () => {
      it('should return 400 for out-of-range ratings', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 6, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required fields', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({});
        expect(response).statusToBe(400);
      });

      it('should return 400 when mediaUrls exceeds 2 items', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 4, comfort: 3, environment: 5 },
          mediaUrls: [
            'https://example.com/a.jpg',
            'https://example.com/b.jpg',
            'https://example.com/c.jpg',
          ],
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await studentAgent.post(`/api/listings/${fakeId}/reviews`).send({
          ratings: { quality: 4, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(404);
      });

      it('should return 422 when the user is not an active tenant', async () => {
        const response = await landlordAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 4, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(422);
      });

      it('should create a review with mediaUrls and store them as media', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 3, comfort: 4, environment: 4 },
          description: 'With photos',
          mediaUrls: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        });
        expect(response).statusToBe(201);
        expect(response.body.data.media).toHaveLength(2);
        expect(response.body.data.media[0].sourceType).toBe('external');
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

  describe('GET /api/facilities/:facilityId/reviews', () => {
    describe('Authentication', () => {
      it('should return reviews for a facility', async () => {
        const response = await studentAgent.get(`/api/facilities/${facilityId}/reviews`);
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent facility', async () => {
        const response = await studentAgent.get(
          `/api/facilities/${new mongoose.Types.ObjectId()}/reviews`,
        );
        expect(response).statusToBe(404);
      });
    });
  });

  describe('GET /api/facilities/:facilityId/average-ratings', () => {
    describe('Logic', () => {
      it('should return average ratings for a facility with reviews', async () => {
        const response = await studentAgent.get(
          `/api/facilities/${facilityId}/average-ratings`,
        );
        expect(response).statusToBe(200);
        expect(response.body.data.quality).toBeDefined();
        expect(response.body.data.comfort).toBeDefined();
        expect(response.body.data.environment).toBeDefined();
        expect(response.body.data.overall).toBeDefined();
        expect(response.body.data.total).toBeGreaterThan(0);
      });

      it('should return a message when the facility has no reviews', async () => {
        const emptyFacility = await buildHousingFacility.create({ landlordId: landlord._id });
        const response = await studentAgent.get(
          `/api/facilities/${emptyFacility._id.toString()}/average-ratings`,
        );
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('No reviews yet.');
      });

      it('should return 404 for non-existent facility', async () => {
        const response = await studentAgent.get(
          `/api/facilities/${new mongoose.Types.ObjectId()}/average-ratings`,
        );
        expect(response).statusToBe(404);
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
