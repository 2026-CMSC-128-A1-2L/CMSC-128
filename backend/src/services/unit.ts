import mongoose, { QueryFilter } from 'mongoose';
import { Unit } from '../models/housing/Unit.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';

export type CreateUnitArguments = {
  roomNumber: number;
  capacity: number;
  currentOccupancy: number;
  price: number;
  location?: string | null;
  isAvailable: boolean;
  listingID: mongoose.Types.ObjectId;
  landlordID: mongoose.Types.ObjectId;
  managerID: mongoose.Types.ObjectId;
};

// Parameters for filtering listings
export type GetUnitArguments = {
  roomNumber: number;
  capacity: number;
  currentOccupancy: number;
  price: number;
  location: string;
  isAvailable: boolean;
  listingID: mongoose.Types.ObjectId;
  landlordID: mongoose.Types.ObjectId;
  managerID: mongoose.Types.ObjectId;
};

export const createUnit = async (data: CreateUnitArguments, filters: any) => {
  const unit = await Unit.findOne(combineFilters(filters, { roomNumber: data.roomNumber }));
  if (!unit) {
    // This can also be a 403, see `updateFacility` in ./facility.ts
    throw new AppError(404, 'Unit not found.');
  }

  // There can be a race condition here.
  const newUnit = new Unit({
    roomNumber: unit.roomNumber,
    capacity: unit.capacity,
    currentOccupancy: unit.currentOccupancy,
    price: unit.price,
    location: unit.location,
    isAvailable: unit.isAvailable,
    listingID: unit.listingID,
    landlordID: unit.landlordID,
    managerID: unit.managerID,
  });
  return await newUnit.save();
};

export function buildUnitQuery(args: Partial<GetUnitArguments>): QueryFilter<typeof Unit> {
  return args;
}

export const getUnits = async (filters: Partial<GetUnitArguments>) => {
  const query = buildUnitQuery(filters);
  return await Unit.find(query); //returns units
};

export const getUnitById = async (id: mongoose.Types.ObjectId) => {
  return await Unit.findById(id);
};

export const getUnitByListing = async (listingID: mongoose.Types.ObjectId) => {
  return await Unit.find({ listingID });
};

export type UpdateUnitArguments = {
  roomNumber?: number;
  capacity?: number;
  currentOccupancy?: number;
  price?: number;
  floorNumber?: number | null;
  status?: 'available' | 'unavailable';
  isAvailable?: boolean;
};

export const updateUnit = async (
  unitID: mongoose.Types.ObjectId,
  data: UpdateUnitArguments,
  filters: any,
) => {
  // Try finding it with the ownership filter first
  const unit = await Unit.findOne(combineFilters(filters, { _id: unitID }));

  if (!unit) {

    // Check if it exists at all (without filter)
    const unitNoFilter = await Unit.findById(unitID);
    if (unitNoFilter) {
      // Exisiting unit pero not the owener
      throw new AppError(403, 'Forbidden: You are not the owner of this unit.');
    }

    // Non-existing talaga yung unit
    throw new AppError(404, 'Unit not found.');
  }

  // Business rule: occupancy can never exceed capacity after the update
  const newCapacity = data.capacity ?? unit.capacity;
  const newOccupancy = data.currentOccupancy ?? unit.currentOccupancy;
  if (newOccupancy > newCapacity) {
    throw new AppError(422, 'Current occupancy cannot exceed capacity.');
  }

  unit.set(data);
  return await unit.save();
};

export const deleteUnit = async (
  unitID: mongoose.Types.ObjectId,
  filters: any,
) => {
  const unit = await Unit.findOne(combineFilters(filters, { _id: unitID }));

  if (!unit) {
    const unitNoFilter = await Unit.findById(unitID);
    if (unitNoFilter) {
      throw new AppError(403, 'Forbidden: You are not the owner of this unit.');
    }
    throw new AppError(404, 'Unit not found.');
  }

  return await unit.deleteOne();
};
