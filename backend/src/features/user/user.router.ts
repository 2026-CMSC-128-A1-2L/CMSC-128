import { Router } from 'express';
import { createDocumentRouter } from '../document/document.router';
import {
  isSuperAdmin,
  isSelfOrSuperAdmin,
  getUserId,
  selfFilter,
  isVerifiedStudent,
  hasAccount,
} from '../../middleware';
import {
  routeGetUsers,
  routeUpdateUser,
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
router.get('/me', hasAccount, routeGetSelf);

// ============================================================================
// GET /api/users/:userId
//
// Retrieves a user.
// Can only be used by the admin.
// ============================================================================
router.get('/:userId', isSuperAdmin, routeGetUser);

// ============================================================================
// PATCH /api/users/:userId
//
// Can edit home address and contact number.
// ============================================================================
router.patch('/:userId', selfFilter(true), routeUpdateUser);

// ============================================================================
// DELETE /api/users/:userId
//
// Soft deletes a user by setting `isActive` false. The user should not be able
// to log-in and have all sessions invalidated.
//
// TODO:
//   Clarify what happens if the user tries to log-in again.
//
// ============================================================================
router.delete('/:userId', isSelfOrSuperAdmin, routeDeleteUser);

// ============================================================================
// GET /api/users/:userId/documents
//
// Documents for a user's verification.
// ============================================================================
router.use(
  '/:userId/documents',
  getUserId,
  createDocumentRouter(selfFilter(false), isSuperAdmin, User as any),
);

// ============================================================================
// GET /api/users/:userId/billings
//
// Returns a user's billings with a summary.
//
// TODO:
//   Implement summary.
//
// ============================================================================
router.get('/:userId/billings', selfFilter(false), routeGetUserBillings);

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

// GET /api/users/:userId/applications
// Input:
// - userId (ObjectId)
//
// Output:
// - Array of ApplicationForm objects
//
// Considerations:
// - Returns only applications of current user
router.get('/:userId/applications', selfFilter(false), routeGetApplicationsByStudent);

// GET /api/users/:userId/rentals
router.get('/:userId/rentals', selfFilter(false), routeGetRentalsByUser);

// GET /api/users/:userId/billings
router.get('/:userId/billings', selfFilter(false), routeGetUserBillings);

// GET /api/users/:userId/bookings
router.get('/:userId/bookings', selfFilter(false), routeGetVisitBookingsByStudent);

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
