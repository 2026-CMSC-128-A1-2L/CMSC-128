import { Router } from 'express';
import { createDocumentRouter } from '../document/document.router';
import {
  isSuperAdmin,
  isSelfOrSuperAdmin,
  setUserId,
  getUserId,
  selfFilter,
  isVerifiedStudent,
  isLoggedIn,
} from '../../middleware';
import {
  routeGetUsers,
  routeUpdateSelf,
  routeDeleteSelf,
  routeDeleteUser,
  routeApproveUser,
  routeRejectUser,
  routeGetSelf,
  routeGetUser,
} from './user.controller';
import { User } from './user.model';
import { routeGetApplicationsByStudent } from '../application/application.controller';
import { routeGetRentalsByUser } from '../rental/rental.controller';
import { routeGetUserBillings } from '../billing/billing.controller';
import { routeGetVisitBookingsByStudent } from '../booking/booking.controller';
import { routeReportUser } from '../report/report.controller';

const router = Router();

// ============================================================================
// GET /api/users
//
// Retrieves a list of users that satisfies the filters.
// Can only be used by the admin.
//
// TODO:
//   Add filter based on verification status
//
// ============================================================================
router.get('/', isSuperAdmin, routeGetUsers);

// ============================================================================
// GET /api/users/me
//
// Retrieves a user's own profile.
// Can only be used by the user.
// ============================================================================
router.get('/me', isLoggedIn, routeGetSelf);

// ============================================================================
// PATCH /api/users/me
//
// Can edit home address and contact number.
// ============================================================================
router.patch('/me', isLoggedIn, routeUpdateSelf);

// ============================================================================
// DELETE /api/users/me
//
// The user should not be able to log-in and have all sessions invalidated.
// If the user tries to log-in again, they go through the whole register flow
// again.
//
//  TODO: invalidate all sessions
//
// ============================================================================
router.delete('/me', isLoggedIn, routeDeleteSelf);

// ============================================================================
// GET /api/users/:userId/applications
// ============================================================================
router.get('/me/applications', setUserId, routeGetApplicationsByStudent);

// ============================================================================
// GET /api/users/:userId/rentals
// ============================================================================
router.get('/me/rentals', setUserId, routeGetRentalsByUser);

// ============================================================================
// GET /api/users/:userId/billings
//
// Returns a user's billings with a summary.
//
// TODO:
//   Implement summary.
//
// ============================================================================
router.get('/me/billings', setUserId, routeGetUserBillings);

// ============================================================================
// GET /api/users/:userId/bookings
// ============================================================================
router.get('/me/bookings', setUserId, routeGetVisitBookingsByStudent);

// ============================================================================
// GET /api/users/:userId
//
// Retrieves a user.
// Can only be used by the admin.
// ============================================================================
router.get('/:userId', isSuperAdmin, routeGetUser);

// ============================================================================
// DELETE /api/users/:userId
//
// The user should not be able to log-in and have all sessions invalidated.
// If the user tries to log-in again, they go through the whole register flow
// again.
//
//  TODO: invalidate all sessions
//
// ============================================================================
router.delete('/:userId', isSuperAdmin, routeDeleteUser);

// ============================================================================
// GET /api/users/:userId/documents
//
// Documents for a user's verification.
// ============================================================================
router.use(
  '/:userId/documents',
  getUserId,
  createDocumentRouter(selfFilter, isSuperAdmin, isSelfOrSuperAdmin, User),
);

// ============================================================================
// POST /api/users/:userId/report
//
// TODO:
//   User is to be reported by manager/landlord make filter for that
//
// ============================================================================
router.post('/:userId/report', isVerifiedStudent, routeReportUser);

// ============================================================================
// These endpoints might be redundant.
// ============================================================================

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
// Verifying and rejecting can only be done by the admin.
// ============================================================================

// ============================================================================
// POST /api/users/:userId/approve
//
// Requires the verified Student Number and Degree Program for students.
// ============================================================================
router.post('/:userId/approve', isSuperAdmin, routeApproveUser);

// ============================================================================
// POST /api/users/:userId/reject
// ============================================================================
router.post('/:userId/reject', isSuperAdmin, routeRejectUser);

export default router;
