import mongoose from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { HousingFacility } from '../facility/facility.model';
import { Listing } from '../listing/listing.model';
import { Rental } from '../rental/rental.model';
import { Unit } from '../unit/unit.model';
import { Review } from './review.model';

export const createReview = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
  rating: number,
  description?: string,
) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }

  const hasEndedRental = await Rental.findOne({
    userId,
    unitId: { $in: await Unit.find({ listingId }).distinct('_id') },
    status: 'ended',
    actualMoveOutDate: { $exists: true },
  });

  if (!hasEndedRental) {
    throw new AppError(403, 'You can only review a listing after you have moved out.');
  }

  const review = new Review({ userId, listingId, rating, description });
  return await review.save();
};

export const getReviews = async (filters: any) => {
  const visibleListings = await Listing.find(filters).select('_id');

  const listingIds = visibleListings.map((listing) => listing._id);

  return await Review.find({
    listingId: { $in: listingIds },
  });
};

export const getListingReviews = async (listingId: mongoose.Types.ObjectId, filters: any) => {
  const listing = await Listing.findOne(combineFilters({ _id: listingId }, filters));

  if (!listing) {
    const listingNoFilter = await Listing.findById(listingId);

    if (listingNoFilter) {
      throw new AppError(403, 'Forbidden: Listing is private.');
    } else {
      throw new AppError(404, 'Listing not found.');
    }
  }

  return await Review.find({ listingId });
};

export const getFacilityReviews = async (facilityId: mongoose.Types.ObjectId, filters: any) => {
  const facility = await HousingFacility.findById(facilityId);

  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  const listings = await Listing.find(
    combineFilters(
      {
        facilityId: facilityId,
      },
      filters,
    ),
  ).select('_id');

  const listingIds = listings.map((listing) => listing._id);

  return await Review.find({
    listingId: { $in: listingIds },
  });
};
