import mongoose, { QueryFilter } from 'mongoose';
import { Listing } from '../models/housing/Listing.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { Review } from '../models/reviews/Review.js';

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
  housingID: mongoose.Types.ObjectId;
  tags?: TagValue[];

  roomType: string;
  capacity: number;

  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  description: string;
  mediaUrls?: string[]; // Optional
};

// Parameters for filtering listings
export type GetListingArguments = {
  housingID: mongoose.Types.ObjectId;
  tags: TagFilter[];
  capacity: { min?: number; max?: number };
  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
};

export const createListing = async (data: CreateListingArguments, filters: any) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: data.housingID }));
  if (!facility) {
    const facilityNoFilter = await HousingFacility.findById(data.housingID);
    if (facilityNoFilter) {
      throw new AppError(403, 'You are not allowed to create a listing for this facility.');
    } else {
      throw new AppError(404, 'Facility not found.');
    }
  }

  // There can be a race condition here.
  const newListing = new Listing({
    landlordID: facility.landlordID,
    managerID: facility.managerID,
    housingID: data.housingID,
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
  if (args.housingID) {
    query.housingID = args.housingID;
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

export const getListings = async (filters: Partial<GetListingArguments>) => {
  const query = buildListingQuery(filters);
  return await Listing.find(query); //returns listings
};

export const getListingById = async (
  id: mongoose.Types.ObjectId,
  filters: QueryFilter<typeof Listing>,
) => {
  return await Listing.findById(combineFilters(filters, { _id: id }));
};

export const getListingReviewsById = async (listingID: mongoose.Types.ObjectId) => {
  const listing = await Listing.findById(listingID);
  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }

  return await Review.find({ ListingID: listingID });
};

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
  listingID: mongoose.Types.ObjectId,
  data: UpdateListingArguments,
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

  listing.set(data);

  return await listing.save();
};

export const deleteListing = async (listingID: mongoose.Types.ObjectId, filters: any) => {
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingID }));
  if (!listing) {
    const listingNoFilter = await Listing.findById(listingID);
    if (listingNoFilter) {
      throw new AppError(403, 'Forbidden: You are not the owner of this listing.');
    } else {
      throw new AppError(404, 'Listing not found.');
    }
  }

  return await listing.deleteOne();
};

