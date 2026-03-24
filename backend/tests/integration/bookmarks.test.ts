import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { landlordAgent, managerAgent, studentAgent, guestAgent } from './setup.js';
import { buildListing, buildStudent } from '../factories';

describe('Bookmarks API', () => {
  let listingId: string;
  let studentUserId: string;

  beforeAll(async () => {
    const listing = await buildListing.create({
      isPrivate: false,
    });
    listingId = (listing as any)._id;
  });

  describe('GET /api/bookmarks', () => {
    describe('Authentication', () => {
      it('should return 200 for verified student', async () => {
        const response = await studentAgent.get('/api/bookmarks');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get('/api/bookmarks');
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get('/api/bookmarks');
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get('/api/bookmarks');
        expect(response).statusToBe(401);
      });
    });

    describe('Success', () => {
      it('should return empty array when no bookmarks exist', async () => {
        const response = await studentAgent.get('/api/bookmarks');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('POST /api/bookmarks/:unitId', () => {
    describe('Authentication', () => {
      it('should return 201 for verified student', async () => {
        const response = await studentAgent.post(`/api/bookmarks/${listingId}`).send({
          notes: 'Interested in this listing',
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.post(`/api/bookmarks/${listingId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.post(`/api/bookmarks/${listingId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post(`/api/bookmarks/${listingId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid listingID format', async () => {
        const response = await studentAgent.post('/api/bookmarks/invalid-id').send({});
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid notes type', async () => {
        const response = await studentAgent.post(`/api/bookmarks/${listingId}`).send({
          notes: 123,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent listing', async () => {
        const fakeListingId = '000000000000000000000000';
        const response = await studentAgent.post(`/api/bookmarks/${fakeListingId}`);
        expect(response).statusToBe(404);
      });

      it('should return 409 for duplicate bookmark', async () => {
        const response = await studentAgent.post(`/api/bookmarks/${listingId}`);
        expect(response).statusToBe(409);
      });
    });

    describe('Success', () => {
      it('should create bookmark without notes', async () => {
        const newListing = await buildListing.create({ isPrivate: false });
        const response = await studentAgent.post(`/api/bookmarks/${(newListing as any)._id}`);
        expect(response).statusToBe(201);
      });
    });
  });

  describe('DELETE /api/bookmarks/:unitId', () => {
    let bookmarkedListingId: string;

    beforeAll(async () => {
      const newListing = await buildListing.create({ isPrivate: false });
      bookmarkedListingId = (newListing as any)._id;
      await studentAgent.post(`/api/bookmarks/${bookmarkedListingId}`);
    });

    describe('Authentication', () => {
      it('should return 200 for verified student', async () => {
        const response = await studentAgent.delete(`/api/bookmarks/${bookmarkedListingId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Bookmark deleted successfully.');
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.delete(`/api/bookmarks/${listingId}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.delete(`/api/bookmarks/${listingId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/bookmarks/${listingId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 400 for invalid listingID format', async () => {
        const response = await studentAgent.delete('/api/bookmarks/invalid-id');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent bookmark', async () => {
        const fakeListingId = '000000000000000000000000';
        const response = await studentAgent.delete(`/api/bookmarks/${fakeListingId}`);
        expect(response).statusToBe(404);
      });
    });
  });
});
