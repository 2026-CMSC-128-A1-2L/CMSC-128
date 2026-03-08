import '../../src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../../src/app';
import { agent } from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { App } from 'supertest/types.js';
import {
  buildHousingFacility,
  buildLandlord,
  buildManager,
  buildStudent,
  HousingFacilityParams,
} from '../factories';

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

describe('Listings API', () => {
  let listingID: string;
  let existingFacilityID: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({ landlordID: landlord._id });

    existingFacilityID = (facility as any)._id;
  });

  // No tags incuded
  const listingData = {
    roomType: 'Dorm',
    capacity: 2,
    isPrivate: true,
    allowVisit: true,
    allowTransfer: false,
    description: 'Test listing',
    units: ['A1', 'A2'],
  };

  // Testing creating a listing as landlord
  describe('POST /api/listings', () => {
    it('should create listing and return 201 for Landlord', async () => {
      const response = await landlordAgent.post('/api/listings').send({
        ...listingData,
        housingID: existingFacilityID,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeDefined();
      listingID = response.body.id;
    });

    // Testing error for unauthorized creation
    it('should return 401 for Guest (Not Logged In)', async () => {
      const response = await guestAgent.post('/api/listings').send({
        ...listingData,
        housingID: existingFacilityID,
      });
      expect(response.statusCode).toBe(401);
    });

    it('should return an error for Student (Not Authorized to Create)', async () => {
      const response = await studentAgent.post('/api/listings').send({
        ...listingData,
        housingID: existingFacilityID,
      });
      expect(response.statusCode).toBe(403);
    });
  });
});
