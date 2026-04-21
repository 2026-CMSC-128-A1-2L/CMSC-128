import { Router } from 'express';
import { routeGetActivities } from './activity.controller';

const router = Router();

// GET /api/activities
router.get('/', routeGetActivities);

export default router;
