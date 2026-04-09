import { RequestHandler } from 'express';
import { ObjectIdSchema } from './schema/common.js';
import { getReviews, getListingReviews, getFacilityReviews, createReview, deleteReview, updateReview } from '../services/review.js';
import { CreateReviewBodySchema, UpdateReviewBodySchema } from './schema/review.js';

export const routeCreateReview: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);

  const params = CreateReviewBodySchema.parse(req.body);

  const createdReview = await createReview(listingId, params, res.locals.filters ?? {});

  res.status(201).json({ data: createdReview });
};

export const routeGetReviews: RequestHandler = async (req, res, next) => {
  const reviews = await getReviews(
    res.locals.filters ?? {},
  );

  res.status(200).json({
    data: reviews,
  });
};

export const routeGetListingReviews: RequestHandler = async (req, res, next) => {
  const rawListingID = req.params.listingId;

  const listingID = ObjectIdSchema.parse(rawListingID);

  const reviews = await getListingReviews(
    listingID,
    res.locals.filters ?? {},
  );

  res.status(200).json({
    data: reviews,
  });
};

export const routeGetFacilityReviews: RequestHandler = async (req, res, next) => {
  const facilityID = ObjectIdSchema.parse(req.params.facilityId);

  const reviews = await getFacilityReviews(
    facilityID,
    res.locals.filters ?? {},
  );

  res.status(200).json({
    data: reviews,
  });
};

export const routeUpdateReview: RequestHandler = async (req, res, next) => { 
  const params = UpdateReviewBodySchema.parse(req.body);

  const updatedReview = await updateReview(params);

  res.status(200).json({ data: updatedReview });
};

export const routeDeleteReview: RequestHandler = async (req, res, next) => { 
  const reviewId = ObjectIdSchema.parse(req.params.reviewId);

  await deleteReview(reviewId);

  res.status(200).json({ message: 'Review deleted successfully.' });
};
