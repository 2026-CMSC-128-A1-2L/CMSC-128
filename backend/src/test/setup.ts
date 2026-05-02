import '../../src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../../src/app.js';
import { agent } from 'supertest';
import { beforeAll, afterAll } from 'vitest';
import type { App } from 'supertest/types.js';
import { buildAdmin, buildLandlord, buildManager, buildStudent } from './factories.js';
import type { UserType } from '../features/user/user.model.js';

// Random run Id so that if tests run in parallel, they use different databases.
const TEST_RUN_ID = Date.now().toString(36);

let app: App;

export let adminAgent: ReturnType<typeof agent>;
export let landlordAgent: ReturnType<typeof agent>;
export let managerAgent: ReturnType<typeof agent>;
export let otherManagerAgent: ReturnType<typeof agent>;
export let studentAgent: ReturnType<typeof agent>;
export let guestAgent: ReturnType<typeof agent>;

export let admin: UserType;
export let landlord: UserType;
export let manager: UserType;
export let otherManager: UserType;
export let student: UserType;

async function createTestUsers() {
  const adminData = await buildAdmin.create();
  const landlordData = await buildLandlord.create();
  const managerData = await buildManager.create();
  const otherManagerData = await buildManager.create();
  const studentData = await buildStudent.create();

  const adminResponse = await adminAgent
    .post('/api/auth/test/login')
    .send({ email: adminData.emails[0] });
  const landlordResponse = await landlordAgent
    .post('/api/auth/test/login')
    .send({ email: landlordData.emails[0] });
  const managerResponse = await managerAgent
    .post('/api/auth/test/login')
    .send({ email: managerData.emails[0] });
  const otherManagerResponse = await otherManagerAgent
    .post('/api/auth/test/login')
    .send({ email: otherManagerData.emails[0] });
  const studentResponse = await studentAgent
    .post('/api/auth/test/login')
    .send({ email: studentData.emails[0] });

  admin = adminResponse.body as UserType;
  landlord = landlordResponse.body as UserType;
  manager = managerResponse.body as UserType;
  otherManager = otherManagerResponse.body as UserType;
  student = studentResponse.body as UserType;
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

    adminAgent = agent(app);
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
