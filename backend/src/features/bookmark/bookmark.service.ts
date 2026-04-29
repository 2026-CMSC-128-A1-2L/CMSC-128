import type mongoose from 'mongoose';
import { Bookmark } from "./bookmark.model.js";

export const createBookmark = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
) => {
  const newBookmark = new Bookmark({ userId: userId, listingId: listingId });
  return await newBookmark.save();
};

export const deleteBookmark = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
) => {
  return await Bookmark.deleteOne({ listingId: listingId, userId: userId });
};

// Sort field mapping: query param -> aggregation field
const SORT_FIELD_MAP: Record<string, string> = {
  date: 'createdAt',
  name: 'facilityName',
  price: 'minPrice',
};

export const getBookmarksByUser = async (
  userId: mongoose.Types.ObjectId,
  sortBy: string = 'date',
  order: string = 'desc',
) => {
  const sortField = SORT_FIELD_MAP[sortBy] || 'createdAt';
  const sortOrder = order === 'asc' ? 1 : -1;

  return await Bookmark.aggregate([
    // 1. Get this user's bookmarks
    { $match: { userId: userId } },

    // 2. Join with listings to get listing data
    {
      $lookup: {
        from: 'listings',
        localField: 'listingId',
        foreignField: '_id',
        as: 'listing',
      },
    },
    { $unwind: { path: '$listing', preserveNullAndEmptyArrays: true } },

    // 3. Join with facilities to get facility name, location, and rating
    {
      $lookup: {
        from: 'housingfacilities',
        localField: 'listing.facilityId',
        foreignField: '_id',
        as: 'facility',
      },
    },
    { $unwind: { path: '$facility', preserveNullAndEmptyArrays: true } },

    // 4. Get min price from units for this listing
    {
      $lookup: {
        from: 'units',
        localField: 'listingId',
        foreignField: 'listingId',
        as: 'units',
      },
    },

    // 6. Shape the response to match the reference schema
    {
      $project: {
        _id: 0,
        bookmarkId: '$_id',
        bookmarkCreated: '$createdAt',
        userId: '$userId',
        listingId: '$listingId',

        // Facility info
        facilityName: { $ifNull: ['$facility.name', null] },
        facilityLoc: { $ifNull: ['$facility.location.text', null] },

        // Average of the three review categories
        facilityRating: {
          $cond: {
            if: { $gt: [{ $ifNull: ['$facility.reviewCount', 0] }, 0] },
            then: {
              $round: [
                {
                  $avg: [
                    '$facility.qualityAvg',
                    '$facility.comfortAvg',
                    '$facility.environmentAvg',
                  ],
                },
                1,
              ],
            },
            else: null,
          },
        },

        // Minimum unit price for this listing
        minPrice: {
          $cond: {
            if: { $gt: [{ $size: '$units' }, 0] },
            then: { $min: '$units.price' },
            else: null,
          },
        },

        // Listing details
        roomType: '$listing.roomType',
        capacity: '$listing.capacity',
        media: '$listing.media',

        // TODO: Derive currentListingStatus from unit availability and active transfers
        // For now, returns null. When implemented, should be one of:
        // 'occupied' | 'pa-move out na' | 'open' | 'pasalo'
        currentListingStatus: { $literal: null },
      },
    },

    // 7. Sort
    { $sort: { [sortField]: sortOrder } },
  ]);
};
