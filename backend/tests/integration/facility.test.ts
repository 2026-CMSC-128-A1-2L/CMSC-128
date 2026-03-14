import '../../src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../../src/app';
import { agent } from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { App } from 'supertest/types.js';
import { buildLandlord, buildManager, buildStudent, HousingFacilityParams, buildUnit } from '../factories';

const TEST_RUN_ID = Date.now().toString(36);

let app: App;
let landlordAgent: ReturnType<typeof agent>;
let managerAgent: ReturnType<typeof agent>;
let otherManagerAgent: ReturnType<typeof agent>;
let studentAgent: ReturnType<typeof agent>;
let guestAgent: ReturnType<typeof agent>;

let landlord: any;
let manager: any;
let otherManager: any;
let student: any;

async function createTestUsers() {
  const landlordData = await buildLandlord.create();
  const managerData = await buildManager.create();
  const otherManagerData = await buildManager.create();
  const studentData = await buildStudent.create();
  const unitData = await buildUnit.create();

  const landlordResponse = await landlordAgent
    .post('/api/auth/test/login')
    .send({ email: landlordData.email });
  const managerResponse = await managerAgent
    .post('/api/auth/test/login')
    .send({ email: managerData.email });
  const otherManagerResponse = await otherManagerAgent
    .post('/api/auth/test/login')
    .send({ email: otherManagerData.email });
  const studentResponse = await studentAgent
    .post('/api/auth/test/login')
    .send({ email: studentData.email });

  landlord = landlordResponse.body;
  manager = managerResponse.body;
  otherManager = otherManagerResponse.body;
  student = studentResponse.body;
}

beforeAll(async () => {
  try {
    if (!process.env.MONGO_TEST_URL) {
      throw new Error('Missing MONGO_TEST_URL in environment variables.');
    }

    const testDbUrl = `${process.env.MONGO_TEST_URL}-${TEST_RUN_ID}`;
    await mongoose.connect(testDbUrl);
    await mongoose.connection.db?.dropDatabase();

    app = getApp({});

    landlordAgent = agent(app);
    managerAgent = agent(app);
    otherManagerAgent = agent(app);
    studentAgent = agent(app);
    guestAgent = agent(app);

    await createTestUsers();
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
});

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  await mongoose.disconnect();
});

describe('Facilities API', () => {
  let facilityId: string;
  let validFacility: HousingFacilityParams;

  beforeAll(() => {
    validFacility = {
      name: `Test Facility 1`,
      landlordID: landlord._id,
      type: 'on-campus',
      capacity: 100,
      documentUrls: [],
      isAcceptingApplications: false,
      applicationCloseDate: new Date(2026, 3, 6, 18, 15, 10).toISOString(),
      applicationOpenDate: new Date(2026, 2, 6, 18, 15, 10).toISOString(),
      listings: [],
    };
  });

  describe('POST /api/facilities', () => {
    describe('Authentication', () => {
      it('should create a facility as landlord', async () => {
        const response = await landlordAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        facilityId = response.body.id;
      });

      it('should not create a facility as manager', async () => {
        const response = await managerAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(403);
      });

      it('should return 401 for unauthenticated user', async () => {
        const response = await guestAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(401);
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent.post('/api/facilities').send(validFacility);
        expect(response).statusToBe(403);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid data type', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...validFacility,
          applicationCloseDate: 'invalid-date',
        });
        expect(response).statusToBe(400);
      });

      it('should reject invalid facility type', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...validFacility,
          applicationCloseDate: 'invalid-date',
        });
        expect(response).statusToBe(400);
      });

      it('should reject missing required fields', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          name: 'Test',
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 422 when close date is before open date', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...validFacility,
          applicationCloseDate: validFacility.applicationOpenDate,
          applicationOpenDate: validFacility.applicationCloseDate,
        });
        expect(response).statusToBe(422);
      });
    });
  });

  describe('GET /api/facilities/:id', () => {
    describe('Authentication', () => {
      it('should allow guests to get facility by id', async () => {
        const response = await guestAgent.get(`/api/facilities/${facilityId}`);
        expect(response).statusToBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.name).toBe(validFacility.name);
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid facility id', async () => {
        const response = await guestAgent.get('/api/facilities/invalid-id');
        expect(response).statusToBe(400);
      });
    });
  });

  describe('PATCH /api/facilities/:id', () => {
    describe('Authentication', () => {
      it('should update facility as landlord', async () => {
        const response = await landlordAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Facility Name', managerID: manager._id });
        expect(response).statusToBe(200);
        expect(response.body.data.name).toBe('Updated Facility Name');
      });

      it('should return 403 for student', async () => {
        const response = await studentAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Name' });
        expect(response).statusToBe(403);
      });

      it('should return 403 for wrong manager', async () => {
        const response = await otherManagerAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Name' });
        expect(response).statusToBe(403);
      });

      it('should return 400 for manager if changing manager', async () => {
        const response = await managerAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ managerID: 'ffffffffffffffffffffffff' });
        expect(response).statusToBe(403);
      });

      it('should update facility as manager', async () => {
        const response = await managerAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated name' });
        expect(response).statusToBe(200);
        expect(response.body.data.name).toBe('Updated name');
      });

      it('should return 401 for unauthenticated user', async () => {
        const response = await guestAgent
          .patch(`/api/facilities/${facilityId}`)
          .send({ name: 'Updated Name' });
        expect(response).statusToBe(401);
      });
    });
    // describe('Validation', () => {});
    // describe('Logic', () => {});
  });
});

// describe('Authentication', () => {})
// describe('Validation', () => {})
// describe('Logic', () => {})
