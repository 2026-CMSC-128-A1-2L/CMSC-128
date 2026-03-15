import mongoose from 'mongoose';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { AppError } from '../controllers/error.js';
import { combineFilters } from '../controllers/middleware.js';

export type CreateFacilityArguments = {
  landlordID: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId;

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
  managerID?: mongoose.Types.ObjectId;
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
    landlordID: data.landlordID,
    managerID: data.managerID,

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

export const getFacilityById = async (facilityID: mongoose.Types.ObjectId) => {
  const facility = await HousingFacility.findById(facilityID);

  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  return facility;
};

export const updateFacility = async (
  facilityID: mongoose.Types.ObjectId,
  data: UpdateFacilityArguments,
  filters: any,
) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: facilityID }));
  if (!facility) {
    // if the facility doesn't exist, check it without filters
    const facilityNoFilter = await HousingFacility.findById(facilityID);
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
