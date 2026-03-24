import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { adminAgent, studentAgent, guestAgent, landlordAgent } from './setup.js';
import { buildUnit } from '../factories';

describe('Transfers API', () => {
  let unitId: string;

  beforeAll(async () => {
    const unit = await buildUnit.create({});
    unitId = (unit as any)._id;
  });

  describe('POST /api/transfers', () => {
    describe('Authentication', () => {
      it('should return 201 for verified student', async () => {
        const response = await studentAgent.post('/api/transfers').send({
          unitID: unitId,
          description: 'Need a room closer to campus',
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const transferResponse = await landlordAgent.post('/api/transfers').send({
          unitID: unitId,
        });
        expect(transferResponse).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post('/api/transfers').send({
          unitID: unitId,
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field unitID', async () => {
        const response = await studentAgent.post('/api/transfers').send({
          description: 'Test transfer',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid unitID format', async () => {
        const response = await studentAgent.post('/api/transfers').send({
          unitID: 'invalid-id',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid description type', async () => {
        const response = await studentAgent.post('/api/transfers').send({
          unitID: unitId,
          description: 123,
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent unit', async () => {
        const fakeUnitId = '000000000000000000000000';
        const response = await studentAgent.post('/api/transfers').send({
          unitID: fakeUnitId,
        });
        expect(response).statusToBe(404);
      });

      it('should return 409 for duplicate transfer request', async () => {
        const response = await studentAgent.post('/api/transfers').send({
          unitID: unitId,
        });
        expect(response).statusToBe(409);
      });
    });

    describe('Success', () => {
      it('should create transfer without description', async () => {
        const newUnit = await buildUnit.create({});
        const response = await studentAgent.post('/api/transfers').send({
          unitID: (newUnit as any)._id,
        });
        expect(response).statusToBe(201);
      });
    });
  });

  describe('DELETE /api/transfers/:transferId', () => {
    let transferId: string;

    beforeAll(async () => {
      const newUnit = await buildUnit.create({});
      const response = await studentAgent.post('/api/transfers').send({
        unitID: (newUnit as any)._id,
        description: 'Test transfer for deletion',
      });
      transferId = response.body.id;
    });

    describe('Authentication', () => {
      it('should return 200 for student (self)', async () => {
        const response = await studentAgent.delete(`/api/transfers/${transferId}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Transfer request cancelled successfully.');
      });

      it('should return 200 for admin', async () => {
        const newUnit = await buildUnit.create({});
        const createResponse = await studentAgent.post('/api/transfers').send({
          unitID: (newUnit as any)._id,
        });
        const response = await adminAgent.delete(`/api/transfers/${createResponse.body.id}`);
        expect(response).statusToBe(200);
      });

      it('should return 403 for landlord', async () => {
        const response = await guestAgent.delete(`/api/transfers/${transferId}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/transfers/${transferId}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 400 for invalid transferId format', async () => {
        const response = await studentAgent.delete('/api/transfers/invalid-id');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent transfer', async () => {
        const fakeTransferId = '000000000000000000000000';
        const response = await adminAgent.delete(`/api/transfers/${fakeTransferId}`);
        expect(response).statusToBe(404);
      });
    });
  });
});
