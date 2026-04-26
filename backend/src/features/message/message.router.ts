import { Router } from 'express';
import { routeGetMessages, routeGetUserMessages, routeSendMessage } from './message.controller';
import { isLoggedIn } from '../../middleware';

const router = Router();

// Messages
// GET /api/messages
router.get('/', isLoggedIn, routeGetMessages);
// GET /api/messages/:userId
router.get('/:userId', isLoggedIn, routeGetUserMessages);
// POST /api/messages/:userId
router.post('/:userId', isLoggedIn, routeSendMessage);

export default router;
