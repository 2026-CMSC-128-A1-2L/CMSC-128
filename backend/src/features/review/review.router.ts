import { Router } from 'express';
import { listingViewFilter, selfFilter } from '../../middleware';
import { routeGetReviews, routeUpdateReview, routeDeleteReview } from './review.controller';

const router = Router();

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
router.get('/', listingViewFilter, routeGetReviews);
// PATCH /api/reviews/:reviewId
router.patch('/:reviewId', selfFilter(false), routeUpdateReview);
// DELETE /api/reviews/:reviewId
router.delete('/:reviewId', selfFilter(false), routeDeleteReview);

export default router;
