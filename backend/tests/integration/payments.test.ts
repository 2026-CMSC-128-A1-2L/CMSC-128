import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { adminAgent, landlordAgent, managerAgent, studentAgent, guestAgent } from './setup.js';
import { buildHousingFacility, buildListing, buildUnit } from '../factories';

describe('Payments API', () => {
  let unitId: string;
  let studentId: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({});
    const listing = await buildListing.create({
      housingID: (facility as any)._id,
      landlordID: (facility as any).landlordID,
    });
    const unit = await buildUnit.create({
      listingID: (listing as any)._id,
      landlordID: (facility as any).landlordID,
    });
    unitId = (unit as any)._id;
  });

  describe('POST /api/payments', () => {
    describe('Authentication', () => {
      it('should return 201 for verified student', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          paymentType: 'rent',
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          paymentType: 'rent',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          paymentType: 'rent',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          paymentType: 'rent',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field unitID', async () => {
        const response = await studentAgent.post('/api/payments').send({
          amount: 5000,
          paymentType: 'rent',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid unitID format', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: 'invalid-id',
          amount: 5000,
          paymentType: 'rent',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for negative amount', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: -100,
          paymentType: 'rent',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for zero amount', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 0,
          paymentType: 'rent',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid paymentType enum', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          paymentType: 'invalid',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid paymentStatus enum', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          paymentStatus: 'invalid',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid date format', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          dueDate: 'not-a-date',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent unit', async () => {
        const fakeUnitId = '000000000000000000000000';
        const response = await studentAgent.post('/api/payments').send({
          unitID: fakeUnitId,
          amount: 5000,
          paymentType: 'rent',
        });
        expect(response).statusToBe(404);
      });
    });

    describe('Success', () => {
      it('should create payment with minimum required fields', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
        });
        expect(response).statusToBe(201);
      });

      it('should create payment with all fields', async () => {
        const response = await studentAgent.post('/api/payments').send({
          unitID: unitId,
          amount: 5000,
          billingPeriodStart: '2026-04-01T00:00:00.000Z',
          billingPeriodEnd: '2026-04-30T00:00:00.000Z',
          dueDate: '2026-05-01T00:00:00.000Z',
          paymentType: 'rent',
        });
        expect(response).statusToBe(201);
      });
    });
  });

  describe('GET /api/payments', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get('/api/payments');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for student (self)', async () => {
        const response = await studentAgent.get('/api/payments');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get('/api/payments');
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get('/api/payments');
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get('/api/payments');
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 200 with valid query params', async () => {
        const filter = { paymentStatus: 'unpaid', paymentType: 'rent' };
        const response = await adminAgent.get(
          `/api/payments?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(200);
      });

      it('should return 400 for invalid paymentStatus enum', async () => {
        const filter = { paymentStatus: 'invalid' };
        const response = await adminAgent.get(
          `/api/payments?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid paymentType enum', async () => {
        const filter = { paymentType: 'invalid' };
        const response = await adminAgent.get(
          `/api/payments?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should return payments array', async () => {
        const response = await adminAgent.get('/api/payments');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });
});
