import { Router } from 'express';
import { routeGetInvites, routeInviteManager, routeAcceptInvite, routeDeclineInvite } from './invite.controller';
import { isLandlord } from '../../middleware';

const router = Router();


// Invites
// GET /api/invites
router.get('/invites', routeGetInvites);
// POST /api/invites
router.post('/invites', isLandlord, routeInviteManager);
// POST /api/invites/:inviteId/accept
router.post('/invites/:inviteId/accept', routeAcceptInvite);
// POST /api/invites/:inviteId/decline
router.post('/invites/:inviteId/decline', routeDeclineInvite);

export default router;
