import { Router } from 'express';
import { isSuperAdmin, isLoggedIn } from '../../middleware.js';
import {
  routeGetRequests,
  routeCreateRemovalRequest,
  routeApproveRequest,
  routeRejectRequest,
} from './remove.controller.js';

const router = Router();

router.get('/', isSuperAdmin, routeGetRequests);

router.post('/', isLoggedIn, routeCreateRemovalRequest);

router.post('/:requestId/approve', isSuperAdmin, routeApproveRequest);

router.post('/:requestId/reject', isSuperAdmin, routeRejectRequest);

export default router;
