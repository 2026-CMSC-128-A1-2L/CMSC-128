import { Router } from 'express';
import { isVerifiedCheck } from '../../middleware';
import { routeGetProfile } from './profile.controller';

const router = Router();

// ============================================================================
// GET /api/profiles/:userId
//
// Retrieves the public profile of a manager or a landlord.
// ============================================================================
router.get('/:userId', isVerifiedCheck, routeGetProfile);

export default router;
