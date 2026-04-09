import mongoose, { QueryFilter } from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { Unit } from './unit.model';
import { Listing } from '../listing/listing.model';
import { getListingById } from '../listing/listing.service';

export type CreateUnitArguments = {
  listingId: mongoose.Types.ObjectId;
  roomNumber: string;
  price: number;
  location?: string | null;
  isAvailable: boolean;
};

// Parameters for filtering listings
export type GetUnitArguments = {
  listingId: mongoose.Types.ObjectId;
  roomNumber: string;
  price: number;
  location: string;
  isAvailable: boolean;
};

export const createUnit = async (
  data: CreateUnitArguments,
  filters: QueryFilter<typeof Listing>,
) => {
  const listing = await getListingById(data.listingId, filters);
  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }

  return await new Unit(data).save();
};

export function buildUnitQuery(args: Partial<GetUnitArguments>): QueryFilter<typeof Unit> {
  return args;
}

export const getUnits = async (
  args: Partial<GetUnitArguments>,
  filter: QueryFilter<typeof Unit>,
) => {
  const query = buildUnitQuery(args);
  return await Unit.find(combineFilters(query, filter));
};

export const getUnitById = async (
  id: mongoose.Types.ObjectId,
  filter: QueryFilter<typeof Unit>,
) => {
  return await Unit.find(combineFilters({ _id: id }, filter));
};

export type UpdateUnitArguments = {
  roomNumber?: string;
  price?: number;
  location?: string | null;
  isAvailable?: boolean;
};

export const updateUnit = async (
  unitId: mongoose.Types.ObjectId,
  data: UpdateUnitArguments,
  filters: QueryFilter<typeof Unit>,
) => {
  const unit = await Unit.findOne(combineFilters({ _id: unitId }, filters));

  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  unit.set(data);
  return await unit.save();
};

export const deleteUnit = async (
  unitId: mongoose.Types.ObjectId,
  filters: QueryFilter<typeof Unit>,
) => {
  const unit = await Unit.findOne(combineFilters({ _id: unitId }, filters));

  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  // TODO: replace with soft delete
  return await unit.deleteOne();
};
