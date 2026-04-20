import { Router } from 'express';
import { routeGetMessages, routeGetUserMessages, routeSendMessage } from './message.controller';

const router = Router();

// Messages
// GET /api/messages
router.get('/', routeGetMessages);
// GET /api/messages/:userId
router.get('/:userId', routeGetUserMessages);
// POST /api/messages/:userId
router.post('/:userId', routeSendMessage);

export default router;
