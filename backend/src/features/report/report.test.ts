/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '../../config.js';
import { describe, it, expect, beforeAll } from 'vitest';
import { buildHousingFacility } from '../../test/factories.js';
import {
  adminAgent,
  landlordAgent,
  managerAgent,
  studentAgent,
  guestAgent,
  landlord,
  manager,
  student,
} from '../../test/setup.js';
import { Listing } from '../listing/listing.model.js';
import { Unit } from '../unit/unit.model.js';
import { Rental } from '../rental/rental.model.js';
import mongoose from 'mongoose';

describe('Reports API', () => {
  let listingId: string;
  let reportId: string;
  let userReportId: string;

  beforeAll(async () => {
    const facility = await buildHousingFacility.create({
      landlordId: landlord._id,
    });

    const listing = await new Listing({
      facilityId: facility._id,
      landlordId: landlord._id,
      managers: [],
      roomType: 'single',
      capacity: 1,
      isPrivate: false,
      allowVisit: true,
      allowTransfer: false,
      description: 'Test listing for reports',
    }).save();

    listingId = listing._id.toString();

    const unit = await new Unit({
      listingId: listing._id,
      roomNumber: 'REPORT-TEST-101',
      capacity: 1,
      price: 5000,
    }).save();

    // Give the student an active rental in this facility so they can report
    await new Rental({
      userId: student._id,
      facilityId: facility._id,
      unitId: unit._id,
      status: 'active',
    }).save();
  });

  // ==========================================================================
  // POST /api/listings/:listingId/report
  // ==========================================================================
  describe('POST /api/listings/:listingId/report', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'This listing has wrong information.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(401);
      });

      it('should return 403 for landlords', async () => {
        const response = await landlordAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'This listing has wrong information.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(403);
      });

      it('should allow an active tenant student to report a listing', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'This listing has wrong information.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        reportId = response.body.id;
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing description', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for missing flags', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Missing flags.',
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for empty flags array', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Empty flags.',
          flags: [],
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for description exceeding 200 characters', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'a'.repeat(201),
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 when evidence exceeds 2 items', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Too many evidence items.',
          flags: ['Misinformation'],
          evidence: [
            'https://example.com/a.jpg',
            'https://example.com/b.jpg',
            'https://example.com/c.jpg',
          ],
        });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.post('/api/listings/invalid-id/report').send({
          description: 'Invalid listing.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 404 for a non-existent listing', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await studentAgent.post(`/api/listings/${fakeId}/report`).send({
          description: 'Listing does not exist.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(404);
      });

      it('should return 403 when student is not an active tenant of the facility', async () => {
        const otherFacility = await buildHousingFacility.create({ landlordId: landlord._id });
        const otherListing = await new Listing({
          facilityId: otherFacility._id,
          landlordId: landlord._id,
          managers: [],
          roomType: 'single',
          capacity: 1,
          isPrivate: false,
          allowVisit: true,
          allowTransfer: false,
          description: 'Other listing',
        }).save();

        const response = await studentAgent
          .post(`/api/listings/${otherListing._id.toString()}/report`)
          .send({
            description: 'Not my facility.',
            flags: ['Misinformation'],
          });
        expect(response).statusToBe(403);
      });

      it('should return 409 when student already has a pending report for the same listing', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Duplicate pending report.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(409);
      });
    });
  });

  // ==========================================================================
  // POST /api/users/:userId/report
  // ==========================================================================
  describe('POST /api/users/:userId/report', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({
            description: 'Manager is not doing their job.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(401);
      });

      it('should allow a verified student to report a manager', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({
            description: 'Manager is not doing their job.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(201);
        expect(response.body.id).toBeDefined();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        userReportId = response.body.id;
      });

      it('should allow a verified student to report a landlord', async () => {
        const response = await studentAgent
          .post(`/api/users/${landlord._id.toString()}/report`)
          .send({
            description: 'Landlord is unresponsive.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(201);
      });

      it('should allow a landlord to report a student', async () => {
        const response = await landlordAgent
          .post(`/api/users/${student._id.toString()}/report`)
          .send({
            description: 'Tenant is causing trouble.',
            flags: ['Disruptive Behavior'],
          });
        expect(response).statusToBe(201);
      });

      it('should allow a manager to report a student', async () => {
        const response = await managerAgent
          .post(`/api/users/${student._id.toString()}/report`)
          .send({
            description: 'Tenant is causing trouble.',
            flags: ['Disruptive Behavior'],
          });
        expect(response).statusToBe(201);
      });
    });

    describe('Validation', () => {
      it('should return 400 for missing description', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({ flags: ['Negligence in Duties'] });
        expect(response).statusToBe(400);
      });

      it('should return 400 for empty flags array', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({ description: 'No flags.', flags: [] });
        expect(response).statusToBe(400);
      });

      it('should return 400 for description exceeding 200 characters', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({ description: 'a'.repeat(201), flags: ['Negligence in Duties'] });
        expect(response).statusToBe(400);
      });

      it('should return 400 for invalid user id', async () => {
        const response = await studentAgent.post('/api/users/invalid-id/report').send({
          description: 'Invalid user.',
          flags: ['Negligence in Duties'],
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 400 when a user tries to report themselves', async () => {
        const response = await studentAgent
          .post(`/api/users/${student._id.toString()}/report`)
          .send({
            description: 'Reporting myself.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(400);
      });

      it('should return 404 for a non-existent user', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await studentAgent.post(`/api/users/${fakeId}/report`).send({
          description: 'User does not exist.',
          flags: ['Negligence in Duties'],
        });
        expect(response).statusToBe(404);
      });

      it('should return 403 when a student tries to report another student', async () => {
        const otherStudent = await (
          await import('../../test/factories.js')
        ).buildStudent.create();
        const response = await studentAgent
          .post(`/api/users/${otherStudent._id.toString()}/report`)
          .send({
            description: 'Reporting another student.',
            flags: ['Disruptive Behavior'],
          });
        expect(response).statusToBe(403);
      });

      it('should return 403 when a landlord tries to report a manager', async () => {
        const response = await landlordAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({
            description: 'Reporting a manager.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(403);
      });

      it('should return 403 when a manager tries to report a landlord', async () => {
        const response = await managerAgent
          .post(`/api/users/${landlord._id.toString()}/report`)
          .send({
            description: 'Reporting a landlord.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(403);
      });

      it('should return 409 when user already has a pending report against the same user', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({
            description: 'Duplicate pending report.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(409);
      });
    });
  });

  // ==========================================================================
  // GET /api/users/me/reports
  // ==========================================================================
  describe('GET /api/users/me/reports', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.get('/api/users/me/reports');
        expect(response).statusToBe(401);
      });

      it('should return own reports for a verified student', async () => {
        const response = await studentAgent.get('/api/users/me/reports');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
      });

      it('should return own reports for a verified landlord', async () => {
        const response = await landlordAgent.get('/api/users/me/reports');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('Logic', () => {
      it('should only return reports belonging to the requesting user', async () => {
        const response = await studentAgent.get('/api/users/me/reports');
        expect(response).statusToBe(200);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        response.body.data.forEach((report: { userId: string }) => {
          expect(report.userId).toBe(student._id.toString());
        });
      });
    });
  });

  // ==========================================================================
  // GET /api/reports
  // ==========================================================================
  describe('GET /api/reports', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.get('/api/reports');
        expect(response).statusToBe(401);
      });

      it('should return 403 for non-admin users', async () => {
        const response = await studentAgent.get('/api/reports');
        expect(response).statusToBe(403);
      });

      it('should return all reports for admin', async () => {
        const response = await adminAgent.get('/api/reports');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
      });
    });
  });

  // ==========================================================================
  // GET /api/reports/:reportId
  // ==========================================================================
  describe('GET /api/reports/:reportId', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.get(`/api/reports/${reportId}`);
        expect(response).statusToBe(401);
      });

      it('should return 403 for non-admin users', async () => {
        const response = await studentAgent.get(`/api/reports/${reportId}`);
        expect(response).statusToBe(403);
      });

      it('should return a single report for admin', async () => {
        const response = await adminAgent.get(`/api/reports/${reportId}`);
        expect(response).statusToBe(200);
        expect(response.body.data._id).toBeDefined();
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid report id', async () => {
        const response = await adminAgent.get('/api/reports/invalid-id');
        expect(response).statusToBe(400);
      });

      it('should return 404 for non-existent report', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await adminAgent.get(`/api/reports/${fakeId}`);
        expect(response).statusToBe(404);
      });
    });
  });

  // ==========================================================================
  // POST /api/reports/:reportId/resolve
  // ==========================================================================
  describe('POST /api/reports/:reportId/resolve', () => {
    describe('Authentication', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(401);
      });

      it('should return 403 for non-admin users', async () => {
        const response = await studentAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(403);
      });

      it('should allow admin to dismiss a report', async () => {
        const response = await adminAgent
          .post(`/api/reports/${userReportId}/resolve`)
          .send({ status: 'dismissed' });
        expect(response).statusToBe(200);
        expect(response.body.data.status).toBe('dismissed');
      });

      it('should allow admin to resolve a report', async () => {
        const response = await adminAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(200);
        expect(response.body.data.status).toBe('resolved');
      });
    });

    describe('Validation', () => {
      it('should return 400 for invalid status value', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await adminAgent
          .post(`/api/reports/${fakeId}/resolve`)
          .send({ status: 'invalid-status' });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      it('should return 400 when resolving an already resolved report', async () => {
        const response = await adminAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(400);
      });

      it('should allow re-reporting a listing once a report is resolved', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Reporting again after resolution.',
          flags: ['Outdated Details'],
        });
        expect(response).statusToBe(201);
      });
    });
  });
});
