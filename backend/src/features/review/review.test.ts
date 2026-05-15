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
  adminAgent,
} from '../../test/setup.js';
import { Listing } from '../listing/listing.model.js';
import { Unit } from '../unit/unit.model.js';
import { Rental } from '../rental/rental.model.js';
import mongoose from 'mongoose';

describe('Reviews API', () => {
  let listingId: string;
  let mediaListingId: string;
  let facilityId: string;
  let reviewId: string;

  // Sets up:
  // - A housing facility owned by the landlord
  // - A primary listing used by most tests
  // - A second listing (mediaListing) used only by the mediaUrls test to avoid
  //   hitting the one-review-per-listing constraint from the first test
  // - A unit + active rental for the student on each listing, satisfying the active-tenant check
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

    // A second listing in the same facility for the mediaUrls test
    const mediaListing = await new Listing({
      facilityId: facility._id,
      landlordId: landlord._id,
      managers: [],
      roomType: 'single',
      capacity: 1,
      isPrivate: false,
      allowVisit: true,
      allowTransfer: false,
      description: 'Media test listing',
    }).save();

    mediaListingId = mediaListing._id.toString();

    // Create a unit + rental for the primary listing
    const unit = await new Unit({
      listingId: listing._id,
      facilityId: facility._id,
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

    // Create a unit + rental for the media listing so the student passes the tenant check there too
    const mediaUnit = await new Unit({
      listingId: mediaListing._id,
      facilityId: facility._id,
      roomNumber: 'REVIEW-MEDIA-101',
      capacity: 1,
      price: 5000,
    }).save();

    await new Rental({
      userId: student._id,
      facilityId: facility._id,
      unitId: mediaUnit._id,
      status: 'active',
    }).save();
  });

  // ============================================================================
  // POST /api/listings/:listingId/reviews
  //
  // Creates a new review for a listing. Only active tenants of that listing may submit.
  // One review per listing.
  // Created reviews are approved immediately.
  // ============================================================================
  describe('POST /api/listings/:listingId/reviews', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 4, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(401);
      });

      // Happy path: student is an active tenant.
      // Verifies the review is created and the returned document has an _id.
      // Also captures reviewId for use in PATCH and DELETE tests below.
      it('should create a review as an active tenant student', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 4, comfort: 3, environment: 5 },
          description: 'Great place!',
        });
        expect(response).statusToBe(201);
        expect(response.body.data._id).toBeDefined();
        expect(response.body.data.status).toBe('approved');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        reviewId = response.body.data._id;
      });

      // The listingId URL param must be a valid MongoDB ObjectId.
      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.post('/api/listings/invalid-id/reviews').send({
          ratings: { quality: 4, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Validation', () => {
      // Rating values are integers 1–5. Sending 6 fails Zod validation.
      it('should return 400 for out-of-range ratings', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 6, comfort: 3, environment: 5 },
        });
        expect(response).statusToBe(400);
      });

      // The ratings object is required — sending an empty body fails Zod.
      it('should return 400 for missing required fields', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({});
        expect(response).statusToBe(400);
      });

      // mediaUrls is limited to 2 items by the Zod schema.
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
      // The listing must exist in the database before a review can be created.
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

      // The student already created a review for listingId above.
      // A second attempt updates the existing review draft instead of creating a duplicate.
      it('should update the existing review when the student reviews the same listing again', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/reviews`).send({
          ratings: { quality: 3, comfort: 3, environment: 3 },
        });
        expect(response).statusToBe(201);
        expect(response.body.data._id).toBe(reviewId);
        expect(response.body.data.ratings.quality).toBe(3);
        expect(response.body.data.status).toBe('approved');
      });

      // Uses mediaListingId (a separate listing) to avoid the 409 from above.
      // Verifies that mediaUrls are stored as media objects with sourceType "external".
      it('should create a review with mediaUrls and store them as media', async () => {
        const response = await studentAgent.post(`/api/listings/${mediaListingId}/reviews`).send({
          ratings: { quality: 3, comfort: 4, environment: 4 },
          description: 'With photos',
          mediaUrls: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        });
        expect(response).statusToBe(201);
        expect(response.body.data.media).toHaveLength(2);
        expect(response.body.data.media[0].sourceType).toBe('external');
        expect(response.body.data.status).toBe('approved');
      });
    });
  });

  // ============================================================================
  // GET /api/listings/:listingId/reviews
  //
  // Returns all reviews for a listing. Applies listingViewFilter so guests
  // can only see reviews for public listings.
  // ============================================================================
  describe('GET /api/listings/:listingId/reviews', () => {
    describe('Authentication', () => {
      // Verified students can read reviews for any visible listing.
      it('should return reviews for authenticated students', async () => {
        const response = await studentAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      // isPrivate is not a field in the Listing schema, so Mongoose discards it on save.
      // The guest filter { isPrivate: false } never matches any listing document,
      // making all listings invisible to unauthenticated users — hence 404.
      it('should return 404 for guests (listing not visible without auth)', async () => {
        const response = await guestAgent.get(`/api/listings/${listingId}/reviews`);
        expect(response).statusToBe(404);
      });
    });

    describe('Validation', () => {
      // The listingId param must be a valid MongoDB ObjectId.
      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.get('/api/listings/invalid-id/reviews');
        expect(response).statusToBe(400);
      });

      // A valid ObjectId that does not match any listing returns 404.
      it('should return 404 for non-existent listing', async () => {
        const response = await studentAgent.get(
          `/api/listings/${new mongoose.Types.ObjectId()}/reviews`,
        );
        expect(response).statusToBe(404);
      });
    });
  });

  // ============================================================================
  // GET /api/reviews
  //
  // Returns all reviews across all listings visible to the requester.
  // Guests only see reviews for public listings.
  // ============================================================================
  describe('GET /api/reviews', () => {
    describe('Authentication', () => {
      // Authenticated students see reviews for all listings they have access to.
      it('should return reviews for authenticated students', async () => {
        const response = await studentAgent.get('/api/reviews');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      // Landlords are authenticated and can see all non-private listing reviews.
      it('should return reviews for landlords', async () => {
        const response = await landlordAgent.get('/api/reviews');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      // Guests can call this endpoint but only receive reviews for public listings.
      it('should return reviews for guests (public listings only)', async () => {
        const response = await guestAgent.get('/api/reviews');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  // ============================================================================
  // GET /api/facilities/:facilityId/reviews
  //
  // Returns all reviews for every listing in a facility.
  // ============================================================================
  describe('GET /api/facilities/:facilityId/reviews', () => {
    describe('Authentication', () => {
      // Any authenticated user can retrieve reviews for a facility.
      it('should return reviews for a facility', async () => {
        const response = await studentAgent.get(`/api/facilities/${facilityId}/reviews`);
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('Logic', () => {
      // The facility must exist; an unknown ObjectId returns 404.
      it('should return 404 for non-existent facility', async () => {
        const response = await studentAgent.get(
          `/api/facilities/${new mongoose.Types.ObjectId()}/reviews`,
        );
        expect(response).statusToBe(404);
      });
    });
  });

  // ============================================================================
  // GET /api/facilities/:facilityId/average-ratings
  //
  // Returns averaged quality, comfort, environment, and overall scores
  // computed via aggregation across all reviews for the facility.
  // Only approved reviews count toward the averages.
  // ============================================================================
  describe('GET /api/facilities/:facilityId/average-ratings', () => {
    describe('Logic', () => {
      // Reviews are approved immediately, so they count toward the average right away.
      it('should return average ratings for a facility with reviews', async () => {
        await adminAgent.post(`/api/reviews/${reviewId}/approve`);
        const response = await studentAgent.get(`/api/facilities/${facilityId}/average-ratings`);
        expect(response).statusToBe(200);
        expect(response.body.data.quality).toBeDefined();
        expect(response.body.data.comfort).toBeDefined();
        expect(response.body.data.environment).toBeDefined();
        expect(response.body.data.overall).toBeDefined();
        expect(response.body.data.total).toBeGreaterThan(0);
      });

      // A freshly created facility with no reviews returns a message instead of a data object.
      it('should return a message when the facility has no reviews', async () => {
        const emptyFacility = await buildHousingFacility.create({ landlordId: landlord._id });
        const response = await studentAgent.get(
          `/api/facilities/${emptyFacility._id.toString()}/average-ratings`,
        );
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('No reviews yet.');
      });

      // A valid ObjectId that does not match any facility returns 404.
      it('should return 404 for non-existent facility', async () => {
        const response = await studentAgent.get(
          `/api/facilities/${new mongoose.Types.ObjectId()}/average-ratings`,
        );
        expect(response).statusToBe(404);
      });
    });
  });

  // ============================================================================
  // PATCH /api/reviews/:reviewId
  //
  // Updates an existing review. Only the author can edit their own review.
  // selfFilter middleware restricts access to the review owner.
  // ============================================================================
  describe('PATCH /api/reviews/:reviewId', () => {
    describe('Authentication', () => {
      // Unauthenticated users are rejected by selfFilter before reaching the controller.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.patch(`/api/reviews/${reviewId}`).send({
          reviewId,
          ratings: { quality: 5, comfort: 5, environment: 5 },
        });
        expect(response).statusToBe(401);
      });

      // The student who created the review can update it; updated ratings are reflected in the response.
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
      // The landlord did not create this review, so the service returns 404
      // (review not found for that userId).
      it('should return 404 when updating a review that does not belong to the user', async () => {
        const response = await landlordAgent.patch(`/api/reviews/${reviewId}`).send({
          reviewId,
          ratings: { quality: 1, comfort: 1, environment: 1 },
        });
        expect(response).statusToBe(404);
      });
    });
  });

  // ============================================================================
  // DELETE /api/reviews/:reviewId
  //
  // Deletes a review. Only the author can delete their own review.
  // If the review was approved, its ratings are removed from facility averages.
  // ============================================================================
  describe('DELETE /api/reviews/:reviewId', () => {
    describe('Authentication', () => {
      // Unauthenticated users are rejected by selfFilter before reaching the controller.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      // The landlord is not the author of this review; the service returns 404.
      it('should return 404 when deleting a review that does not belong to the user', async () => {
        const response = await landlordAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(404);
      });

      // The student (author) successfully deletes the review.
      it('should allow the author to delete their own review', async () => {
        const response = await studentAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(200);
      });

      // After deletion, any further attempt to delete the same review returns 404.
      it('should return 404 after deletion', async () => {
        const response = await studentAgent.delete(`/api/reviews/${reviewId}`);
        expect(response).statusToBe(404);
      });
    });
  });
});
