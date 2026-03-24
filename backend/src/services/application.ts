import mongoose, { QueryFilter } from 'mongoose';
import { ApplicationForm } from '../models/student-actions/ApplicationForm.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';

export type CreateApplicationArguments = {
  studentID: mongoose.Types.ObjectId;
  listingID: mongoose.Types.ObjectId;
  preferredRoomType?: 'single' | 'double' | 'shared';
  status?:
    | 'pending'
    | 'manager-approved'
    | 'manager-rejected'
    | 'manager-waitlisted'
    | 'landlord-rejected'
    | 'landlord-approved'
    | 'landlord-waitlisted'
    | 'contract-signed';
  documentUrls?: string[];
  unitID?: mongoose.Types.ObjectId; // Not required when created
  accommodationNoticeUrl?: string; // Not required when created
};

export type GetApplicationsArguments = {
  studentID: mongoose.Types.ObjectId;
  listingID: mongoose.Types.ObjectId;
  preferredRoomType?: 'single' | 'double' | 'shared';
  status?:
    | 'pending'
    | 'manager-approved'
    | 'manager-rejected'
    | 'manager-waitlisted'
    | 'landlord-rejected'
    | 'landlord-approved'
    | 'landlord-waitlisted'
    | 'contract-signed';
  unitID?: mongoose.Types.ObjectId;
};

export const createApplication = async (data: CreateApplicationArguments) => {
  const newApplication = new ApplicationForm({
    studentID: data.studentID,
    listingID: data.listingID,
    preferredRoomType: data.preferredRoomType,
    documentUrls: data.documentUrls || [],
    unitID: data.unitID,
    accommodationNoticeUrl: data.accommodationNoticeUrl,
  });
  return await newApplication.save();
};

export function buildApplicationQuery(
  args: Partial<GetApplicationsArguments>,
): QueryFilter<typeof ApplicationForm> {
  const query: QueryFilter<typeof ApplicationForm> = {};

  if (args.studentID) {
    query.studentID = args.studentID;
  }

  if (args.listingID) {
    query.listingID = args.listingID;
  }

  if (args.preferredRoomType) {
    query.preferredRoomType = args.preferredRoomType;
  }

  if (args.status) {
    query.status = args.status;
  }

  if (args.unitID) {
    query.unitID = args.unitID;
  }

  return query;
}

export const getApplications = async (query: Partial<GetApplicationsArguments>, filters: any) => {
  const dbFilters = buildApplicationQuery(query);
  return await ApplicationForm.find(combineFilters(filters, dbFilters));
};

// Service functions for application forms, which are the main way students apply to listings
export const getApplicationById = async (applicationID: mongoose.Types.ObjectId) => {
  const application = await ApplicationForm.findById(applicationID);

  if (!application) {
    throw new AppError(404, 'Application not found.');
  }

  return application;
};

// no error because it can be empty, just return empty array
// A listing and student can just not have an application yet
export const getApplicationsByListing = async (listingID: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ listingID });
};

export const getApplicationsByStudent = async (studentID: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ studentID });
};

export type UpdateApplicationArguments = {
  preferredRoomType?: 'single' | 'double' | 'shared';
  status?:
    | 'pending'
    | 'manager-approved'
    | 'manager-rejected'
    | 'manager-waitlisted'
    | 'landlord-rejected'
    | 'landlord-approved'
    | 'landlord-waitlisted'
    | 'contract-signed';
  documentUrls?: string[];
  unitID?: mongoose.Types.ObjectId;
};

export const updateApplication = async (
  applicationID: mongoose.Types.ObjectId,
  data: UpdateApplicationArguments,
  filters: any,
) => {
  const application = await ApplicationForm.findOne(
    combineFilters({ _id: applicationID }, filters),
  );
  if (!application) {
    const applicationNoFilter = await ApplicationForm.findById(applicationID);
    if (applicationNoFilter) {
      throw new AppError(403, 'Forbidden: You do not have permission to update this application.');
    } else {
      throw new AppError(404, 'Application not found.');
    }
  }

  application.set(data);

  return await application.save();
};

export const deleteApplication = async (applicationID: mongoose.Types.ObjectId, filters: any) => {
  const application = await ApplicationForm.findOne(
    combineFilters({ _id: applicationID }, filters),
  );
  if (!application) {
    const applicationNoFilter = await ApplicationForm.findById(applicationID);
    if (applicationNoFilter) {
      throw new AppError(403, 'Forbidden: You do not have permission to delete this application.');
    } else {
      throw new AppError(404, 'Application not found.');
    }
  }

  return await application.deleteOne();
};
