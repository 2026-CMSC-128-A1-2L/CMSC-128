import '../../src/config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { buildListing, buildStudent } from '../factories';
import {
  studentAgent,
  guestAgent,
  landlordAgent,
  managerAgent,
  landlord,
  manager,
} from './setup.js';

describe('Applications API', () => {
  // Test IDs
  let studentID: string;
  let listingID: string;
  let applicationID: string;

  beforeAll(async () => {
    // Create Test Listings and students
    const testStudent = await buildStudent.create({});
    const testListing = buildListing.create({
      landlordID: landlord._id,
      managerID: manager._id,
    });

    studentID = (testStudent as any)._id;
    listingID = (testListing as any)._id;
  });

  const applicationData = () => ({
    studentID,
    listingID,
    preferredRoomType: 'single',
    documentUrls: [],
  });

  describe('POST /api/applications', () => {
    it('should create application and return 201 for Student', async () => {
      const response = await studentAgent.post('/api/applications').send(applicationData());
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      applicationID = response.body.id;
    });

    it('should return 401 for Guest (Not Logged In)', async () => {
      const response = await guestAgent.post('/api/applications').send(applicationData());
      expect(response.status).toBe(401);
    });

    it('should return 403 for Landlord (Not Authorized)', async () => {
      const response = await landlordAgent.post('/api/applications').send(applicationData());
      expect(response.status).toBe(403);
    });

    it('should return 403 for Manager (Not Authorized)', async () => {
      const response = await managerAgent.post('/api/applications').send(applicationData());
      expect(response.status).toBe(403);
    });
  });
});
