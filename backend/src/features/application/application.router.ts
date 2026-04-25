import { Router } from 'express';
import {
  routeGetApplications,
  routeCreateApplication,
  routeGetApplication,
  routeDeleteApplication,
  routeAssignApplicationUnit,
  routeApproveApplication,
  routeRejectApplication,
} from './application.controller';
import { isSuperAdmin, isVerifiedStudent, managerFilter, selfFilter } from '../../middleware';

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
router.get(
  '/:applicationId',
  managerFilter('listing', 'manageApplications', true),
  routeGetApplication,
);

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
router.post(
  '/:applicationId/approve',
  managerFilter('listing', 'manageApplications'),
  routeApproveApplication,
);

// ============================================================================
// POST /api/applications/:applicationId/reject
//
// Rejects an application.
// ============================================================================
router.post(
  '/:applicationId/reject',
  managerFilter('listing', 'manageApplications'),
  routeRejectApplication,
);

// ============================================================================
// POST /api/applications/:applicationId/assign-unit
//
// Assigns a unit for the student with the application.
// ============================================================================
router.post(
  '/:applicationId/assign-unit',
  managerFilter('listing', 'manageApplications'),
  routeAssignApplicationUnit,
);

// TODO: finalization
export default router;
