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
