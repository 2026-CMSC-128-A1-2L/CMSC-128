import { Router } from 'express';
import {
  routeGetApplications,
  routeCreateApplication,
  routeGetApplication,
  routeUpdateApplication,
  routeDeleteApplication,
  routeUpdateApplicationStatus,
  routeAssignApplicationUnit,
} from './application.controller';
import { isSuperAdmin, isVerifiedStudent, managerFilter, selfFilter } from '../../middleware';

const router = Router();

// GET /api/applications
router.get('/', isSuperAdmin, routeGetApplications);

// POST /api/applications
router.post('/', isVerifiedStudent, routeCreateApplication);

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
router.get(
  '/:applicationId',
  managerFilter('listing', 'manageApplications', true),
  routeGetApplication,
);

// PATCH /api/applications/:applicationId
router.patch(
  '/:applicationId',
  managerFilter('listing', 'manageApplications', true),
  routeUpdateApplication,
);

// DELETE /api/applications/:applicationId
router.delete('/:applicationId', selfFilter, routeDeleteApplication);

// POST /api/applications/:applicationId/approve
router.post(
  '/:applicationId/approve',
  managerFilter('listing', 'manageApplications'),
  routeUpdateApplicationStatus,
);

// POST /api/applications/:applicationId/reject
router.post(
  '/:applicationId/reject',
  managerFilter('listing', 'manageApplications'),
  routeUpdateApplicationStatus,
);

// POST /api/applications/:applicationId/assign-unit
router.post(
  '/:applicationId/assign-unit',
  managerFilter('listing', 'manageApplications'),
  routeAssignApplicationUnit,
);

export default router;
