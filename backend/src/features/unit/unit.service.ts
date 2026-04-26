import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error';
import { Unit, type UnitType } from './unit.model';
import type { Listing } from '../listing/listing.model';
import { getListingById } from '../listing/listing.service';
import { Rental } from '../rental/rental.model';
import { combineFilters } from '../../middleware';

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

export const getUnits = async (args: Partial<GetUnitArguments>, filter: QueryFilter<UnitType>) => {
  const query = buildUnitQuery(args);
  return await Unit.where(filter).find(query);
};

export const getUnitById = async (
  id: mongoose.Types.ObjectId,
  filter: QueryFilter<typeof Unit>,
) => {
  return await Unit.where(filter).findById(id);
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
  const unit = await Unit.where(filters).findOneAndUpdate(unitId, { $set: data });
  if (!unit) throw new AppError(404, 'Unit not found.');
  return await unit.save();
};

export const deleteUnit = async (
  unitId: mongoose.Types.ObjectId,
  filters: QueryFilter<UnitType>,
) => {
  const unit = await Unit.where(filters).findOneAndDelete({ _id: unitId });
  if (!unit) throw new AppError(404, 'Unit not found.');
  return unit;
};

export const isUnitFull = async (
  unitId: mongoose.Types.ObjectId,
  filters: QueryFilter<UnitType>,
) => {
  const unit = await Unit.findOne(combineFilters(filters, { _id: unitId }));
  if (!unit) throw new AppError(404, 'Unit not found.');

  // Count active rentals
  //
  // TODO: if this is too slow, add an index or keep the count in the unit
  const activeRentals = await Rental.find({ unitId, status: 'active' });
  return unit.capacity === activeRentals.length;
};
