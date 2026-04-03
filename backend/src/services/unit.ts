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
  listingId: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId | null;
};

// Parameters for filtering listings
export type GetUnitArguments = {
  roomNumber: number;
  capacity: number;
  currentOccupancy: number;
  price: number;
  location: string;
  isAvailable: boolean;
  listingId: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  managerId: mongoose.Types.ObjectId;
};

export const createUnit = async (data: CreateUnitArguments, filters: any) => {
  const existingUnit = await Unit.findOne(combineFilters(filters, { roomNumber: data.roomNumber }));
  if (existingUnit) {
    throw new AppError(409, 'A unit with this room number already exists in this listing.');
  }

  const newUnit = new Unit(data);
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

export const getUnitByListing = async (listingId: mongoose.Types.ObjectId) => {
  return await Unit.find({ listingId });
};

export type UpdateUnitArguments = {
  roomNumber?: number;
  capacity?: number;
  currentOccupancy?: number;
  price?: number;
  location?: string | null;
  isAvailable?: boolean;
};

export const updateUnit = async (
  unitId: mongoose.Types.ObjectId,
  data: UpdateUnitArguments,
  filters: any,
) => {
  // Try finding it with the ownership filter first
  const unit = await Unit.findOne(combineFilters(filters, { _id: unitId }));

  if (!unit) {
    // Check if it exists at all (without filter)
    const unitNoFilter = await Unit.findById(unitId);
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

export const deleteUnit = async (unitId: mongoose.Types.ObjectId, filters: any) => {
  const unit = await Unit.findOne(combineFilters(filters, { _id: unitId }));

  if (!unit) {
    const unitNoFilter = await Unit.findById(unitId);
    if (unitNoFilter) {
      throw new AppError(403, 'Forbidden: You are not the owner of this unit.');
    }
    throw new AppError(404, 'Unit not found.');
  }

  return await unit.deleteOne();
};
