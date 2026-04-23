import { Router } from 'express';
import { routeGetCalendar } from './calendar.controller';

const router = Router();

// GET /api/calendar
router.get('/', routeGetCalendar);

export default router;
