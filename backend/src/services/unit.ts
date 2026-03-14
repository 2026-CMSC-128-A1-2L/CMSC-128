import mongoose, { QueryFilter } from 'mongoose';
import { Unit } from '../models/housing/Unit.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';

export type CreateUnitArguments = {
    roomNumber: number;
    capacity: number;
    currentOccupancy: number;
    price: number;
    floorNumber: number;
    status: string;
    listingID: mongoose.Types.ObjectId,
    landlordID: mongoose.Types.ObjectId,
    managerID: mongoose.Types.ObjectId
};

// Parameters for filtering listings
export type GetUnitArguments = {
  roomNumber: number;
  capacity: number;
  currentOccupancy: number;
  price: number;
  floorNumber: number;
  status: string;
  listingID: mongoose.Types.ObjectId,
  landlordID: mongoose.Types.ObjectId,
  managerID: mongoose.Types.ObjectId
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
    floorNumber: unit.floorNumber,
    status: unit.status,
    listingID: unit.listingID,
    landlordID: unit.landlordID,
    managerID: unit.managerID
  });
  return await newUnit.save();
};

export function buildUnitQuery(args: GetUnitArguments): QueryFilter<typeof Unit> {
  const query: QueryFilter<typeof Unit> = {
    roomNumber: args.roomNumber,
    capacity: args.capacity,
    currentOccupancy: args.currentOccupancy,
    price: args.price,
    floorNumber: args.floorNumber,
    status: args.status,
    listingID: args.listingID,
    landlordID: args.landlordID
  };

  if (args.managerID) {
    query.managerID = args.managerID;
  }

  return query;
}

export const getUnits = async (filters: GetUnitArguments) => {
  const query = buildUnitQuery(filters);
  return await Unit.find(query); //returns units
};

export const getUnitById = async (id: mongoose.Types.ObjectId) => {
  return await Unit.findById(id);
};

export const getUnitByListing = async (listingID: mongoose.Types.ObjectId) => {
  return await Unit.find({ listingID });
};
