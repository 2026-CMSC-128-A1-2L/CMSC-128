import { Router } from 'express';
import { routeGetCalendar } from './calendar.controller';

const router = Router();

// GET /api/calendar
router.get('/calendar', routeGetCalendar);

export default router;
