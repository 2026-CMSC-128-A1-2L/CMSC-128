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

  let testFacilityID: string; // Temporary just to test listings

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
      it('should respond with a 400 status code when an invalid data type is passed', async () => {
        const response = await landlordAgent.post('/api/facilities').send({
          ...facility,
          applicationCloseDate: 'hello',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.length).toBe(1);
      });
      it('should respond with a 201 status code and retrieve with GET', async () => {
        const response = await landlordAgent.post('/api/facilities').send(facility);
        expect(response.statusCode).toBe(201);

        const id = response.body.id;
        expect(id).toBeDefined();

        testFacilityID = id; // Id is stored here (delete this when getfacilities is made)

        const getResponse = await landlordAgent.get(`/api/facilities/${id}`);
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.data).toMatchObject({ name: facility.name });
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

  // Testing listings
  describe('Listings API', () => {
    let listingID: string;
    let existingFacilityID: string;
    //Gets the ONE facility created earlier
    beforeAll(async () => {
      existingFacilityID = testFacilityID;
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

      it('should return 403 for Student (Not Authorized to Create)', async () => {
        const response = await studentAgent.post('/api/listings').send({
          ...listingData,
          housingID: existingFacilityID,
        });
        expect(response.statusCode).toBe(403);
      });
    });
  });
});
