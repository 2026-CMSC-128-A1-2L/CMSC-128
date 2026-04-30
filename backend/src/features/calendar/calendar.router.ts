import { Router } from 'express';
import { isLoggedIn } from '../../middleware.js';
import { routeGetCalendar, routeGetUpcomingEvents } from './calendar.controller.js';

const router = Router();

// GET /api/calendar
router.get('/', isLoggedIn, routeGetCalendar);

// GET api/calendar/upcoming
router.get('/upcoming', isLoggedIn, routeGetUpcomingEvents);

export default router;
