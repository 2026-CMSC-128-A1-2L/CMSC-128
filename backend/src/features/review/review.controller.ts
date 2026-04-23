import type { RequestHandler } from 'express';
import { CreateReviewBodySchema, ObjectIdSchema, UpdateReviewBodySchema } from 'shared';
import {
  getReviews,
  getListingReviews,
  getFacilityReviews,
  createReview,
  deleteReview,
  updateReview,
} from './review.service';

export const routeCreateReview: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const params = CreateReviewBodySchema.parse(req.body);
  const createdReview = await createReview(listingId, params, res.locals.filters ?? {});

  res.status(201).json({ data: createdReview });
};

export const routeGetReviews: RequestHandler = async (req, res, next) => {
  const reviews = await getReviews(res.locals.filters ?? {});

  res.status(200).json({
    data: reviews,
  });
};

export const routeGetListingReviews: RequestHandler = async (req, res, next) => {
  const rawListingID = req.params.listingId;

  const listingID = ObjectIdSchema.parse(rawListingID);

  const reviews = await getListingReviews(listingID, res.locals.filters ?? {});

  res.status(200).json({
    data: reviews,
  });
};

export const routeGetFacilityReviews: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);

  const reviews = await getFacilityReviews(facilityId);

  res.status(200).json({
    data: reviews,
  });
};

export const routeUpdateReview: RequestHandler = async (req, res, next) => {
  const params = UpdateReviewBodySchema.parse(req.body);
  const userId = ObjectIdSchema.parse(req.user!._id);

  const updatedReview = await updateReview({ ...params, userId });

  res.status(200).json({ data: updatedReview });
};

export const routeDeleteReview: RequestHandler = async (req, res, next) => {
  const reviewId = ObjectIdSchema.parse(req.params.reviewId);
  const userId = ObjectIdSchema.parse(req.user!._id);

  await deleteReview(reviewId, userId);

  res.status(200).json({ message: 'Review deleted successfully.' });
};
