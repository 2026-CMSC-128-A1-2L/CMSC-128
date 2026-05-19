import { Router } from 'express';
import { routePusherAuth } from './pusher.controller.js';
import { isLoggedIn } from '../../middleware.js';

const router = Router();

router.post('/auth', isLoggedIn, routePusherAuth);

export default router;
