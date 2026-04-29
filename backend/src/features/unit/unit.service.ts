import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from "../../error.js";
import { Unit, type UnitType } from "./unit.model.js";
import { Listing, type ListingType } from "../listing/listing.model.js";
import { getListingById } from "../listing/listing.service.js";
import { Rental } from "../rental/rental.model.js";
import { combineFilters } from "../../middleware.js";
import { Student } from "../user/user.model.js";
import { createRental } from "../rental/rental.service.js";
import { TagFilterSchema } from 'shared';

export type CreateUnitArguments = {
  listingId: mongoose.Types.ObjectId;
  roomNumber: string;
  price: number;
  location?: string | null;   // location inside building
  isAvailable: boolean;
  legacyTenants: number;
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
  filters: QueryFilter<ListingType>,
) => {
  const listing = await getListingById(data.listingId, filters);
  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }


  const unit = await new Unit({
    listingId: data.listingId,
    roomNumber: data.roomNumber,
    price: data.price,
    location: data.location,
    
    // derived from listing
    facilityId: listing.facilityId,
    capacity: listing.capacity,
  }).save();

  // if there are legacy tenants
  if (data.legacyTenants && data.legacyTenants > 0) {
    for (let i = 0; i < data.legacyTenants; i++) {

      const student = await new Student({
        firstName: 'Legacy',
        lastName: 'Tenant',
        emails: [],
        auth: { google: [] },
        studentNumber: `legacy-${unit._id}-${i}`, // set temporary student number since it is reqd
        documents: [],
        status: 'legacy',
      }).save();

      await createRental({
        userId: student._id,
        facilityId: listing.facilityId,
        unitId: unit._id
      });

    }
  }

  return unit;
};

export function buildUnitQuery(args: Partial<GetUnitArguments>): QueryFilter<UnitType> {
  return args;
}

export const getUnits = async (args: Partial<GetUnitArguments>, filter: QueryFilter<UnitType>) => {
  const query = buildUnitQuery(args);
  return await Unit.find({...filter, ...query}).populate(getTenantNames);
};

export const getUnitById = async (
  id: mongoose.Types.ObjectId,
  filter: QueryFilter<UnitType>,
) => {
  return await Unit.findOne(combineFilters(filter, {_id: id})).populate(getTenantNames);
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
  filters: QueryFilter<UnitType>,
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

// export const isUnitFull = async (
//   unitId: mongoose.Types.ObjectId,
//   filters: QueryFilter<UnitType>,
// ) => {
//   const unit = await Unit.findOne(combineFilters(filters, { _id: unitId }));
//   if (!unit) throw new AppError(404, 'Unit not found.');

//   // Count active rentals
//   //
//   // TODO: if this is too slow, add an index or keep the count in the unit
//   const activeRentals = await Rental.find({ unitId, status: 'active' });
//   return unit.capacity === activeRentals.length;
// };

// changed old isUnitFull logic since currentRentals update is handled by the rental services
export const isUnitFull = async (
  unitId: mongoose.Types.ObjectId,
  filters: QueryFilter<UnitType>,
) => {
  const unit = await Unit.findOne(combineFilters(filters, { _id: unitId }));
  if (!unit) throw new AppError(404, 'Unit not found.');

  return unit.capacity === unit.currentRentals.length;
};

// helper function to get the names instead of userIds for the currentRentals
export const getTenantNames = {
  path: 'currentRentals',
  populate: { path: 'userId', select: 'firstName lastName' }
};