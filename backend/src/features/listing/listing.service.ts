import mongoose, { QueryFilter } from 'mongoose';
import type { ROOM_TYPES } from 'shared';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { HousingFacility, type HousingFacilityType } from '../facility/facility.model';
import { Tag } from '../tag/tag.model';
import { Listing, type ListingType } from './listing.model';

type TagFilter = {
  name: string;
  value:
    | { type: 'enum'; value: string }
    | { type: 'boolean'; value: boolean }
    | { type: 'numeric'; value: { min?: number; max?: number } };
};

export type CreateListingArguments = {
  facilityId: mongoose.Types.ObjectId;
  tags: Record<string, string | number | boolean>;

  roomType: (typeof ROOM_TYPES)[number];
  capacity: number;

  description: string;
  media?: {
    sourceType: 'local' | 'external';
    value: string;
  }[];
};

// Parameters for filtering listings
type GetListingArguments = {
  facilityId: mongoose.Types.ObjectId;
  tags: TagFilter[];
  capacity: { min?: number; max?: number };
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

type UpdateListingArguments = Partial<{
  tags: Record<string, string | number | boolean>;
  roomType: string;
  capacity: number;
  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  description: string;
  mediaUrls: string[];
  units: string[];
}>;

const typeMap = {
  number: 'numeric',
  boolean: 'boolean',
  string: 'enum',
} as const;

const verifyTags = async (tagMap: Record<string, string | number | boolean>) => {
  const namesToFind = [...Object.keys(tagMap)];
  const tags = await Tag.find({ name: { $in: namesToFind } }).lean();
  return tags
    .map((tag) => {
      const typename = typeof tagMap[tag.name] as 'string' | 'number' | 'boolean';
      if (tag.dataType.name !== typeMap[typename]) return { error: 'Incorrect tag data type' };

      const value = tagMap[tag.name];
      const tagDoc = tag.dataType as TagSpec;
      if (tagDoc.name === 'enum') {
        if (typeof value !== 'string') return { error: `Invalid value ${value} for datatype enum` };
        if (!tagDoc.values.includes(value))
          return { error: `Invalid value '${value}' for tag '${tag.name}'` };
      } else if (tagDoc.name === 'numeric') {
        if (typeof value !== 'number')
          return { error: `Invalid value ${value} for datatype numeric` };

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
      return null;
    })
    .filter((x) => x);
};

export const createListing = async (
  data: CreateListingArguments,
  filters: QueryFilter<HousingFacilityType>,
) => {
  const facility = await HousingFacility.findOne(
    combineFilters<HousingFacilityType>(filters, { _id: data.facilityId }),
  );
  if (!facility) throw new AppError(404, 'Facility not found.');

  if (data.tags) {
    const errorList = await verifyTags(data.tags);
    if (errorList.length > 0) throw new AppError(400, 'Invalid tags', errorList);
  }

  // There can be a race condition here.
  const newListing = new Listing({
    landlordId: facility.landlordId,
    facilityId: data.facilityId,
    tags: data.tags,

    roomType: data.roomType,
    capacity: data.capacity,

    description: data.description,
    media: data.media,
  });
  return await newListing.save();
};

const buildTagQuery = (filters: TagFilter[]) => {
  const query: QueryFilter<Map<string, string | number | boolean>> = {};

  filters.forEach((filter) => {
    const queryKey = `tags.${filter.name}`;

    if (filter.value.type === 'enum' || filter.value.type === 'boolean') {
      query[queryKey] = filter.value.value;
    } else if (filter.value.type === 'numeric') {
      const { min, max } = filter.value.value;
      const rangeQuery: Record<string, number> = {};

      if (min !== undefined) rangeQuery.$gte = min;
      if (max !== undefined) rangeQuery.$lte = max;

      if (Object.keys(rangeQuery).length > 0) {
        query[queryKey] = rangeQuery;
      }
    }
  });

  return query;
};

export function buildListingQuery(args: Partial<GetListingArguments>): QueryFilter<ListingType> {
  const query: QueryFilter<ListingType> = {};

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
    const q = buildTagQuery(args.tags);
    for (const x of Object.keys(q)) {
      query[x] = q[x];
    }
  }

  return query;
}

export const getListings = async (
  query: Partial<GetListingArguments>,
  filters: QueryFilter<ListingType>,
) => {
  const dbFilters = buildListingQuery(query);
  return await Listing.find(combineFilters(filters, dbFilters)); //returns listings
};

export const getListingById = async (
  id: mongoose.Types.ObjectId,
  filters: QueryFilter<ListingType>,
) => {
  return await Listing.findOne(combineFilters(filters, { _id: id }));
};

export const updateListing = async (
  listingId: mongoose.Types.ObjectId,
  data: UpdateListingArguments,
  filters: QueryFilter<ListingType>,
) => {
  return await Listing.findOneAndUpdate(
    combineFilters(filters, { _id: listingId }),
    { $set: data },
    { returnDocument: 'after' },
  );
};

export const deleteListing = async (
  listingId: mongoose.Types.ObjectId,
  filters: QueryFilter<ListingType>,
) => {
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingId }));
  if (!listing) throw new AppError(404, 'Listing not found.');

  // TODO: change to soft delete

  return await listing.deleteOne({});
};

export const updateListingTags = async (
  listingID: mongoose.Types.ObjectId,
  data: Record<string, string | number | boolean>,
  filters: QueryFilter<ListingType>,
) => {
  // TODO: use a transaction
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingID }));
  if (!listing) throw new AppError(404, 'Listing not found.');

  const errorList = await verifyTags(data);
  if (errorList.length > 0) throw new AppError(400, 'Invalid tags', { error: errorList });

  listing.set({ tags: data.tags });
  return await listing.save();
};
