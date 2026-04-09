import mongoose from 'mongoose';
import { AppError } from '../../error';
import { Listing } from '../listing/listing.model';
import { User } from '../user/user.model';
import { Report, ListingReport, UserReport } from './report.model';

export type CreateListingReportArgs = {
  userId: mongoose.Types.ObjectId;
  // facilityId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
  description: string;
  flags: string[];
  evidence: string[];
};

export type CreateUserReportArgs = {
  userId: mongoose.Types.ObjectId;
  userReported: mongoose.Types.ObjectId;
  description: string;
  flags: string[];
  evidence: string[];
};

export type ResolveReportArgs = {
  status: 'resolved' | 'dismissed';
};

export const getReports = async () => {
  return await Report.find().sort({ createdAt: -1 });
};

export const reportListing = async (data: CreateListingReportArgs) => {
  const listing = await Listing.findById(data.listingId);
  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }

  // Prevent duplicate pending reports
  const existing = await ListingReport.findOne({
    userId: data.userId,
    listingId: data.listingId,
    status: 'pending',
  });
  if (existing) {
    throw new AppError(409, 'You already have a pending report for this listing.');
  }

  const report = new ListingReport({
    userId: data.userId,
    listingId: data.listingId,
    facilityId: listing.facilityId,
    description: data.description,
    flags: data.flags,
    evidence: data.evidence,
  });

  return await report.save();
};

export const reportUser = async (data: CreateUserReportArgs) => {
  const targetUser = await User.findById(data.userReported);
  if (!targetUser) {
    throw new AppError(404, 'User not found.');
  }

  if (data.userId.equals(data.userReported)) {
    throw new AppError(400, 'You cannot report yourself.');
  }

  const existing = await UserReport.findOne({
    userId: data.userId,
    userReported: data.userReported,
    status: 'pending',
  });
  if (existing) {
    throw new AppError(409, 'You already have a pending report for this user.');
  }

  const report = new UserReport({
    userId: data.userId,
    userReported: data.userReported,
    description: data.description,
    flags: data.flags,
    evidence: data.evidence,
  });

  return await report.save();
};

export const resolveReport = async (
  userId: mongoose.Types.ObjectId,
  data: ResolveReportArgs,
) => {
  const report = await Report.findById(userId);
  if (!report) {
    throw new AppError(404, 'Report not found.');
  }

  if (report.status !== 'pending') {
    throw new AppError(400, 'Report has already been resolved.');
  }

  report.set({
    status: data.status,
  });

  return await report.save();
};
