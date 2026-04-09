import mongoose, { QueryFilter } from 'mongoose';
import { Listing } from '../models/housing/Listing.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { Review } from '../models/reviews/Review.js';
import { Tag } from '../models/housing/Tag.js';
import { ROOM_TYPES } from '../constants.js';
import assert from 'node:assert';

type TagFilter = {
  name: string;
  value:
  | { type: 'enum'; value: string }
  | { type: 'boolean'; value: boolean }
  | { type: 'numeric'; value: { min?: number; max?: number } };
};

// TODO: refactor for values to not require type
type TagValue = {
  name: string;
  value:
  | { type: 'enum'; value: string }
  | { type: 'boolean'; value: boolean }
  | { type: 'numeric'; value: number };
};

export type CreateListingArguments = {
  facilityId: mongoose.Types.ObjectId;
  tags?: TagValue[];

  roomType: (typeof ROOM_TYPES)[number];
  capacity: number;

  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  description: string;
  mediaUrls?: string[]; // Optional
};

// Parameters for filtering listings
export type GetListingArguments = {
  facilityId: mongoose.Types.ObjectId;
  tags: TagFilter[];
  capacity: { min?: number; max?: number };
  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
};

type TagSpec =
  | {
    name: 'enum';
    values: string[];
  }
  | {
    name: 'numeric';
    min: number;
    max: number;
  }
  | {
    name: 'boolean';
    value: boolean;
  };

const verifyTags = async (tagList: TagValue[]) => {
  const tagMap = Object.fromEntries(tagList.map((tag) => [tag.name, tag.value]));
  const namesToFind = tagList.map((tag) => tag.name);
  const tags = await Tag.find({ name: { $in: namesToFind } });
  return tags
    .map((tag) => {
      if (tag.dataType.name != tagMap[tag.name].type) {
        return { error: 'Incorrect tag data type' };
      }

      const value = tagMap[tag.name].value;

      const tagDoc = tag.dataType as unknown as TagSpec;

      if (tagDoc.name == 'enum') {
        assert(typeof value === 'string');
        if (!tagDoc.values.includes(value)) {
          return { error: `Invalid value '${value}' for tag '${tag.name}'` };
        }
      } else if (tagDoc.name == 'numeric') {
        assert(typeof value === 'number');
        if (tagDoc.min && tagDoc.min > value) {
          return {
            error: `Invalid value '${value}' for tag '${tag.name}', minimum is set at ${tagDoc.min}`,
          };
        }
        if (tagDoc.max && tagDoc.max < value) {
          return {
            error: `Invalid value '${value}' for tag '${tag.name}', maximum is set at ${tagDoc.max}`,
          };
        }
      }
      // no checks for boolean, zod already validated it in the controller
    })
    .filter((x) => x);
};

export const createListing = async (data: CreateListingArguments, filters: any) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: data.facilityId }));
  if (!facility) {
    const facilityNoFilter = await HousingFacility.findById(data.facilityId);
    if (facilityNoFilter) {
      throw new AppError(403, 'You are not allowed to create a listing for this facility.');
    } else {
      throw new AppError(404, 'Facility not found.');
    }
  }

  if (data.tags) {
    const errorList = await verifyTags(data.tags);

    if (errorList) {
      throw new AppError(400, 'Invalid tags', errorList);
    }
  }

  // There can be a race condition here.
  const newListing = new Listing({
    landlordId: facility.landlord,
    managers: facility.managers ?? [],
    facilityId: data.facilityId,
    tags: data.tags ?? [], // returns empty array if no tags are given

    roomType: data.roomType,
    capacity: data.capacity,

    isPrivate: data.isPrivate,
    allowVisit: data.allowVisit,
    allowTransfer: data.allowTransfer,

    description: data.description,
    mediaUrls: data.mediaUrls ?? [],
  });
  return await newListing.save();
};

