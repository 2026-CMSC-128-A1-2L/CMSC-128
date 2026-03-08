import mongoose, { QueryFilter } from 'mongoose';
import { Listing } from '../models/housing/Listing.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';

export type CreateListingArguments = {
  housingID: mongoose.Types.ObjectId;
  tags?: string[]; // Tags are optional (note please add type to tag in listing schema)

  roomType: string;
  capacity: number;

  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  description: string;
  mediaUrls?: string[]; // Optional
  units: string[];
};

type TagValue = {
  name: string;
  value:
    | { type: 'enum'; value: string }
    | { type: 'boolean'; value: boolean }
    | { type: 'number'; value: { min?: number; max?: number } };
};

// Parameters for filtering listings
export type GetListingArguments = {
  housingID?: mongoose.Types.ObjectId;
  tags?: TagValue[];
  capacity: { min: number; max?: number };
  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
};

export const createListing = async (data: CreateListingArguments, filters: any) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: data.housingID }));
  if (!facility) {
    // This can also be a 403, see `updateFacility` in ./facility.ts
    throw new AppError(404, 'Facility not found.');
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
    units: data.units,
  });
  return await newListing.save();
};

export function buildListingQuery(args: GetListingArguments): QueryFilter<typeof Listing> {
  const query: QueryFilter<typeof Listing> = {
    isPrivate: args.isPrivate,
    allowVisit: args.allowVisit,
    allowTransfer: args.allowTransfer,
  };

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
        } else if (tag.value.type === 'number') {
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

export const getListings = async (filters: GetListingArguments) => {
  const query = buildListingQuery(filters);
  return await Listing.find(query); //returns listings
};

export const getListingById = async (id: mongoose.Types.ObjectId) => {
  return await Listing.findById(id);
};
