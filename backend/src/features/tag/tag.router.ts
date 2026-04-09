import { Router } from 'express';
import { isSuperAdmin } from '../../middleware';
import { routeGetTags, routeCreateTag, routeUpdateTag, routeDeleteTag } from './tag.controller';

const router = Router();

// GET /api/tags
//
// used for search, no restrictions
router.get('/', routeGetTags);

// POST /api/tags
//
// admin only
router.post('/', isSuperAdmin, routeCreateTag);

// PATCH /api/tags/:tagName
//
// admin only
router.patch('/:tagName', isSuperAdmin, routeUpdateTag);

// DELETE /api/tags/:tagName
//
// admin only
router.delete('/:tagName', isSuperAdmin, routeDeleteTag);

export default router;
