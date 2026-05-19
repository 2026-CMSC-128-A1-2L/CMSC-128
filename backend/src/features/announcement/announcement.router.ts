import { Router } from 'express';
import {
  routeSendAnnouncement,
  routeGetAnnouncements,
  routeMarkAnnouncementRead,
} from './announcement.controller.js';
import { isLoggedIn, isSuperAdmin } from '../../middleware.js';

const router = Router();

router.get('/', isLoggedIn, routeGetAnnouncements);
router.post('/', isSuperAdmin, routeSendAnnouncement);
router.post('/:announcementId/read', isLoggedIn, routeMarkAnnouncementRead);

export default router;
