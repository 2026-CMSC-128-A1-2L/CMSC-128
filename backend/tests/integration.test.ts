import '../src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../src/app';
import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { App } from 'supertest/types.js';

// Connect to MongoDB
let app: App;

try {
  console.log('MongoDB connected');

  if (!process.env.MONGO_TEST_URL) {
    throw new Error('Missing MONGO_TEST_URL in environment variables.');
  }

  await mongoose.connect(process.env.MONGO_TEST_URL);
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

  describe('POST /api/facilities', async () => {
    const facility = {
      name: 'Test Facility',
      type: 'on-campus',
      location: 'good facility',
      applicationCloseDate: new Date(2026, 3, 6, 18, 15, 10).toISOString(),
      applicationOpenDate: new Date(2026, 2, 6, 18, 15, 10).toISOString(),
    };
    describe('When the user is a Landlord', () => {
      it('should respond with a 422 status code when the application close date is before the application start date', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...facility,
          applicationCloseDate: facility.applicationOpenDate,
          applicationOpenDate: facility.applicationCloseDate,
        });
        expect(response.statusCode).toBe(422);
      });
      it('should respond with a 201 status code and retrieve with GET', async () => {
        const response = await landlordAgent.post('/api/facilities').send(facility);
        expect(response.statusCode).toBe(201);

        const id = response.body.d;
        expect(id).toBeDefined();

        const getResponse = await landlordAgent.get(`/api/facilities/${id}`);
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body).toMatchObject({ name: facility.name });
      });
    });
    describe('When the user is a Guest', async () => {
      it('should respond with a 401', async () => {
        const response = await guestAgent.post('/api/facilities').send(facility);
        expect(response.statusCode).toBe(401);
      });
    });
    describe('When the user is a Student', async () => {
      it('should respond with a 403', async () => {
        const response = await studentAgent.post('/api/facilities').send(facility);
        expect(response.statusCode).toBe(403);
      });
    });
  });
});
