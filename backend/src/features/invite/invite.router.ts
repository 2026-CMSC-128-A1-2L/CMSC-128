import { Router } from 'express';
import {
  routeGetInvites,
  routeInviteManager,
  routeAcceptInvite,
  routeDeclineInvite,
  routeGetInviteById,
  routeDeleteInvite
} from "./invite.controller.js";
import { isLandlord, isLoggedIn } from "../../middleware.js";
import { inviteFilter, isManagerOnly } from "./invite.middleware.js";

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
