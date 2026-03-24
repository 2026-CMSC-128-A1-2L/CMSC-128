import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { adminAgent, landlordAgent, managerAgent, studentAgent, guestAgent } from './setup.js';
import { buildTag } from '../factories';

describe('Tags API', () => {
  let patchTagName: string;

  describe('GET /api/tags', () => {
    describe('Authentication', () => {
      it('should return 200 for guest (no auth required)', async () => {
        const response = await guestAgent.get('/api/tags');
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
      });

      it('should return 200 for admin', async () => {
        const response = await adminAgent.get('/api/tags');
        expect(response).statusToBe(200);
      });

      it('should return 200 for landlord', async () => {
        const response = await landlordAgent.get('/api/tags');
        expect(response).statusToBe(200);
      });

      it('should return 200 for student', async () => {
        const response = await studentAgent.get('/api/tags');
        expect(response).statusToBe(200);
      });
    });

    describe('Success', () => {
      it('should return empty array when no tags exist', async () => {
        const response = await guestAgent.get('/api/tags');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should return tags with correct structure', async () => {
        await buildTag.create({
          name: 'test-tag-get',
          displayName: 'Test Tag Get',
          dataType: { name: 'boolean' },
        });

        const response = await guestAgent.get('/api/tags');
        expect(response).statusToBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);

        /* eslint-disable @typescript-eslint/no-unsafe-call */
        const tag = response.body.data.find((t: any) => t.name === 'test-tag-get');
        expect(tag).toMatchObject({
          name: 'test-tag-get',
          displayName: 'Test Tag Get',
          dataType: { name: 'boolean' },
        });
      });
    });
  });

  describe('POST /api/tags', () => {
    const validTagData = {
      name: 'air_conditioning',
      displayName: 'Air Conditioning',
      isRequired: false,
      dataType: { name: 'boolean' },
    };

    describe('Authentication', () => {
      it('should return 201 for admin', async () => {
        const response = await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: `new-tag-${Date.now()}`,
        });
        expect(response).statusToBe(201);
        expect(response.body.data).toBeDefined();
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.post('/api/tags').send({
          ...validTagData,
          name: `landlord-tag-${Date.now()}`,
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.post('/api/tags').send({
          ...validTagData,
          name: `manager-tag-${Date.now()}`,
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.post('/api/tags').send({
          ...validTagData,
          name: `student-tag-${Date.now()}`,
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.post('/api/tags').send({
          ...validTagData,
          name: `guest-tag-${Date.now()}`,
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing required field name', async () => {
        const { name, ...dataWithoutName } = validTagData;
        const response = await adminAgent.post('/api/tags').send(dataWithoutName);
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field displayName', async () => {
        const { displayName, ...dataWithoutDisplayName } = validTagData;
        const response = await adminAgent.post('/api/tags').send({
          ...dataWithoutDisplayName,
          name: `no-displayname-${Date.now()}`,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field isRequired', async () => {
        const { isRequired, ...dataWithoutIsRequired } = validTagData;
        const response = await adminAgent.post('/api/tags').send({
          ...dataWithoutIsRequired,
          name: `no-required-${Date.now()}`,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing required field dataType', async () => {
        const { dataType, ...dataWithoutDataType } = validTagData;
        const response = await adminAgent.post('/api/tags').send({
          ...dataWithoutDataType,
          name: `no-datatype-${Date.now()}`,
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid dataType.name', async () => {
        const response = await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: `invalid-datatype-${Date.now()}`,
          dataType: { name: 'invalid' },
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for enum dataType without values', async () => {
        const response = await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: `enum-no-values-${Date.now()}`,
          dataType: { name: 'enum' },
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for enum dataType with empty values array', async () => {
        const response = await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: `enum-empty-values-${Date.now()}`,
          dataType: { name: 'enum', values: [] },
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for numeric dataType with min > max', async () => {
        const response = await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: `numeric-min-max-${Date.now()}`,
          dataType: { name: 'numeric', min: 100, max: 0 },
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 409 for duplicate tag name', async () => {
        const duplicateName = `duplicate-tag-${Date.now()}`;
        await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: duplicateName,
        });

        const response = await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: duplicateName,
        });
        expect(response).statusToBe(409);
      });
    });

    describe('Success', () => {
      it('should create boolean tag successfully', async () => {
        const response = await adminAgent.post('/api/tags').send({
          ...validTagData,
          name: `boolean-tag-${Date.now()}`,
          dataType: { name: 'boolean' },
        });
        expect(response).statusToBe(201);
        expect(response.body.data).toMatchObject({
          name: expect.stringContaining('boolean-tag-'),
          displayName: 'Air Conditioning',
          isRequired: false,
          dataType: { name: 'boolean' },
        });
      });

      it('should create enum tag successfully', async () => {
        const response = await adminAgent.post('/api/tags').send({
          name: `enum-tag-${Date.now()}`,
          displayName: 'WiFi Status',
          isRequired: true,
          dataType: { name: 'enum', values: ['No WiFi', 'Has WiFi', 'WiFi on Lobby'] },
        });
        expect(response).statusToBe(201);
        expect(response.body.data.dataType).toMatchObject({
          name: 'enum',
          values: ['No WiFi', 'Has WiFi', 'WiFi on Lobby'],
        });
      });

      it('should create numeric tag successfully', async () => {
        const response = await adminAgent.post('/api/tags').send({
          name: `numeric-tag-${Date.now()}`,
          displayName: 'Distance from campus',
          isRequired: false,
          dataType: { name: 'numeric', min: 0, max: 50 },
        });
        expect(response).statusToBe(201);
        expect(response.body.data.dataType).toMatchObject({
          name: 'numeric',
          min: 0,
          max: 50,
        });
      });
    });
  });

  describe('PATCH /api/tags/:tagName', () => {
    const validEnumTag = {
      name: `patchable-tag-${Date.now()}`,
      displayName: 'Patchable Tag',
      isRequired: false,
      dataType: { name: 'enum', values: ['Option1', 'Option2'] },
    };

    beforeAll(async () => {
      const response = await adminAgent.post('/api/tags').send(validEnumTag);
      patchTagName = response.body.data.name;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.patch(`/api/tags/${patchTagName}`).send({
          displayName: 'Updated Display Name',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.displayName).toBe('Updated Display Name');
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.patch(`/api/tags/${patchTagName}`).send({
          displayName: 'Should Not Update',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.patch(`/api/tags/${patchTagName}`).send({
          displayName: 'Should Not Update',
        });
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.patch(`/api/tags/${patchTagName}`).send({
          displayName: 'Should Not Update',
        });
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.patch(`/api/tags/${patchTagName}`).send({
          displayName: 'Should Not Update',
        });
        expect(response).statusToBe(401);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid dataType.name', async () => {
        const response = await adminAgent.patch(`/api/tags/${patchTagName}`).send({
          dataType: { name: 'invalid' },
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for enum dataType with empty values array', async () => {
        const response = await adminAgent.patch(`/api/tags/${patchTagName}`).send({
          dataType: { name: 'enum', values: [] },
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for numeric dataType with min > max', async () => {
        const response = await adminAgent.patch(`/api/tags/${patchTagName}`).send({
          dataType: { name: 'numeric', min: 100, max: 0 },
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Success', () => {
      it('should update displayName successfully', async () => {
        const response = await adminAgent.patch(`/api/tags/${patchTagName}`).send({
          displayName: 'New Display Name',
        });
        expect(response).statusToBe(200);
        expect(response.body.data.displayName).toBe('New Display Name');
      });

      it('should update isRequired successfully', async () => {
        const response = await adminAgent.patch(`/api/tags/${patchTagName}`).send({
          isRequired: true,
        });
        expect(response).statusToBe(200);
        expect(response.body.data.isRequired).toBe(true);
      });

      it('should update dataType successfully', async () => {
        const response = await adminAgent.patch(`/api/tags/${patchTagName}`).send({
          dataType: { name: 'numeric', min: 0, max: 100 },
        });
        expect(response).statusToBe(200);
        expect(response.body.data.dataType).toMatchObject({
          name: 'numeric',
          min: 0,
          max: 100,
        });
      });
    });
  });

  describe('DELETE /api/tags/:tagName', () => {
    let deletableTagName: string;

    beforeAll(async () => {
      const response = await adminAgent.post('/api/tags').send({
        name: `deletable-tag-${Date.now()}`,
        displayName: 'Deletable Tag',
        isRequired: false,
        dataType: { name: 'boolean' },
      });
      deletableTagName = response.body.data.name;
    });

    describe('Authentication', () => {
      it('should return 200 for admin', async () => {
        const response = await adminAgent.delete(`/api/tags/${deletableTagName}`);
        expect(response).statusToBe(200);
        expect(response.body.message).toBe('Tag deleted successfully');
      });

      it('should return 403 for landlord', async () => {
        const response = await landlordAgent.delete(`/api/tags/${deletableTagName}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for manager', async () => {
        const response = await managerAgent.delete(`/api/tags/${deletableTagName}`);
        expect(response).statusToBe(403);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.delete(`/api/tags/${deletableTagName}`);
        expect(response).statusToBe(403);
      });

      it('should return 401 for guest', async () => {
        const response = await guestAgent.delete(`/api/tags/${deletableTagName}`);
        expect(response).statusToBe(401);
      });
    });

    describe('Logic', () => {
      it('should return 404 for non-existent tag', async () => {
        const response = await adminAgent.delete('/api/tags/non-existent-tag-xyz');
        expect(response).statusToBe(404);
      });

      it('should return 422 when deleting tag used by listings', async () => { });
    });
  });
});
