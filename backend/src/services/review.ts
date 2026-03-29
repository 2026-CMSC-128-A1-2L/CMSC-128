import mongoose from 'mongoose';
import { Review } from '../models/reviews/Review.js';
import { Listing } from '../models/housing/Listing.js';
import { AppError } from '../controllers/error.js';
import { combineFilters } from '../controllers/middleware.js';

export const getReviews = async () => {
  return await Review.find();
}

export const getListingReviews = async (
  listingID: mongoose.Types.ObjectId,
  filters: any,
) => {
  const listing = await Listing.findOne(
    combineFilters({ _id: listingID }, filters),
  );

  if (!listing) {
    const listingNoFilter = await Listing.findById(listingID);

    if (listingNoFilter) {
      throw new AppError(403, 'Forbidden: Listing is private.');
    } else {
      throw new AppError(404, 'Listing not found.');
    }
  }

  return await Review.find({ listingID });
};