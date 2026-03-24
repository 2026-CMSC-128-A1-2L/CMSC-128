import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { adminAgent, landlordAgent, managerAgent, studentAgent, guestAgent } from './setup.js';
import { buildHousingFacility } from '../factories';

describe('Visits API', () => {
  let housingId: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({});
    housingId = (facility as any)._id;
  });

  describe('GET /api/visits', () => {
    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.get('/api/visits');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.get('/api/visits');
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.get('/api/visits');
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.get('/api/visits');
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.get('/api/visits');
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 200 with valid query params', async () => {
        const filter = { status: 'pending' };
        const response = await adminAgent.get(
          `/api/visits?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(200);
      });

      it('should return 400 for invalid status enum', async () => {
        const filter = { status: 'invalid' };
        const response = await adminAgent.get(
          `/api/visits?q=${encodeURIComponent(JSON.stringify(filter))}`,
        );
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should return empty array when no visits exist', async () => {
        const response = await adminAgent.get('/api/visits');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });
  });

  describe('POST /api/visits', () => {
    describe('Authentication', () => {
      it('should return 201 for verified student', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
          message: 'I would like to visit',
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field housingID', async () => {
        const response = await studentAgent.post('/api/visits').send({
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field startDate', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field endDate', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-01T09:00:00.000Z',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid housingID format', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: 'invalid-id',
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid date format', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: 'not-a-date',
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid message type', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
          message: 123,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent housing', async () => {
        const fakeHousingId = '000000000000000000000000';
        const response = await studentAgent.post('/api/visits').send({
          housingID: fakeHousingId,
          startDate: '2026-04-01T09:00:00.000Z',
          endDate: '2026-04-01T12:00:00.000Z',
        });
        expect(response).statusToBe(404);
      });

      it('should return 422 for endDate before startDate', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-01T12:00:00.000Z',
          endDate: '2026-04-01T09:00:00.000Z',
        });
        expect(response).statusToBe(422);
      });
    });

    describe('Success', () => {
      it('should create visit without message', async () => {
        const response = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-02T09:00:00.000Z',
          endDate: '2026-04-02T12:00:00.000Z',
        });
        expect(response).statusToBe(201);
      });
    });
  });

  describe('PATCH /api/visits/:visitId', () => {
    let visitId: string;

    beforeAll(async () => {
      const response = await studentAgent.post('/api/visits').send({
        housingID: housingId,
        startDate: '2026-04-01T09:00:00.000Z',
        endDate: '2026-04-01T12:00:00.000Z',
      });
      visitId = response.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for student (self)', async () => {
        const response = await studentAgent.patch(`/api/visits/${visitId}`).send({
          status: 'cancelled',
        });
        expect(response).statusToBe(200);
      });

      it('should return 200 for manager', async () => {
        const createResponse = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-03T09:00:00.000Z',
          endDate: '2026-04-03T12:00:00.000Z',
        });
        const response = await managerAgent.patch(`/api/visits/${createResponse.body.id}`).send({
          status: 'approved',
        });
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.patch(`/api/visits/${visitId}`).send({
          status: 'approved',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/visits/${visitId}`).send({
          status: 'approved',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid status enum', async () => {
        const response = await studentAgent.patch(`/api/visits/${visitId}`).send({
          status: 'invalid',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid visitId format', async () => {
        const response = await studentAgent.patch('/api/visits/invalid-id').send({
          status: 'cancelled',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid date format', async () => {
        const response = await studentAgent.patch(`/api/visits/${visitId}`).send({
          startDate: 'not-a-date',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent visit', async () => {
        const fakeVisitId = '000000000000000000000000';
        const response = await studentAgent.patch(`/api/visits/${fakeVisitId}`).send({
          status: 'cancelled',
        });
        expect(response).statusToBe(404);
      });
    });

    describe('Success', () => {
      it('should update status successfully', async () => {
        const createResponse = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-04T09:00:00.000Z',
          endDate: '2026-04-04T12:00:00.000Z',
        });
        const response = await studentAgent.patch(`/api/visits/${createResponse.body.id}`).send({
          status: 'cancelled',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.status).toBe('cancelled');
      });

      it('should update dates successfully', async () => {
        const createResponse = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-05T09:00:00.000Z',
          endDate: '2026-04-05T12:00:00.000Z',
        });
        const response = await managerAgent.patch(`/api/visits/${createResponse.body.id}`).send({
          startDate: '2026-04-06T10:00:00.000Z',
          endDate: '2026-04-06T14:00:00.000Z',
        });
        expect(response).statusToBe(200);
      });
    });
  });

  describe('DELETE /api/visits/:visitId', () => {
    let visitId: string;

    beforeAll(async () => {
      const response = await studentAgent.post('/api/visits').send({
        housingID: housingId,
        startDate: '2026-04-07T09:00:00.000Z',
        endDate: '2026-04-07T12:00:00.000Z',
      });
      visitId = response.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for student (self)', async () => {
        const response = await studentAgent.delete(`/api/visits/${visitId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Visit cancelled successfully.');
      });

      it('should return 200 for manager', async () => {
        const createResponse = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-08T09:00:00.000Z',
          endDate: '2026-04-08T12:00:00.000Z',
        });
        const response = await managerAgent.delete(`/api/visits/${createResponse.body.id}`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord', async () => {
        const createResponse = await studentAgent.post('/api/visits').send({
          housingID: housingId,
          startDate: '2026-04-09T09:00:00.000Z',
          endDate: '2026-04-09T12:00:00.000Z',
        });
        const response = await landlordAgent.delete(`/api/visits/${createResponse.body.id}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/visits/${visitId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 400 for invalid visitId format', async () => {
        const response = await studentAgent.delete('/api/visits/invalid-id');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent visit', async () => {
        const fakeVisitId = '000000000000000000000000';
        const response = await studentAgent.delete(`/api/visits/${fakeVisitId}`);
        expect(response).statusToBe(404);
      });
    });
  });
});
