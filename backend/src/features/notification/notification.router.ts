import { Router } from 'express';
import {
  routeGetNotifications,
  routeGetNotification,
  routeReadNotification,
} from './notification.controller';

const router = Router();

// GET /api/notifications
router.get('/', routeGetNotifications);
// POST /api/notifications/:notificationId
router.get('/:notificationId', routeGetNotification);
// POST /api/notifications/:notificationId/read
router.post('/:notificationId/read', routeReadNotification);

export default router;