export function buildListingQuery(args: Partial<GetListingArguments>): QueryFilter<typeof Listing> {
  const query: QueryFilter<typeof Listing> = {};

  if (args.isPrivate) {
    query.isPrivate = args.isPrivate;
  }
  if (args.allowVisit) {
    query.allowVisit = args.allowVisit;
  }
  if (args.allowTransfer) {
    query.allowTransfer = args.allowTransfer;
  }
  if (args.facilityId) {
    query.facilityId = args.facilityId;
  }

  if (args.capacity) {
    query.capacity = { $gte: args.capacity.min };
    if (args.capacity.max !== undefined) {
      query.capacity.$lte = args.capacity.max;
    }
  }

  if (args.tags && args.tags.length > 0) {
    query.tags = {
      $all: args.tags.map((tag) => {
        const matchObj: any = { name: tag.name };

        if (tag.value.type === 'enum' || tag.value.type === 'boolean') {
          matchObj.value = tag.value.value;
        } else if (tag.value.type === 'numeric') {
          matchObj.value = { $gte: tag.value.value.min };
          if (tag.value.value.max !== undefined) {
            matchObj.value.$lte = tag.value.value.max;
          }
        }

        return { $elemMatch: matchObj };
      }),
    };
  }

  return query;
}

export const getListings = async (query: Partial<GetListingArguments>, filters: any) => {
  const dbFilters = buildListingQuery(query);
  return await Listing.find(combineFilters(filters, dbFilters)); //returns listings
};

export const getListingById = async (
  id: mongoose.Types.ObjectId,
  filters: QueryFilter<typeof Listing>,
) => {
  return await Listing.findById(combineFilters(filters, { _id: id }));
};

// export const getListingReviewsById = async (listingId: mongoose.Types.ObjectId) => {
//   const listing = await Listing.findById(listingId);
//   if (!listing) {
//     throw new AppError(404, 'Listing not found.');
//   }

//   return await Review.find({ ListingId: listingId });
// };

export type UpdateListingArguments = {
  tags?: TagValue[];
  roomType?: string;
  capacity?: number;
  isPrivate?: boolean;
  allowVisit?: boolean;
  allowTransfer?: boolean;
  description?: string;
  mediaUrls?: string[];
  units?: string[];
};

export const updateListing = async (
  listingId: mongoose.Types.ObjectId,
  data: UpdateListingArguments,
  filters: any,
) => {
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingId }));
  if (!listing) {
    const listingNoFilter = await Listing.findById(listingId);
    if (listingNoFilter) {
      throw new AppError(403, 'Forbidden: You are not the owner of this listing.');
    } else {
      throw new AppError(404, 'Listing not found.');
    }
  }

  listing.set(data);

  return await listing.save();
};

export const deleteListing = async (listingId: mongoose.Types.ObjectId, filters: any) => {
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingId }));
  if (!listing) {
    const listingNoFilter = await Listing.findById(listingId);
    if (listingNoFilter) {
      throw new AppError(403, 'Forbidden: You are not the owner of this listing.');
    } else {
      throw new AppError(404, 'Listing not found.');
    }
  }

  return await listing.deleteOne();
};

export const getListingsByFacility = async (facilityId: mongoose.Types.ObjectId, filters: any) => {
  const facility = await HousingFacility.findById(facilityId);
  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  const listings = await Listing.find(combineFilters(filters, { facilityId: facilityId }));

  return listings;
};

export type UpdateListingTagsArguments = {
  tags: TagValue[];
};

export const updateListingTags = async (
  listingID: mongoose.Types.ObjectId,
  data: UpdateListingTagsArguments,
  filters: any,
) => {
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingID }));
  if (!listing) {
    const listingNoFilter = await Listing.findById(listingID);
    if (listingNoFilter) {
      throw new AppError(403, 'Forbidden: You are not the owner of this listing.');
    } else {
      throw new AppError(404, 'Listing not found.');
    }
  }

  const errorList = await verifyTags(data.tags);
  if (errorList.length > 0) {
    throw new AppError(400, 'Invalid tags', errorList);
  }

  listing.set({ tags: data.tags });
  return await listing.save();
};
