import { Router } from 'express';
import { listingViewFilter, selfFilter } from '../../middleware';
import { routeGetReviews, routeUpdateReview, routeDeleteReview } from './review.controller';

const router = Router();

// Reviews
// GET /api/reviews
router.get('/reviews', listingViewFilter, routeGetReviews);
// PATCH /api/reviews/:reviewId
router.patch('/reviews/:reviewId', selfFilter(false), routeUpdateReview);
// DELETE /api/reviews/:reviewId
router.delete('/reviews/:reviewId', selfFilter(false), routeDeleteReview);

export default router;
