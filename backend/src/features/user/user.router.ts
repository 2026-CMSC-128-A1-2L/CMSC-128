import { Router } from 'express';
import { createDocumentRouter } from '../document/document.router.js';
import {
  isSuperAdmin,
  isSelfOrSuperAdmin,
  setUserId,
  getUserId,
  isLoggedIn,
  isVerifiedCheck,
} from '../../middleware.js';
import {
  routeGetUsers,
  routeUpdateSelf,
  routeDeleteSelf,
  routeDeleteUser,
  routeApproveUser,
  routeRejectUser,
  routeGetSelf,
  routeGetUser,
  routeOnboardSelf,
  routeSubmitVerificationSelf,
} from './user.controller.js';
import { User } from './user.model.js';
import { routeGetApplicationsByStudent } from '../application/application.controller.js';
import { routeGetRentalsByUser } from '../rental/rental.controller.js';
import { routeGetUserBillings } from '../billing/billing.controller.js';
import { routeGetVisitBookingsByStudent } from '../booking/booking.controller.js';
import { routeReportUser, routeGetMyReports } from '../report/report.controller.js';

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
// POST /api/users/me/onboard
//
// The user sets their own user type, contact info, and address.
// ============================================================================
router.post('/me/onboard', isLoggedIn, routeOnboardSelf);

// ============================================================================
// POST /api/users/me/verification
//
// The user submits uploaded verification documents for admin review.
// ============================================================================
router.post('/me/verification', isLoggedIn, routeSubmitVerificationSelf);

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
// GET /api/users/me/reports
//
// Returns the logged-in user's own submitted reports and their statuses.
// Used by students and landlords to track "Report Updates".
// ============================================================================
router.get('/me/reports', isVerifiedCheck, routeGetMyReports);

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
  createDocumentRouter(isSelfOrSuperAdmin, isSuperAdmin, isSelfOrSuperAdmin, User),
);

// ============================================================================
// POST /api/users/:userId/report
//
// - Students can report managers or landlords.
// - Landlords and managers can report tenants.
// Role enforcement is handled in the service.
// ============================================================================
router.post('/:userId/report', isVerifiedCheck, routeReportUser);

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
