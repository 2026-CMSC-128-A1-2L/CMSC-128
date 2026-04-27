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

  // Sets up:
  // - A housing facility owned by the landlord
  // - A listing inside that facility
  // - A unit under the listing
  // - An active rental for the student in that unit/facility
  //
  // The rental has no actualMoveInDate (reports don't require a minimum stay,
  // unlike reviews). The student just needs an active rental anywhere in the
  // facility to pass the active-tenant check for listing reports.
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

  // ============================================================================
  // POST /api/listings/:listingId/report
  //
  // Creates a new listing report. Only verified students who are currently
  // active tenants anywhere in the same facility may report a listing.
  // A second pending report against the same listing is blocked until the
  // existing one is resolved or dismissed.
  // ============================================================================
  describe('POST /api/listings/:listingId/report', () => {
    describe('Authentication', () => {
      // The route applies isVerifiedStudent middleware, which rejects any
      // unauthenticated request before reaching the controller.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'This listing has wrong information.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(401);
      });

      // isVerifiedStudent also rejects landlords — only the Student user type
      // is allowed to report listings.
      it('should return 403 for landlords', async () => {
        const response = await landlordAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'This listing has wrong information.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(403);
      });

      // Happy path: student has an active rental in this facility, passes
      // the tenant check, and the body is valid — report is created at 201.
      // Also captures reportId for use in GET, resolve, and re-report tests below.
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
      // description is required by the Zod schema — omitting it fails validation.
      it('should return 400 for missing description', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(400);
      });

      // flags is required and must be a non-empty array — omitting it fails Zod.
      it('should return 400 for missing flags', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Missing flags.',
        });
        expect(response).statusToBe(400);
      });

      // Zod enforces flags.min(1) — an empty array is rejected.
      it('should return 400 for empty flags array', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Empty flags.',
          flags: [],
        });
        expect(response).statusToBe(400);
      });

      // description has a max length of 200 characters in the Zod schema.
      it('should return 400 for description exceeding 200 characters', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'a'.repeat(201),
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(400);
      });

      // evidence is limited to 2 items by the Zod schema — 3 items fails validation.
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

      // The listingId URL param must be a valid MongoDB ObjectId.
      // Zod param validation catches this before any service logic runs.
      it('should return 400 for invalid listing id', async () => {
        const response = await studentAgent.post('/api/listings/invalid-id/report').send({
          description: 'Invalid listing.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      // The listing must exist before a report can be filed against it.
      // Service throws 404 when the listing lookup returns null.
      it('should return 404 for a non-existent listing', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await studentAgent.post(`/api/listings/${fakeId}/report`).send({
          description: 'Listing does not exist.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(404);
      });

      // The service checks for an active rental anywhere in the *facility*
      // (not just the specific listing). This student has no rental in the
      // other facility, so the tenant check fails with 403.
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

      // The student already filed a report against listingId above and it is
      // still pending. A second attempt before resolution must be rejected with 409.
      // Re-reporting is allowed only after the existing report is resolved or dismissed
      // (tested in the resolve section below).
      it('should return 409 when student already has a pending report for the same listing', async () => {
        const response = await studentAgent.post(`/api/listings/${listingId}/report`).send({
          description: 'Duplicate pending report.',
          flags: ['Misinformation'],
        });
        expect(response).statusToBe(409);
      });
    });
  });

  // ============================================================================
  // POST /api/users/:userId/report
  //
  // Creates a user report. Any verified user can file one, but role constraints
  // apply: students may only report managers or landlords; landlords and managers
  // may only report students. Self-reporting is always blocked (400).
  // A second pending report against the same target is blocked until resolved.
  // ============================================================================
  describe('POST /api/users/:userId/report', () => {
    describe('Authentication', () => {
      // The route applies isVerifiedCheck middleware, which rejects unauthenticated
      // requests (401) and unverified users (403) before the controller runs.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.post(`/api/users/${manager._id.toString()}/report`).send({
          description: 'Manager is not doing their job.',
          flags: ['Negligence in Duties'],
        });
        expect(response).statusToBe(401);
      });

      // Happy path: student (verified) reports a manager — allowed by role rules.
      // Also captures userReportId for use in the resolve (dismiss) test below.
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

      // A student may also report the landlord — both are in the allowed
      // "manager or landlord" category for student reporters.
      it('should allow a verified student to report a landlord', async () => {
        const response = await studentAgent
          .post(`/api/users/${landlord._id.toString()}/report`)
          .send({
            description: 'Landlord is unresponsive.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(201);
      });

      // Landlords may report students — the role check allows landlords/managers
      // to report the Student user type.
      it('should allow a landlord to report a student', async () => {
        const response = await landlordAgent
          .post(`/api/users/${student._id.toString()}/report`)
          .send({
            description: 'Tenant is causing trouble.',
            flags: ['Disruptive Behavior'],
          });
        expect(response).statusToBe(201);
      });

      // Managers may also report students — same role rule as landlords.
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
      // description is required — omitting it fails Zod before the service runs.
      it('should return 400 for missing description', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({ flags: ['Negligence in Duties'] });
        expect(response).statusToBe(400);
      });

      // flags must be a non-empty array — Zod rejects an empty array.
      it('should return 400 for empty flags array', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({ description: 'No flags.', flags: [] });
        expect(response).statusToBe(400);
      });

      // description is capped at 200 characters — Zod rejects anything longer.
      it('should return 400 for description exceeding 200 characters', async () => {
        const response = await studentAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({ description: 'a'.repeat(201), flags: ['Negligence in Duties'] });
        expect(response).statusToBe(400);
      });

      // The userId URL param must be a valid MongoDB ObjectId.
      it('should return 400 for invalid user id', async () => {
        const response = await studentAgent.post('/api/users/invalid-id/report').send({
          description: 'Invalid user.',
          flags: ['Negligence in Duties'],
        });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      // The service explicitly checks that the reporter and target are different.
      // Reporting yourself always returns 400, regardless of role.
      it('should return 400 when a user tries to report themselves', async () => {
        const response = await studentAgent
          .post(`/api/users/${student._id.toString()}/report`)
          .send({
            description: 'Reporting myself.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(400);
      });

      // The target user must exist. Service throws 404 when the user lookup returns null.
      it('should return 404 for a non-existent user', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await studentAgent.post(`/api/users/${fakeId}/report`).send({
          description: 'User does not exist.',
          flags: ['Negligence in Duties'],
        });
        expect(response).statusToBe(404);
      });

      // Students may only report managers or landlords — reporting another
      // student violates the role constraint and returns 403.
      it('should return 403 when a student tries to report another student', async () => {
        const otherStudent = await (await import('../../test/factories.js')).buildStudent.create();
        const response = await studentAgent
          .post(`/api/users/${otherStudent._id.toString()}/report`)
          .send({
            description: 'Reporting another student.',
            flags: ['Disruptive Behavior'],
          });
        expect(response).statusToBe(403);
      });

      // Landlords/managers may only report students — reporting a manager (not a
      // student) violates the role constraint and returns 403.
      it('should return 403 when a landlord tries to report a manager', async () => {
        const response = await landlordAgent
          .post(`/api/users/${manager._id.toString()}/report`)
          .send({
            description: 'Reporting a manager.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(403);
      });

      // Same rule: managers may only report students — a landlord is not a student.
      it('should return 403 when a manager tries to report a landlord', async () => {
        const response = await managerAgent
          .post(`/api/users/${landlord._id.toString()}/report`)
          .send({
            description: 'Reporting a landlord.',
            flags: ['Negligence in Duties'],
          });
        expect(response).statusToBe(403);
      });

      // The student already filed a pending report against the manager above.
      // A second attempt against the same target while the first is still pending
      // must return 409. Re-reporting is allowed once the existing report settles.
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

  // ============================================================================
  // GET /api/users/me/reports
  //
  // Returns all reports filed by the authenticated user (across both listing
  // and user report types). Only the report owner sees their own reports.
  // ============================================================================
  describe('GET /api/users/me/reports', () => {
    describe('Authentication', () => {
      // isVerifiedCheck blocks unauthenticated requests with 401.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.get('/api/users/me/reports');
        expect(response).statusToBe(401);
      });

      // The student filed multiple reports above (listing report + manager report +
      // landlord report), so the array must be non-empty.
      it('should return own reports for a verified student', async () => {
        const response = await studentAgent.get('/api/users/me/reports');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
      });

      // Landlords are also verified users and can retrieve their own filed reports.
      it('should return own reports for a verified landlord', async () => {
        const response = await landlordAgent.get('/api/users/me/reports');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('Logic', () => {
      // The service filters by userId === req.user._id, so every returned
      // document must belong to the requesting student. This guards against
      // data leakage across users.
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

  // ============================================================================
  // GET /api/reports
  //
  // Returns all reports across all types. Admin-only endpoint — other roles
  // are rejected before the service runs.
  // ============================================================================
  describe('GET /api/reports', () => {
    describe('Authentication', () => {
      // isSuperAdmin middleware rejects unauthenticated requests with 401.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.get('/api/reports');
        expect(response).statusToBe(401);
      });

      // isSuperAdmin also rejects authenticated non-admins (students, landlords,
      // managers) with 403 — no role except Admin may list all reports.
      it('should return 403 for non-admin users', async () => {
        const response = await studentAgent.get('/api/reports');
        expect(response).statusToBe(403);
      });

      // Admin bypasses isSuperAdmin and receives the full list.
      // The test data from above ensures there is at least one report present.
      it('should return all reports for admin', async () => {
        const response = await adminAgent.get('/api/reports');
        expect(response).statusToBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
      });
    });
  });

  // ============================================================================
  // GET /api/reports/:reportId
  //
  // Returns a single report by ID. Admin-only. Requires a valid ObjectId param
  // and the report must exist.
  // ============================================================================
  describe('GET /api/reports/:reportId', () => {
    describe('Authentication', () => {
      // isSuperAdmin rejects unauthenticated requests with 401.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent.get(`/api/reports/${reportId}`);
        expect(response).statusToBe(401);
      });

      // isSuperAdmin rejects non-admin authenticated users with 403.
      it('should return 403 for non-admin users', async () => {
        const response = await studentAgent.get(`/api/reports/${reportId}`);
        expect(response).statusToBe(403);
      });

      // Admin retrieves the listing report created in POST tests above.
      // reportId was captured from the successful 201 response.
      it('should return a single report for admin', async () => {
        const response = await adminAgent.get(`/api/reports/${reportId}`);
        expect(response).statusToBe(200);
        expect(response.body.data._id).toBeDefined();
      });
    });

    describe('Validation', () => {
      // The reportId URL param must be a valid MongoDB ObjectId.
      // Zod param validation catches this before any DB call.
      it('should return 400 for invalid report id', async () => {
        const response = await adminAgent.get('/api/reports/invalid-id');
        expect(response).statusToBe(400);
      });

      // A valid ObjectId that does not match any report returns 404.
      it('should return 404 for non-existent report', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await adminAgent.get(`/api/reports/${fakeId}`);
        expect(response).statusToBe(404);
      });
    });
  });

  // ============================================================================
  // POST /api/reports/:reportId/resolve
  //
  // Allows an admin to resolve or dismiss a pending report. Non-pending reports
  // cannot be re-resolved (400). Once resolved, the reporter may file another
  // report against the same target (re-reporting).
  // ============================================================================
  describe('POST /api/reports/:reportId/resolve', () => {
    describe('Authentication', () => {
      // isSuperAdmin rejects unauthenticated requests with 401.
      it('should return 401 for unauthenticated users', async () => {
        const response = await guestAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(401);
      });

      // isSuperAdmin rejects non-admin authenticated users with 403.
      it('should return 403 for non-admin users', async () => {
        const response = await studentAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(403);
      });

      // Admin dismisses the user report (userReportId) — "dismissed" is a valid
      // terminal status alongside "resolved". Verifies the response reflects the new status.
      // Uses userReportId here so reportId (the listing report) stays pending for
      // the "resolved" test that follows.
      it('should allow admin to dismiss a report', async () => {
        const response = await adminAgent
          .post(`/api/reports/${userReportId}/resolve`)
          .send({ status: 'dismissed' });
        expect(response).statusToBe(200);
        expect(response.body.data.status).toBe('dismissed');
      });

      // Admin resolves the listing report (reportId). After this, reportId's status
      // is "resolved" — used in the duplicate-resolve logic test below.
      it('should allow admin to resolve a report', async () => {
        const response = await adminAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(200);
        expect(response.body.data.status).toBe('resolved');
      });
    });

    describe('Validation', () => {
      // The Zod schema only accepts "resolved" or "dismissed" for status.
      // Any other value is rejected before any DB call.
      it('should return 400 for invalid status value', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const response = await adminAgent
          .post(`/api/reports/${fakeId}/resolve`)
          .send({ status: 'invalid-status' });
        expect(response).statusToBe(400);
      });
    });

    describe('Logic', () => {
      // reportId was resolved in the Authentication block above. Attempting to
      // resolve it again must return 400 — only pending reports can be actioned.
      it('should return 400 when resolving an already resolved report', async () => {
        const response = await adminAgent
          .post(`/api/reports/${reportId}/resolve`)
          .send({ status: 'resolved' });
        expect(response).statusToBe(400);
      });

      // Once the listing report is resolved, the student's pending-report guard
      // no longer blocks a new submission for the same listing. This verifies
      // the re-reporting flow works end-to-end.
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
