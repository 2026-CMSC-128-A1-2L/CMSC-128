import { Router } from 'express';
import {
  routeGetInvites,
  routeInviteManager,
  routeAcceptInvite,
  routeDeclineInvite,
} from './invite.controller';
import { isLandlord, isLoggedIn } from '../../middleware';
import { inviteFilter, isManagerOnly } from './invite.middleware';

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

export default router;
