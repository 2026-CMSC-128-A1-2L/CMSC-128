import { Router } from 'express';
import { routeGetMessages, routeGetUserMessages, routeSendMessage } from './message.controller';

const router = Router();

// Messages
// GET /api/messages
router.get('/messages', routeGetMessages);
// GET /api/messages/:userId
router.get('/messages/:userId', routeGetUserMessages);
// POST /api/messages/:userId
router.post('/messages/:userId', routeSendMessage);

export default router;
