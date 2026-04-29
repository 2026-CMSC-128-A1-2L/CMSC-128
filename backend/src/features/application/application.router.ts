import { Router } from 'express';
import {
  routeGetApplications,
  routeCreateApplication,
  routeGetApplication,
  routeDeleteApplication,
  routeAssignApplicationUnit,
  routeApproveApplication,
  routeRejectApplication,
  routeFinalizeApplication,
} from "./application.controller.js";
import {
  includeSelf,
  isSuperAdmin,
  isVerifiedStudent,
  manageApplicationsFilter,
  selfFilter,
} from "../../middleware.js";

const router = Router();

// ============================================================================
// GET /api/applications
//
// Should be the only endpoint used by any role.
// ============================================================================
router.get('/', isSuperAdmin, routeGetApplications);

// ============================================================================
// POST /api/applications
//
// Apply for a dorm.
// ============================================================================
router.post('/', isVerifiedStudent, routeCreateApplication);

// ============================================================================
// GET /api/applications/:applicationId
// Input:
// - applicationId (ObjectId)
//
// Output:
// - ApplicationForm object
//
// Considerations:
// - Returns 404 if not found
// - Should enforce access control (student or authorized staff)
// ============================================================================
router.get('/:applicationId', manageApplicationsFilter, includeSelf, routeGetApplication);

// ============================================================================
// DELETE /api/applications/:applicationId
//
// Cancel an application.
// ============================================================================
router.delete('/:applicationId', selfFilter, routeDeleteApplication);

// ============================================================================
// POST /api/applications/:applicationId/approve
//
// Approves an application.
//  - If a manager approves an application, it is made waitlisted
//  - If a landlord approves an application, it is made approved
// ============================================================================
router.post('/:applicationId/approve', manageApplicationsFilter, routeApproveApplication);

// ============================================================================
// POST /api/applications/:applicationId/reject
//
// Rejects an application.
// ============================================================================
router.post('/:applicationId/reject', manageApplicationsFilter, routeRejectApplication);

// ============================================================================
// POST /api/applications/:applicationId/assign-unit
//
// Assigns a unit for the student with the application.
// ============================================================================
router.post('/:applicationId/assign-unit', manageApplicationsFilter, routeAssignApplicationUnit);

// ============================================================================
// POST /api/applications/:applicationId/finalize
//
// Finalizes an application.
// ============================================================================
router.post('/:applicationId/finalize', manageApplicationsFilter, routeFinalizeApplication);

export default router;
