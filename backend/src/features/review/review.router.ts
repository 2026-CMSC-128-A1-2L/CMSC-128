import { Router } from 'express';
import { isSuperAdmin, listingViewFilter, selfFilter } from '../../middleware';
import {
  routeGetReviews,
  routeUpdateReview,
  routeDeleteReview,
  routeApproveReview,
  routeRejectReview,
} from './review.controller';

const router = Router();

// ============================================================================
// Reviews
// GET /api/reviews
// Input:
// - None (filters via middleware)
//
// Output:
// - Array of Review objects
//
// Considerations:
// - Applies listingViewFilter
// - Returns only reviews of visible listings
// - Prevents leaking private listing reviews
// ============================================================================
router.get('/', listingViewFilter, routeGetReviews);

// ============================================================================
// PATCH /api/reviews/:reviewId
//
// Edits a review. The review needs to be verified again.
// ============================================================================
router.patch('/:reviewId', selfFilter, routeUpdateReview);

// ============================================================================
// POST /api/reviews/:reviewId/approve
// ============================================================================
router.post('/:reviewId/approve', isSuperAdmin, routeApproveReview);

// ============================================================================
// POST /api/reviews/:reviewId/reject
// ============================================================================
router.post('/:reviewId/reject', isSuperAdmin, routeRejectReview);

// ============================================================================
// DELETE /api/reviews/:reviewId
//
// Deletes a review.
// ============================================================================
router.delete('/:reviewId', selfFilter, routeDeleteReview);

export default router;
