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
  const agent = request.agent(app);

  beforeAll(async () => {
    // creating test user
    await agent.post('/api/auth/test/register').send({
      firstName: 'Misuzu',
      lastName: 'Hataya',
      email: 'test@example.com',
      userType: 'Manager',
      auth: {},
      contact: '09123456789',
    });
  });

  describe('POST /api/auth/test/login', () => {
    it('should respond with a 200 status code', async () => {
      const response = await agent.post('/api/auth/test/login').send({
        email: 'test@example.com',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /api/facilities', () => {
    it('should respond with a 200 status code and JSON content', async () => {
      // logging in test user
      const response = await agent.post('/api/facilities').send({
        name: 'Test Facility',
        type: 'on-campus',
        location: 'good facility',
        applicationCloseDate: new Date(Date.now() + 1000000000).toISOString(),
        applicationOpenDate: new Date(Date.now()).toISOString(),
      });
      expect(response.statusCode).toBe(201);
    });
  });
});
