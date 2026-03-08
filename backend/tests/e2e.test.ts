/*
 * End-to-end test of all features.
 */

import '../src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../src/app';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { App } from 'supertest/types.js';

const TEST_RUN_ID = Date.now().toString(36);

// Connect to MongoDB
let app: App;

try {
  if (!process.env.MONGO_TEST_URL) {
    throw new Error('Missing MONGO_TEST_URL in environment variables.');
  }

  const testDbUrl = `${process.env.MONGO_TEST_URL}-${TEST_RUN_ID}`;
  await mongoose.connect(testDbUrl);
  console.log('MongoDB connected');

  await mongoose.connection.db?.dropDatabase();

  app = getApp({});
} catch (err) {
  console.error('Could not connect to MongoDB', err);
  process.exit(1); // Stop the app if DB fails
}

describe('', () => {
  const landlordAgent = request.agent(app);
  const managerAgent = request.agent(app);
  const studentAgent = request.agent(app);
  const unverifiedStudentAgent = request.agent(app);
  const guestAgent = request.agent(app);

  beforeAll(async () => {
    // creating test users
    await landlordAgent.post('/api/auth/test/register').send({
      firstName: 'Sena',
      lastName: 'Juo',
      email: 'test@example.com',
      userType: 'Landlord',
      auth: {},
      contact: '09987654321',
    });
    await managerAgent.post('/api/auth/test/register').send({
      firstName: 'Misuzu',
      lastName: 'Hataya',
      email: 'test2@example.com',
      userType: 'Manager',
      auth: {},
      contact: '09123456789',
    });
    await studentAgent.post('/api/auth/test/register').send({
      firstName: 'Ume',
      lastName: 'Hanami',
      email: 'test3@example.com',
      userType: 'Student',
      auth: {},
      studentNumber: '2023-09283',
    });
    await unverifiedStudentAgent.post('/api/auth/test/register').send({
      firstName: 'Ume',
      lastName: 'Saki',
      email: 'test4@example.com',
      userType: 'UnverifiedStudent',
      auth: {},
    });

    await landlordAgent.post('/api/auth/test/login').send({ email: 'test@example.com' });
    await managerAgent.post('/api/auth/test/login').send({ email: 'test2@example.com' });
    await studentAgent.post('/api/auth/test/login').send({ email: 'test3@example.com' });
    await unverifiedStudentAgent.post('/api/auth/test/login').send({ email: 'test4@example.com' });
  });

  const facility = {
    name: 'Test Facility',
    type: 'on-campus',
    location: { text: 'good facility' },
    applicationCloseDate: new Date(2026, 3, 6, 18, 15, 10).toISOString(),
    applicationOpenDate: new Date(2026, 2, 6, 18, 15, 10).toISOString(),
  };

  let id: number;

  it('landlords should be able to create facility', async () => {
    const response = await landlordAgent.post('/api/facilities').send(facility);
    expect(response).statusToBe(201);
    expect(response.body.id).toBeDefined();
    id = response.body.id;
  });

  it('landlords should be able to retrieve facility', async () => {
    const getResponse = await landlordAgent.get(`/api/facilities/${id}`);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.data).toMatchObject({ name: facility.name });
  });

  afterAll(async () => {
    // cleanup
    await mongoose.connection.db?.dropDatabase();
    await mongoose.disconnect();
  });
});
