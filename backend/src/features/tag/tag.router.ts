import { Router } from 'express';
import { isSuperAdmin } from '../../middleware.js';
import {
  routeGetTags,
  routeCreateTag,
  routeUpdateTag,
  routeDeleteTag,
  routeEnrichTags,
} from './tag.controller.js';

const router = Router();

// GET /api/tags
// Input:
// - None
//
// Output:
// - Array of Tag objects
//
// Considerations:
// - Returns all tag definitions (used for UI + validation)
// - Includes datatype rules (enum, numeric, boolean)
router.get('/', routeGetTags);

// POST /api/tags
// Input:
// - name (string)
// - displayName (string)
// - dataType (enum | numeric | boolean)
//
// Output:
// - Created Tag object
//
// Considerations:
// - Name must be unique
// - dataType must match schema (e.g., enum requires values)
// - Numeric must respect min/max if provided
router.post('/', isSuperAdmin, routeCreateTag);

// POST /api/tags/enrich
//
// Input:
// - Body: { [tagName]: value } — a listing's raw tags map
//
// Output:
// - Array of { name, displayName, dataType, value } for each recognized tag
//
// Must be declared before /:tagName to avoid route param collision.
// Any authenticated user — intended to be called after fetching a listing.
router.post('/enrich', routeEnrichTags);

// PATCH /api/tags/:tagName
//
// Input:
// - tagName
// - Optional fields to update (name, displayName, dataType)
//
// Output:
// - Updated Tag object
//
// Considerations:
// - Only provided fields are updated
// - Must maintain valid dataType constraints
// - Changing type may affect existing listings
router.patch('/:tagName', isSuperAdmin, routeUpdateTag);

// DELETE /api/tags/:tagName
// Input:
// - tagName
//
// Output:
// - Success message or deleted Tag
//
// Considerations:
// - Tag must exist
// - May affect listings using this tag (ensure safe deletion policy)
router.delete('/:tagName', isSuperAdmin, routeDeleteTag);

export default router;
