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
router.get('/applications', isSuperAdmin, routeGetApplications);

// POST /api/applications
router.post('/applications', isVerifiedStudent, routeCreateApplication);

// GET /api/applications/:applicationId
router.get(
  '/applications/:applicationId',
  managerFilter('listing', 'manageApplications', true),
  routeGetApplication,
);

// PATCH /api/applications/:applicationId
router.patch(
  '/applications/:applicationId',
  managerFilter('listing', 'manageApplications', true),
  routeUpdateApplication,
);

// DELETE /api/applications/:applicationId
router.delete('/applications/:applicationId', selfFilter(false), routeDeleteApplication);

// POST /api/applications/:applicationId/approve
router.post(
  '/applications/:applicationId/approve',
  managerFilter('listing', 'manageApplications'),
  routeUpdateApplicationStatus,
);

// POST /api/applications/:applicationId/reject
router.post(
  '/applications/:applicationId/reject',
  managerFilter('listing', 'manageApplications'),
  routeUpdateApplicationStatus,
);

// POST /api/applications/:applicationId/assign-unit
router.post(
  '/applications/:applicationId/assign-unit',
  managerFilter('listing', 'manageApplications'),
  routeAssignApplicationUnit,
);

export default router;
