import '../../src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../../src/app';
import { agent } from 'supertest';
import { beforeAll, afterAll } from 'vitest';
import { App } from 'supertest/types.js';
import { buildLandlord, buildManager, buildStudent } from '../factories';

// Random run ID so that if tests run in parallel, they use different databases.
const TEST_RUN_ID = Date.now().toString(36);

let app: App;

export let landlordAgent: ReturnType<typeof agent>;
export let managerAgent: ReturnType<typeof agent>;
export let otherManagerAgent: ReturnType<typeof agent>;
export let studentAgent: ReturnType<typeof agent>;
export let guestAgent: ReturnType<typeof agent>;

export let landlord: any;
export let manager: any;
export let otherManager: any;
export let student: any;

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
