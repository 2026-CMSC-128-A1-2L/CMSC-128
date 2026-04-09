import { Router } from 'express';
import { isSuperAdmin } from '../../middleware';
import { routeGetTags, routeCreateTag, routeUpdateTag, routeDeleteTag } from './tag.controller';

const router = Router();

// GET /api/tags
//
// used for search, no restrictions
router.get('/tags', routeGetTags);

// POST /api/tags
//
// admin only
router.post('/tags', isSuperAdmin, routeCreateTag);

// PATCH /api/tags/:tagName
//
// admin only
router.patch('/tags/:tagName', isSuperAdmin, routeUpdateTag);

// DELETE /api/tags/:tagName
//
// admin only
router.delete('/tags/:tagName', isSuperAdmin, routeDeleteTag);

export default router;
