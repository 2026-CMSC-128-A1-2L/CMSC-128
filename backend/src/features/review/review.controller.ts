import type { RequestHandler } from 'express';
import { CreateReviewBodySchema, ObjectIdSchema, UpdateReviewBodySchema } from 'shared';
import { AppError } from '../../error.js';
import {
  getReviews,
  getListingReviews,
  getFacilityReviews,
  getAverageRatingsByFacility,
  createReview,
  deleteReview,
  updateReview,
  updateReviewStatus,
} from './review.service.js';
import assert from 'node:assert';

export const routeCreateReview: RequestHandler = async (req, res) => {
  if (!req.user) throw new AppError(401, 'Unauthenticated');
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const params = CreateReviewBodySchema.parse(req.body);
  const userId = req.user._id;
  const createdReview = await createReview(
    listingId,
    { ...params, userId },
    res.locals.filters ?? {},
  );

  res.status(201).json({ data: createdReview });
};

export const routeGetReviews: RequestHandler = async (req, res) => {
  const reviews = await getReviews(res.locals.filters ?? {});

  res.status(200).json({ data: reviews });
};

export const routeGetListingReviews: RequestHandler = async (req, res) => {
  const listingID = ObjectIdSchema.parse(req.params.listingId);
  const reviews = await getListingReviews(listingID, res.locals.filters ?? {});

  res.status(200).json({ data: reviews });
};

export const routeGetFacilityReviews: RequestHandler = async (req, res) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const reviews = await getFacilityReviews(facilityId);

  res.status(200).json({ data: reviews });
};

// GET /api/facilities/:facilityId/average-ratings
//
// Returns the average quality, comfort, environment, and overall ratings
// across all reviews for all listings within the given facility.
// Returns a message if no reviews exist yet.
export const routeGetAverageRatingsByFacility: RequestHandler = async (req, res) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const averages = await getAverageRatingsByFacility(facilityId);

  if (!averages) {
    res.status(200).json({ message: 'No reviews yet.' });
    return;
  }

  res.status(200).json({ data: averages });
};

export const routeUpdateReview: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const params = UpdateReviewBodySchema.parse(req.body);
  const userId = req.user._id;

  const updatedReview = await updateReview({ ...params, userId });

  res.status(200).json({ data: updatedReview });
};

export const routeApproveReview: RequestHandler = async (req, res) => {
  const requestId = ObjectIdSchema.parse(req.params.reviewId);
  const updatedReview = await updateReviewStatus(requestId, 'approved');
  res.status(200).json({ data: updatedReview });
};

export const routeRejectReview: RequestHandler = async (req, res) => {
  const requestId = ObjectIdSchema.parse(req.params.reviewId);
  const updatedReview = await updateReviewStatus(requestId, 'rejected');
  res.status(200).json({ data: updatedReview });
};

export const routeDeleteReview: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const reviewId = ObjectIdSchema.parse(req.params.reviewId);
  const userId = req.user._id;

  await deleteReview(reviewId, userId);

  res.status(200).json({ message: 'Review deleted successfully.' });
};
