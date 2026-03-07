import mongoose from 'mongoose';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { AppError } from '../controllers/error.js';

export type CreateFacilityArguments = {
  landlordID: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId;

  name: string;
  type: string;
  location: string;

  applicationCloseDate: Date;
  applicationOpenDate: Date;

  documentUrls?: string;
};

// NOTE: attributes to update are not yet finalized
export type UpdateFacilityArguments = {
  managerID?: mongoose.Types.ObjectId;
  name?: string;
  type?: string;
  location?: string;
  applicationCloseDate?: Date;
  applicationOpenDate?: Date;
  documentUrls?: string;
};


export const createFacility = async (data: CreateFacilityArguments) => {
  if (data.applicationCloseDate < data.applicationOpenDate) {
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


export const getFacilityById = async(facilityID: mongoose.Types.ObjectId) => {
  const facility = await HousingFacility.findById(facilityID);

  if(!facility){
    throw new AppError(404, 'Facility not found.');
  }

  return facility;
};

export const updateFacility = async(facility: mongoose.Document & any, data: UpdateFacilityArguments) => {
  const applicationOpenDate = data.applicationOpenDate ?? facility.applicationOpenDate;
  const applicationCloseDate = data.applicationCloseDate ?? facility.applicationCloseDate;

  if(applicationOpenDate && applicationCloseDate && applicationCloseDate < applicationOpenDate){
    throw new AppError(422, 'Application close date should not be before application open date.');
  }

  facility.set(data);

  return await facility.save();
};
