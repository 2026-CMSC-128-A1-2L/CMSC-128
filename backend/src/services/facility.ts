import mongoose from 'mongoose';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { AppError } from '../controllers/error.js';
import { combineFilters } from '../controllers/middleware.js';

export type CreateFacilityArguments = {
  landlordId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId;

  name: string;
  type: string;
  location?: {
    coordinates?: number[] | null;
    text?: string | null;
  };

  applicationCloseDate?: Date | null;
  applicationOpenDate?: Date | null;

  documentUrls?: string;
};

// NOTE: attributes to update are not yet finalized
export type UpdateFacilityArguments = {
  managerId?: mongoose.Types.ObjectId;
  name?: string;
  type?: string;
  location?: {
    coordinates?: number[] | null;
    text?: string | null;
  };
  applicationCloseDate?: Date;
  applicationOpenDate?: Date;
  documentUrls?: string;
};

export const createFacility = async (data: CreateFacilityArguments) => {
  if (
    data.applicationCloseDate &&
    data.applicationOpenDate &&
    data.applicationCloseDate < data.applicationOpenDate
  ) {
    throw new AppError(422, 'Application close date should not be before application open date.');
  }

  const newFacility = new HousingFacility({
    landlordId: data.landlordId,
    managerId: data.managerId,

    name: data.name,
    type: data.type,
    location: data.location,

    applicationCloseDate: data.applicationCloseDate,
    applicationOpenDate: data.applicationOpenDate,

    documentUrls: data.documentUrls,

    capacity: 0,
    listings: [],
  });

  return await newFacility.save();
};

export const getFacilityById = async (facilityId: mongoose.Types.ObjectId) => {
  const facility = await HousingFacility.findById(facilityId);

  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  return facility;
};

export const getFacilities = async () => {
  return await HousingFacility.find();
};

export const updateFacility = async (
  facilityId: mongoose.Types.ObjectId,
  data: UpdateFacilityArguments,
  filters: any,
) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: facilityId }));
  if (!facility) {
    // if the facility doesn't exist, check it without filters
    const facilityNoFilter = await HousingFacility.findById(facilityId);
    if (facilityNoFilter) {
      throw new AppError(403, 'Forbidden: You are not the landlord of this facility');
    } else {
      throw new AppError(404, 'Facility not found.');
    }
  }

  const applicationOpenDate = data.applicationOpenDate ?? facility.applicationOpenDate;
  const applicationCloseDate = data.applicationCloseDate ?? facility.applicationCloseDate;

  if (applicationOpenDate && applicationCloseDate && applicationCloseDate < applicationOpenDate) {
    throw new AppError(422, 'Application close date should not be before application open date.');
  }

  facility.set(data);

  return await facility.save();
};

export const deleteFacility = async (facilityId: mongoose.Types.ObjectId) => {
  const facility = await HousingFacility.findById(facilityId);

  // throw a 404 error
  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  if (facility.listings.length > 0) {
    throw new AppError(422, 'Cannot delete a facility that still has listings.');
  }

  await HousingFacility.findByIdAndDelete(facilityId);
};
