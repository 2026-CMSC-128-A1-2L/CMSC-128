import type mongoose from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { HousingFacility } from '../facility/facility.model';
import { Listing, ListingType } from '../listing/listing.model';
import { Review } from './review.model';
import { QueryFilter } from 'mongoose';

export type createReviewArguments = {
  userId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
  ratings: {
    quality: number;
    comfort: number;
    environment: number;
  };
  description?: string;
};

export type updateReviewArguments = {
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
  data: createReviewArguments,
  filters: QueryFilter<ListingType>,
) => {
  // TODO: add admin create review eligibility checks for approval:
  // check for minimum tenancy, if reviewer is flagged, etc.
  //
  // check done inside service instead of middleware due to complexity
  const listing = await Listing.findOne(combineFilters({ _id: listingId }, filters));

  if (!listing) throw new AppError(404, 'Listing not found.');

  const newReview = new Review({
    userId: data.userId,
    listingId,
    facilityId: listing.facilityId,
    ratings: data.ratings,
    description: data.description,
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

export const updateReview = async (data: updateReviewArguments) => {
  const review = await Review.findOne({ _id: data.reviewId, userId: data.userId });
  if (!review) throw new AppError(404, 'Review not found.');
  review.set({ ratings: data.ratings, description: data.description });
  return await review.save();
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
