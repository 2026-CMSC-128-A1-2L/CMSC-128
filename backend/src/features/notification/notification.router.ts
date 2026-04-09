import { Router } from 'express';
import {
  routeGetNotifications,
  routeGetNotification,
  routeReadNotification,
} from './notification.controller';

const router = Router();

// GET /api/notifications
router.get('/notifications', routeGetNotifications);
// POST /api/notifications/:notificationId
router.get('/notifications/:notificationId', routeGetNotification);
// POST /api/notifications/:notificationId/read
router.post('/notifications/:notificationId/read', routeReadNotification);

export default router;
