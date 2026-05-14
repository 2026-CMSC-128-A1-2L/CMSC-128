import type mongoose from 'mongoose';
import { Bookmark } from './bookmark.model.js';

export const createBookmark = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
) => {
  return await Bookmark.findOneAndUpdate(
    { userId, listingId },
    { $setOnInsert: { userId, listingId } },
    { upsert: true, returnDocument: 'after' },
  );
};

export const deleteBookmark = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
) => {
  return await Bookmark.deleteOne({ listingId: listingId, userId: userId });
};

// Sort field mapping: query param -> aggregation field
const SORT_FIELD_MAP: Record<string, string> = {
  date: 'bookmarkCreated',
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
    {
      $lookup: {
        from: 'reviews',
        let: { facilityId: '$facility._id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$facilityId', '$$facilityId'] },
              status: 'approved',
            },
          },
          {
            $project: {
              rating: {
                $avg: ['$ratings.quality', '$ratings.comfort', '$ratings.environment'],
              },
            },
          },
        ],
        as: 'reviews',
      },
    },
    {
      $addFields: {
        availableUnitCount: {
          $size: {
            $filter: {
              input: '$units',
              as: 'unit',
              cond: { $eq: ['$$unit.isAvailable', true] },
            },
          },
        },
        unitCount: { $size: '$units' },
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
        facilityId: '$facility._id',

        // Facility info
        facilityName: { $ifNull: ['$facility.name', null] },
        facilityLoc: { $ifNull: ['$facility.location.text', null] },

        // Average of the three review categories
        facilityRating: {
          $cond: [
            { $gt: [{ $size: '$reviews' }, 0] },
            { $round: [{ $avg: '$reviews.rating' }, 1] },
            null,
          ],
        },

        // Minimum unit price for this listing
        minPrice: {
          $cond: [{ $gt: [{ $size: '$units' }, 0] }, { $min: '$units.price' }, null],
        },

        // Listing details
        roomType: '$listing.roomType',
        roomLabel: { $ifNull: ['$listing.tags.roomLabel', '$listing.roomType'] },
        listingDescription: '$listing.description',
        capacity: '$listing.capacity',
        media: {
          $cond: [
            { $gt: [{ $size: { $ifNull: ['$listing.media', []] } }, 0] },
            '$listing.media',
            '$facility.media',
          ],
        },
        unitCount: '$unitCount',
        availableUnitCount: '$availableUnitCount',

        // TODO: Derive currentListingStatus from unit availability and active transfers
        // For now, returns null. When implemented, should be one of:
        // 'occupied' | 'pa-move out na' | 'open' | 'pasalo'
        currentListingStatus: {
          $cond: [{ $gt: ['$availableUnitCount', 0] }, 'open', 'occupied'],
        },
      },
    },

    // 7. Sort
    { $sort: { [sortField]: sortOrder } },
  ]);
};
