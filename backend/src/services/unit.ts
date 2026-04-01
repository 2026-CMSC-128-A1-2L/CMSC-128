import mongoose, { QueryFilter } from 'mongoose';
import { Unit } from '../models/housing/Unit.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';
import { Listing } from '../models/housing/Listing.js';
import { request } from 'https';

export type CreateUnitArguments = {
  roomNumber: number;
  capacity: number;
  currentOccupancy: number;
  price: number;
  location?: string;
  isAvailable: boolean;
  listingId: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId;
};

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

export const CreateUnit = async (data: CreateUnitArguments, filters: any) => {
  const unit = await Unit.findOne(combineFilters(filters, { roomNumber: data.roomNumber }));
  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  const newUnit = new Unit({
    roomNumber: data.roomNumber,
    capacity: data.capacity,
    currentOccupancy: data.currentOccupancy,
    price: data.price,
    location: data.location,
    isAvailable: data.isAvailable,
    listingId: data.listingId,
    landlordId: data.landlordId,
    managerId: data.managerId,
  });
  return await newUnit.save();
};

export function buildUnitQuery(args: Partial<GetUnitArguments>): QueryFilter<typeof Unit> {
  const query: QueryFilter<typeof Unit> = {};

  if (args.roomNumber) {
    query.roomNumber = args.roomNumber;
  }
  if (args.capacity) {
    query.capacity = args.capacity;
  }
  if (args.currentOccupancy) {
    query.currentOccupancy = args.currentOccupancy;
  }
  if (args.price) {
    query.price = args.price;
  }
  if (args.location) {
    query.location = args.location;
  }
  if (args.isAvailable) {
    query.isAvailable = args.isAvailable;
  }
  if (args.listingId) {
    query.listingId = args.listingId;
  }
  if (args.landlordId) {
    query.landlordId = args.landlordId;
  }
  if (args.managerId) {
    query.managerId = args.managerId;
  }

  return query;
}

export const GetUnits = async (query: Partial<GetUnitArguments>, filters: any) => {
  const unitQuery = buildUnitQuery(query);
  return await Unit.find(combineFilters(filters, unitQuery));
};

export const GetUnitById = async (unitId: mongoose.Types.ObjectId) => {
  //check if it exists and can access
  const unit = await Unit.findOne({ _id: unitId });
  if (!unit){
      const UnitNoFilter = await Unit.findById(unitId);
      if (UnitNoFilter) {
        throw new AppError(403, "You cannot access this unit.");
      } else {
        throw new AppError(404, 'Unit not found.');
      }
  }

  //no issues, return units of listing  
  return unit;
};

export const GetUnitByListing = async (listingId: mongoose.Types.ObjectId, filters: any) => {
  //check if it exists and can access
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingId }));
  if (!listing){
      const listingNoFilter = await Listing.findById(listingId);
      if (listingNoFilter) {
        throw new AppError(403, "You cannot access this listing's unit.");
      } else {
        throw new AppError(404, 'Listing not found.');
      }
  }

  //no issues, return units of listing  
  return await Unit.find({ listingId });
};