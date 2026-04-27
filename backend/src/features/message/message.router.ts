import { Router } from 'express';
import { routeGetMessages, routeGetUserMessages, routeSendMessage } from './message.controller';
import { isVerifiedCheck } from '../../middleware';

const router = Router();

// Messages
// GET /api/messages
router.get('/', isVerifiedCheck, routeGetMessages);
// GET /api/messages/:userId
router.get('/:userId', isVerifiedCheck, routeGetUserMessages);
// POST /api/messages/:userId
router.post('/:userId', isVerifiedCheck, routeSendMessage);

export default router;
