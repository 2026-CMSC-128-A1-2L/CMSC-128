import { Router } from 'express';
import { createDocumentRouter } from '../document/document.router';
import {
  isSuperAdmin,
  isSelfOrSuperAdmin,
  getUserId,
  isSelf,
  selfFilter,
  isVerifiedStudent,
} from '../../middleware';
import {
  routeGetUsers,
  routeGetUser,
  routeUpdateUser,
  routeDeleteUser,
  routeApproveUser,
  routeRejectUser,
} from './user.controller';
import { User } from './user.model';
import { routeGetApplicationsByStudent } from '../application/application.controller';
import { routeGetRentalsByUser } from '../rental/rental.controller';
import { routeGetUserBillings } from '../billing/billing.controller';
import { routeGetVisitBookingsByStudent } from '../booking/booking.controller';
import { routeReportUser } from '../report/report.controller';

const router = Router();

// GET /api/users
router.get('/', isSuperAdmin, routeGetUsers);

// GET /api/users/:userId
router.get('/:userId', isSelfOrSuperAdmin, routeGetUser);

// PATCH /api/users/:userId
router.patch('/:userId', isSelfOrSuperAdmin, routeUpdateUser);

// DELETE /api/users/:userId
router.delete('/:userId', isSelfOrSuperAdmin, routeDeleteUser);

// GET /api/users/:userId/documents
router.get(
  '/:userId/documents',
  getUserId,
  createDocumentRouter(isSelf, isSuperAdmin, User as any),
);

// GET /api/users/:userId/applications
router.get('/:userId/applications', selfFilter(false), routeGetApplicationsByStudent);

// GET /api/users/:userId/rentals
router.get('/:userId/rentals', selfFilter(false), routeGetRentalsByUser);

// GET /api/users/:userId/billings
router.get('/:userId/billings', selfFilter(false), routeGetUserBillings);

// GET /api/users/:userId/bookings
router.get('/:userId/bookings', isSelfOrSuperAdmin, routeGetVisitBookingsByStudent);

// TODO: user is to be reported by manager/landlord
// make filter for that
//
// POST /api/users/:userId/report
router.post('/:userId/report', isVerifiedStudent, routeReportUser);

// ============================================================================
// User Verification
//
// Users need to be verified before getting access to other parts of the site.
// The required documents are sent and are checked by the admin.
// Each requirement can be verified individually.
// 
// The admin can only verify a user if all of the requirements are met.
// The admin can only reject a user if at least one of the requirements are not
// met.
//
// TODO:
//   Clarify if a verification can only be accepted if all documents are
//   verified, and if a verification can only be rejected if there is at least
//   one document that is not verified.
//
// Verifying and rejecting can only be done by the admin.
// ============================================================================

// ============================================================================
// POST /api/users/:userId/approve
// ============================================================================
router.post('/:userId/approve', isSuperAdmin, routeApproveUser);

// ============================================================================
// POST /api/users/:userId/reject
// ============================================================================
router.post('/:userId/reject', isSuperAdmin, routeRejectUser);


export default router;
