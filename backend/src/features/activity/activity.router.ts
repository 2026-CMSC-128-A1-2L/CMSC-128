import { Router } from 'express';
import { routeGetActivities } from './activity.controller';

const router = Router();

// GET /api/activities
router.get('/activities', routeGetActivities);

export default router;
