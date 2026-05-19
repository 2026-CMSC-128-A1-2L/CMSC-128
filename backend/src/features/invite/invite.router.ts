import { Router } from 'express';
import {
  routeGetInvites,
  routeInviteManager,
  routeInviteStudent,
  routeAcceptInvite,
  routeDeclineInvite,
  routeGetInviteById,
  routeDeleteInvite,
  routeAcceptStudentInvite,
  routeDeclineStudentInvite,
} from './invite.controller.js';
import { isLandlord, isLoggedIn } from '../../middleware.js';
import { inviteFilter, isManagerOnly, isStudentOnly } from './invite.middleware.js';

const router = Router();

// Invites

// ============================================================================
// GET /api/invites
//
// Retrieves the invites for either a landlord or a manager.
//
// If the user is a manager, it will return all invites sent to them.
// If the user is a landlord, it will return all invites sent by them.
// ============================================================================
router.get('/', isLoggedIn, inviteFilter, routeGetInvites);

// ============================================================================
// POST /api/invites
//
// Invites a manager to a facility by a landlord.
// ============================================================================
router.post('/', isLoggedIn, isLandlord, routeInviteManager);

// Invite a student to join an existing unit as a legacy tenant.
router.post('/student', isLoggedIn, isLandlord, routeInviteStudent);

// ============================================================================
// POST /api/invites/student
//
// Invites a student to a facility unit by a landlord.
// ============================================================================
router.post('/student', isLoggedIn, isLandlord, routeInviteStudent);

// ============================================================================
// POST /api/invites/:inviteId/accept
//
// Accepts the invitation to manage a facility.
// This makes a manager verified if they weren't already.
// ============================================================================
router.post('/:inviteId/accept', isLoggedIn, isManagerOnly, routeAcceptInvite);

// ============================================================================
// POST /api/invites/:inviteId/decline
//
// Declines the invitation to manage a facility.
// ============================================================================
router.post('/:inviteId/decline', isLoggedIn, isManagerOnly, routeDeclineInvite);

// ============================================================================
// POST /api/invites/:inviteId/accept-student
//
// Accepts a student (legacy tenant) invitation to join a unit.
// Creates an active Rental record linking the student to the unit.
// ============================================================================
router.post('/:inviteId/accept-student', isLoggedIn, isStudentOnly, routeAcceptStudentInvite);

// ============================================================================
// POST /api/invites/:inviteId/decline-student
//
// Declines a student (legacy tenant) invitation.
// ============================================================================
router.post('/:inviteId/decline-student', isLoggedIn, isStudentOnly, routeDeclineStudentInvite);

// ============================================================================
// GET /api/invites/:inviteId
//
// Get a specific invite
// ============================================================================
router.get('/:inviteId', isLoggedIn, inviteFilter, routeGetInviteById);

// ============================================================================
// DELETE /api/invites/:inviteId
//
// Landlord deletes or withdraws a pending invite
// ============================================================================
router.delete('/:inviteId', isLoggedIn, isLandlord, routeDeleteInvite);
export default router;
