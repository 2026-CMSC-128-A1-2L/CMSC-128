import mongoose from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { HousingFacility } from '../facility/facility.model';
import { Listing } from '../listing/listing.model';
import { Review } from './review.model';

// export const createReview = async (
//   userId: mongoose.Types.ObjectId,
//   listingId: mongoose.Types.ObjectId,
//   rating: number,
//   description?: string,
// ) => {
//   const listing = await Listing.findById(listingId);
//   if (!listing) {
//     throw new AppError(404, 'Listing not found.');
//   }
//
//   const hasEndedRental = await Rental.findOne({
//     userId,
//     unitId: { $in: await Unit.find({ listingId }).distinct('_id') },
//     status: 'ended',
//     actualMoveOutDate: { $exists: true },
//   });
//
//   if (!hasEndedRental) {
//     throw new AppError(403, 'You can only review a listing after you have moved out.');
//   }
//
//   const review = new Review({ userId, listingId, rating, description });
//   return await review.save();
// };
//
// export const getReviews = async (filters: any) => {
//   const visibleListings = await Listing.find(filters).select('_id');
//
//   const listingIds = visibleListings.map((listing) => listing._id);
//
//   return await Review.find({
//     listingId: { $in: listingIds },
//   });
// };
//
// export const getListingReviews = async (listingId: mongoose.Types.ObjectId, filters: any) => {
//   const listing = await Listing.findOne(combineFilters({ _id: listingId }, filters));
//
//   if (!listing) {
//     const listingNoFilter = await Listing.findById(listingId);
//
//     if (listingNoFilter) {
//       throw new AppError(403, 'Forbidden: Listing is private.');
//     } else {
//       throw new AppError(404, 'Listing not found.');
//     }
//   }
//
//   return await Review.find({ listingId });
// };
//
// export const getFacilityReviews = async (facilityId: mongoose.Types.ObjectId, filters: any) => {
//   const facility = await HousingFacility.findById(facilityId);
//
//   if (!facility) {
//     throw new AppError(404, 'Facility not found.');
//   }
//
//   const listings = await Listing.find(
//     combineFilters(
//       {
//         facilityId: facilityId,
//       },
//       filters,
//     ),
//   ).select('_id');
//
//   const listingIds = listings.map((listing) => listing._id);
//
//   return await Review.find({
//     listingId: { $in: listingIds },
//   });
// };




export type createReviewArguments = {
  studentId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId;
  rating: number;
  description?: String;
}

export type updateReviewArguments = {
  reviewId: mongoose.Types.ObjectId,
  rating?: number;
  description?: String;
}

export const createReview = async (
  listingId: mongoose.Types.ObjectId,
  data: createReviewArguments,
  filters: any,
) => {
  // TODO: add admin create review eligibility checks for approval:
  // check for minimum tenancy, if reviewer is flagged, etc.
  const listing = Listing.findOne(combineFilters({ _id: listingId }, filters));

  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }

  const newReview = new Review({
    studentId: data.studentId,
    listingId: data.listingId,
    rating: data.rating,
    description: data.description
  });

  await newReview.save();
};

export const getReviews = async (filters: any) => {
  const visibleListings = await Listing.find(filters).select('_id');

  const listingIDs = visibleListings.map((listing) => listing._id);

  return await Review.find({
    listingID: { $in: listingIDs },
  });
};

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

export const getFacilityReviews = async (
  facilityID: mongoose.Types.ObjectId,
  filters: any,
) => {
  const facility = await HousingFacility.findById(facilityID);

  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  const listings = await Listing.find(
    combineFilters(
      {
        housingID: facilityID,
      },
      filters,
    ),
  ).select('_id');

  const listingIDs = listings.map((listing) => listing._id);

  return await Review.find({
    listingID: { $in: listingIDs },
  });
};

export const updateReview = async (data: updateReviewArguments) => {
  const review = await Review.findById(data.reviewId);
  if (!review) {
    throw new AppError(404, 'Review not found.');
  };

  review.set(data);

  return await review.save();
};

export const deleteReview = async (reviewId: mongoose.Types.ObjectId) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new AppError(404, 'Review not found.');
  }

  return await Review.findByIdAndDelete(reviewId);
};
