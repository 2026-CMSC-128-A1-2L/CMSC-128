import { Router } from 'express';
import { isVerifiedCheck } from '../../middleware.js';
import { routeGetProfile } from './profile.controller.js';

const router = Router();

// ============================================================================
// GET /api/profiles/:userId
//
// Retrieves the public profile of a manager or a landlord.
// ============================================================================
router.get('/:userId', isVerifiedCheck, routeGetProfile);

export default router;
