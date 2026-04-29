import type mongoose from 'mongoose';
import { AppError } from "../../error.js";
import { combineFilters } from "../../middleware.js";
import { HousingFacility } from "../facility/facility.model.js";
import { Listing, ListingType } from "../listing/listing.model.js";
import { Rental } from "../rental/rental.model.js";
import { Unit } from "../unit/unit.model.js";
import { Review, ReviewType } from "./review.model.js";
import { QueryFilter } from 'mongoose';

type Ratings = {
  quality: number;
  comfort: number;
  environment: number;
};

export type CreateReviewArguments = {
  userId: mongoose.Types.ObjectId;
  ratings: Ratings;
  description?: string;
  mediaUrls?: string[];
};

export type UpdateReviewArguments = {
  reviewId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  ratings?: Ratings;
  description?: string;
};

export const createReview = async (
  listingId: mongoose.Types.ObjectId,
  data: CreateReviewArguments,
  filters: QueryFilter<ListingType>,
) => {
  const listing = await Listing.findOne(combineFilters({ _id: listingId }, filters));
  if (!listing) throw new AppError(404, 'Listing not found.');

  // Only active tenants of this listing may leave a review
  const unitIds = await Unit.find({ listingId }).distinct('_id');
  const activeRental = await Rental.findOne({
    userId: data.userId,
    unitId: { $in: unitIds },
    status: 'active',
  });
  if (!activeRental) throw new AppError(422, 'Only active tenants can leave a review.');

  // Must have stayed for at least 1 month
  const moveInDate = activeRental.actualMoveInDate;
  if (!moveInDate) throw new AppError(422, 'Move-in date has not been recorded yet.');
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  if (moveInDate > oneMonthAgo) {
    throw new AppError(422, 'You must have stayed for at least 1 month before leaving a review.');
  }

  // One review per user per listing
  const existing = await Review.findOne({ userId: data.userId, listingId });
  if (existing) throw new AppError(409, 'You have already reviewed this listing.');

  const media =
    data.mediaUrls?.map((url) => ({ sourceType: 'external' as const, value: url })) ?? [];

  const newReview = new Review({
    userId: data.userId,
    listingId,
    facilityId: listing.facilityId,
    ratings: data.ratings,
    description: data.description,
    media,
  });

  return await newReview.save();
};

export const getReviews = async (filters: QueryFilter<ListingType>) => {
  const visibleListings = await Listing.find(filters).distinct('_id');
  return await Review.find({ listingId: { $in: visibleListings } });
};

export const getListingReviews = async (
  listingId: mongoose.Types.ObjectId,
  filters: QueryFilter<ListingType>,
) => {
  const listing = await Listing.findOne(combineFilters({ _id: listingId }, filters));
  if (!listing) throw new AppError(404, 'Listing not found.');
  return await Review.find({ listingId });
};

export const getFacilityReviews = async (facilityId: mongoose.Types.ObjectId) => {
  const facility = await HousingFacility.findById(facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');
  return await Review.find({ facilityId });
};

const addReviewFromAverage = async (review: ReviewType) => {
  const { facilityId, ratings } = review;
  const { quality, comfort, environment } = ratings;

  const facility = await HousingFacility.findById(facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');
  const { qualityAvg, comfortAvg, environmentAvg, reviewCount } = facility;

  facility.qualityAvg = (qualityAvg * reviewCount + quality) / (reviewCount + 1);
  facility.comfortAvg = (comfortAvg * reviewCount + comfort) / (reviewCount + 1);
  facility.environmentAvg = (environmentAvg * reviewCount + environment) / (reviewCount + 1);
  facility.reviewCount += 1;

  await facility.save();
};

const removeReviewFromAverage = async (review: ReviewType) => {
  const { facilityId, ratings } = review;
  const { quality, comfort, environment } = ratings;

  const facility = await HousingFacility.findById(facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');
  const { qualityAvg, comfortAvg, environmentAvg, reviewCount } = facility;

  if (reviewCount <= 1) {
    facility.qualityAvg = 0;
    facility.comfortAvg = 0;
    facility.environmentAvg = 0;
    facility.reviewCount = 0;
  } else {
    facility.qualityAvg = (qualityAvg * reviewCount - quality) / (reviewCount - 1);
    facility.comfortAvg = (comfortAvg * reviewCount - comfort) / (reviewCount - 1);
    facility.environmentAvg = (environmentAvg * reviewCount - environment) / (reviewCount - 1);
    facility.reviewCount -= 1;
  }

  await facility.save();
};

export const updateReview = async (data: UpdateReviewArguments) => {
  const review = await Review.findOne({ _id: data.reviewId, userId: data.userId });
  if (!review) throw new AppError(404, 'Review not found.');

  // NOTE: if pre is approved, post is pending, so it should be removed from the average.
  if (review.status === 'approved') await removeReviewFromAverage(review as ReviewType);

  review.set({ ratings: data.ratings, description: data.description, status: 'pending' });
  return await review.save();
};

export const updateReviewStatus = async (
  reviewId: mongoose.Types.ObjectId,
  status: 'rejected' | 'approved',
) => {
  const review = await Review.findOneAndUpdate(
    { _id: reviewId },
    { $set: { status } },
    { returnDocument: 'after' },
  );
  if (!review) throw new AppError(404, 'Review not found.');

  // NOTE: no previous check is done because it is assumed that it came from pending
  if (status === 'approved') await addReviewFromAverage(review as ReviewType);

  return review;
};

export const deleteReview = async (
  reviewId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  const review = await Review.findOne({ _id: reviewId, userId });
  if (!review) throw new AppError(404, 'Review not found.');

  if (review.status === 'approved') await removeReviewFromAverage(review as ReviewType);

  return await review.deleteOne();
};

// Computes the average quality, comfort, and environment ratings
// for all reviews belonging to a specific facility (building),
// across all listings and all users within that facility.
// Also computes an overall average across all three categories.
// Returns null if the facility has no reviews yet.
export const getAverageRatingsByFacility = async (facilityId: mongoose.Types.ObjectId) => {
  const facility = await HousingFacility.findById(facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');

  const result = await Review.aggregate([
    { $match: { facilityId, status: 'approved' } },
    {
      $group: {
        _id: null,
        quality: { $avg: '$ratings.quality' },
        comfort: { $avg: '$ratings.comfort' },
        environment: { $avg: '$ratings.environment' },
        total: { $sum: 1 },
      },
    },
  ]);

  if (result.length === 0) return null;

  const { quality, comfort, environment, total } = result[0];
  const overall = (quality + comfort + environment) / 3;
  return { quality, comfort, environment, overall, total };
};
