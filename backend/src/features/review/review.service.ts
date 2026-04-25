import type mongoose from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { HousingFacility } from '../facility/facility.model';
import { Listing, ListingType } from '../listing/listing.model';
import { Rental } from '../rental/rental.model';
import { Unit } from '../unit/unit.model';
import { Review } from './review.model';
import { QueryFilter } from 'mongoose';

export type CreateReviewArguments = {
  userId: mongoose.Types.ObjectId;
  ratings: {
    quality: number;
    comfort: number;
    environment: number;
  };
  description?: string;
  mediaUrls?: string[];
};

export type UpdateReviewArguments = {
  reviewId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  ratings?: {
    quality: number;
    comfort: number;
    environment: number;
  };
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

export const updateReview = async (data: UpdateReviewArguments) => {
  const review = await Review.findOne({ _id: data.reviewId, userId: data.userId });
  if (!review) throw new AppError(404, 'Review not found.');
  review.set({ ratings: data.ratings, description: data.description });
  return await review.save();
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
    { $match: { facilityId } },
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

export const deleteReview = async (
  reviewId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  const review = await Review.findOne({ _id: reviewId, userId });

  if (!review) {
    throw new AppError(404, 'Review not found.');
  }

  return await review.deleteOne();
};
