import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { adminAgent, landlordAgent, managerAgent, studentAgent, guestAgent } from './setup.js';
import { buildListing } from '../factories';

describe('Reviews API', () => {
  let listingId: string;
  let otherStudentListingId: string;

  beforeAll(async () => {
    const listing = await buildListing.create({ isPrivate: false });
    listingId = (listing as any)._id;

    const otherListing = await buildListing.create({ isPrivate: false });
    otherStudentListingId = (otherListing as any)._id;
  });

  describe('POST /api/reviews/:listingId', () => {
    describe('Authentication', () => {
      it('should return 201 for verified student', async () => {
        const response = await studentAgent.post(`/api/reviews/${listingId}`).send({
          rating: 5,
          description: 'Great place!',
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.post(`/api/reviews/${listingId}`).send({
          rating: 5,
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.post(`/api/reviews/${listingId}`).send({
          rating: 5,
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post(`/api/reviews/${listingId}`).send({
          rating: 5,
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field rating', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/reviews/${(newListing as any)._id}`).send({
          description: 'No rating',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for rating below minimum (0)', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/reviews/${(newListing as any)._id}`).send({
          rating: 0,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for rating above maximum (5)', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/reviews/${(newListing as any)._id}`).send({
          rating: 6,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for non-integer rating', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/reviews/${(newListing as any)._id}`).send({
          rating: 4.5,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid listingID format', async () => {
        const response = await studentAgent.post('/api/reviews/invalid-id').send({
          rating: 5,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid description type', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/reviews/${(newListing as any)._id}`).send({
          rating: 5,
          description: 123,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeListingId = '000000000000000000000000';
        const response = await studentAgent.post(`/api/reviews/${fakeListingId}`).send({
          rating: 5,
        });
        expect(response).statusToBe(404);
      });

      it('should return 422 for duplicate review by same student', async () => {
        const response = await studentAgent.post(`/api/reviews/${listingId}`).send({
          rating: 4,
        });
        expect(response).statusToBe(422);
      });
    });

    describe('Success', () => {
      it('should create review without description', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/reviews/${(newListing as any)._id}`).send({
          rating: 4,
        });
        expect(response).statusToBe(201);
      });

      it('should create review with description', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/reviews/${(newListing as any)._id}`).send({
          rating: 5,
          description: 'Excellent accommodation!',
        });
        expect(response).statusToBe(201);
      });
    });
  });

  describe('PATCH /api/reviews/:reviewId', () => {
    let reviewId: string;

    beforeAll(async () => {
      const newListing = await buildListing.create({ isPrivate: false });
      const createResponse = await studentAgent
        .post(`/api/reviews/${(newListing as any)._id}`)
        .send({
          rating: 4,
          description: 'Initial review',
        });
      reviewId = createResponse.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for review owner', async () => {
        const response = await studentAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 5,
          description: 'Updated review',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.rating).toBe(5);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 1,
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 1,
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for other student', async () => {
        const { agent } = await import('supertest');
        const { getApp } = await import('../../src/app');
        const { buildStudent } = await import('../factories');
        const otherStudentAgent = agent(getApp({}));
        const otherStudentData = await buildStudent.create({
          email: `other-${Date.now()}@student.com`,
        });
        await otherStudentAgent.post('/api/auth/test/login').send({
          email: otherStudentData.email,
        });
        const response = await otherStudentAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 1,
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 1,
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for rating below minimum', async () => {
        const response = await studentAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 0,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for rating above maximum', async () => {
        const response = await studentAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 6,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid reviewId format', async () => {
        const response = await studentAgent.patch('/api/reviews/invalid-id').send({
          rating: 5,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent review', async () => {
        const fakeReviewId = '000000000000000000000000';
        const response = await studentAgent.patch(`/api/reviews/${fakeReviewId}`).send({
          rating: 5,
        });
        expect(response).statusToBe(404);
      });
    });

    describe('Success', () => {
      it('should update rating only', async () => {
        const response = await studentAgent.patch(`/api/reviews/${reviewId}`).send({
          rating: 3,
        });
        expect(response).statusToBe(200);
        expect(response.body.data.rating).toBe(3);
      });

      it('should update description only', async () => {
        const response = await studentAgent.patch(`/api/reviews/${reviewId}`).send({
          description: 'Updated description only',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.description).toBe('Updated description only');
      });
    });
  });

  describe('DELETE /api/reviews/:reviewId', () => {
    let deletableReviewId: string;

    beforeAll(async () => {
      const newListing = await buildListing.create({ isPrivate: false });
      const createResponse = await studentAgent
        .post(`/api/reviews/${(newListing as any)._id}`)
        .send({
          rating: 4,
        });
      deletableReviewId = createResponse.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for review owner', async () => {
        const response = await studentAgent.delete(`/api/reviews/${deletableReviewId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Review deleted successfully.');
      });

      it('should return 200 for admin', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const createResponse = await studentAgent
          .post(`/api/reviews/${(newListing as any)._id}`)
          .send({
            rating: 4,
          });
        const response = await adminAgent.delete(`/api/reviews/${createResponse.body.id}`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.delete(`/api/reviews/${deletableReviewId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.delete(`/api/reviews/${deletableReviewId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/reviews/${deletableReviewId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 400 for invalid reviewId format', async () => {
        const response = await studentAgent.delete('/api/reviews/invalid-id');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent review', async () => {
        const fakeReviewId = '000000000000000000000000';
        const response = await adminAgent.delete(`/api/reviews/${fakeReviewId}`);
        expect(response).statusToBe(404);
      });
    });
  });
});
