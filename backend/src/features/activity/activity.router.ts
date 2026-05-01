import { Router } from 'express';
import { routeGetActivities } from './activity.controller.js';

const router = Router();

// GET /api/activities
router.get('/', routeGetActivities);

export default router;
