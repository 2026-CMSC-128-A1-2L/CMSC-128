import { Router } from 'express';
import { routeGetMyAvailability, routeUpdateMyAvailability } from './availability.controller.js';
import { isLandlord } from '../../middleware.js';

const router = Router();

router.get('/me', isLandlord, routeGetMyAvailability);
router.patch('/me', isLandlord, routeUpdateMyAvailability);

export default router;
