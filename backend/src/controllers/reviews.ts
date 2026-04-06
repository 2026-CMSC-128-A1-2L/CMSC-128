import { RequestHandler } from 'express';
import { ObjectIdSchema } from './schema/common.js';
import {
  getReviews,
  getListingReviews,
  getFacilityReviews,
  createReview,
} from '../services/review.js';
import { CreateReviewBodySchema } from './schema/review.js';

export const routeGetReviews: RequestHandler = async (req, res, next) => {
  const reviews = await getReviews(res.locals.filters ?? {});

  res.status(200).json({
    data: reviews,
  });
};

export const routeCreateReview: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = CreateReviewBodySchema.parse(req.body);

  const review = await createReview(userId, params.listingId, params.rating, params.description);

  res.status(201).json({ id: review._id });
};

export const routeUpdateReview: RequestHandler = async (req, res, next) => {};
export const routeDeleteReview: RequestHandler = async (req, res, next) => {};
export const routeGetListingReviews: RequestHandler = async (req, res, next) => {
  const rawListingID = req.params.listingId;

  const listingID = ObjectIdSchema.parse(rawListingID);

  const reviews = await getListingReviews(listingID, res.locals.filters ?? {});

  res.status(200).json({
    data: reviews,
  });
};

export const routeGetFacilityReviews: RequestHandler = async (req, res, next) => {
  const facilityID = ObjectIdSchema.parse(req.params.facilityId);

  const reviews = await getFacilityReviews(facilityID, res.locals.filters ?? {});

  res.status(200).json({
    data: reviews,
  });
};
