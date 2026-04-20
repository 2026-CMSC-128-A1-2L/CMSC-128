import { Router } from 'express';
import {
  routeGetInvites,
  routeInviteManager,
  routeAcceptInvite,
  routeDeclineInvite,
} from './invite.controller';
import { isLandlord } from '../../middleware';

const router = Router();

// Invites
// GET /api/invites
router.get('/', routeGetInvites);
// POST /api/invites
router.post('/', isLandlord, routeInviteManager);
// POST /api/invites/:inviteId/accept
router.post('/:inviteId/accept', routeAcceptInvite);
// POST /api/invites/:inviteId/decline
router.post('/:inviteId/decline', routeDeclineInvite);

export default router;
