import mongoose from 'mongoose';
import { Review } from '../models/reviews/Review.js';
import { Listing } from '../models/housing/Listing.js';
import { AppError } from '../controllers/error.js';
import { combineFilters } from '../controllers/middleware.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';

export const getReviews = async (filters: any) => {
  const visibleListings = await Listing.find(filters).select('_id');

  const listingIds = visibleListings.map((listing) => listing._id);

  return await Review.find({
    listingId: { $in: listingIds },
  });
};

export const getListingReviews = async (
  listingId: mongoose.Types.ObjectId,
  filters: any,
) => {
  const listing = await Listing.findOne(
    combineFilters({ _id: listingId }, filters),
  );

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

export const getFacilityReviews = async (
  facilityId: mongoose.Types.ObjectId,
  filters: any,
) => {
  const facility = await HousingFacility.findById(facilityId);

  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  const listings = await Listing.find(
    combineFilters(
      {
        housingId: facilityId,
      },
      filters,
    ),
  ).select('_id');

  const listingIds = listings.map((listing) => listing._id);

  return await Review.find({
    listingId: { $in: listingIds },
  });
};