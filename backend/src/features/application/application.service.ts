import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { ApplicationForm } from './application.model';

export type CreateApplicationArguments = {
  userId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
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
  unitId?: mongoose.Types.ObjectId; // Not required when created
  accommodationNoticeUrl?: string; // Not required when created
};

export type GetApplicationsArguments = {
  userId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
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
  unitId?: mongoose.Types.ObjectId;
};

export const createApplication = async (data: CreateApplicationArguments) => {
  const newApplication = new ApplicationForm({
    userId: data.userId,
    listingId: data.listingId,
    preferredRoomType: data.preferredRoomType,
    documentUrls: data.documentUrls || [],
    unitId: data.unitId,
    accommodationNoticeUrl: data.accommodationNoticeUrl,
  });
  return await newApplication.save();
};

export function buildApplicationQuery(
  args: Partial<GetApplicationsArguments>,
): QueryFilter<typeof ApplicationForm> {
  const query: QueryFilter<typeof ApplicationForm> = {};

  if (args.userId) {
    query.userId = args.userId;
  }

  if (args.listingId) {
    query.listingId = args.listingId;
  }

  if (args.preferredRoomType) {
    query.preferredRoomType = args.preferredRoomType;
  }

  if (args.status) {
    query.status = args.status;
  }

  if (args.unitId) {
    query.unitId = args.unitId;
  }

  return query;
}

export const getApplications = async (query: Partial<GetApplicationsArguments>, filters: any) => {
  const dbFilters = buildApplicationQuery(query);
  return await ApplicationForm.find(combineFilters(filters, dbFilters));
};

// Service functions for application forms, which are the main way students apply to listings
export const getApplicationById = async (applicationId: mongoose.Types.ObjectId) => {
  const application = await ApplicationForm.findById(applicationId);

  if (!application) {
    throw new AppError(404, 'Application not found.');
  }

  return application;
};

// no error because it can be empty, just return empty array
// A listing and student can just not have an application yet
export const getApplicationsByListing = async (listingId: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ listingId });
};

export const getApplicationsByStudent = async (userId: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ userId });
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
  unitId?: mongoose.Types.ObjectId;
};

export const updateApplication = async (
  applicationId: mongoose.Types.ObjectId,
  data: UpdateApplicationArguments,
  filters: any,
) => {
  const application = await ApplicationForm.findOne(
    combineFilters({ _id: applicationId }, filters),
  );
  if (!application) {
    const applicationNoFilter = await ApplicationForm.findById(applicationId);
    if (applicationNoFilter) {
      throw new AppError(403, 'Forbidden: You do not have permission to update this application.');
    } else {
      throw new AppError(404, 'Application not found.');
    }
  }

  application.set(data);

  return await application.save();
};

export const deleteApplication = async (applicationId: mongoose.Types.ObjectId, filters: any) => {
  const application = await ApplicationForm.findOne(
    combineFilters({ _id: applicationId }, filters),
  );
  if (!application) {
    const applicationNoFilter = await ApplicationForm.findById(applicationId);
    if (applicationNoFilter) {
      throw new AppError(403, 'Forbidden: You do not have permission to delete this application.');
    } else {
      throw new AppError(404, 'Application not found.');
    }
  }

  return await application.deleteOne();
};

export const updateApplicationStatus = async (
  applicationId: mongoose.Types.ObjectId,
  data: UpdateApplicationArguments,
  filters: any,
) => {
  const application = await ApplicationForm.findOne(
    combineFilters({ _id: applicationId }, filters),
  );
  if (!application) {
    const applicationNoFilter = await ApplicationForm.findById(applicationId);
    if (applicationNoFilter) {
      throw new AppError(403, 'Forbidden: You do not have permission to update this application.');
    } else {
      throw new AppError(404, 'Application not found.');
    }
  }

  application.set({ status: data.status });

  return await application.save();
};

export const assignApplicationUnit = async (
  applicationId: mongoose.Types.ObjectId,
  data: UpdateApplicationArguments,
  filters: any,
) => {
  const application = await ApplicationForm.findOne(
    combineFilters({ _id: applicationId }, filters),
  );
  if (!application) {
    const applicationNoFilter = await ApplicationForm.findById(applicationId);
    if (applicationNoFilter) {
      throw new AppError(403, 'Forbidden: You do not have permission to update this application.');
    } else {
      throw new AppError(404, 'Application not found.');
    }
  }

  application.set({ unitId: data.unitId });

  return await application.save();
};
