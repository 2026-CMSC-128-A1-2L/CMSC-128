import mongoose from 'mongoose';
import { Report, ListingReport, UserReport } from '../models/admin/Report.js';
import { Listing } from '../models/housing/Listing.js';
import { User } from '../models/user/User.js';
import { AppError } from '../controllers/error.js';

export type CreateListingReportArgs = {
  reporterId: mongoose.Types.ObjectId;
  // facilityId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
  reportDescription: string;
  reportFlags: string[];
  reportEvidence: string[];
};

export type CreateUserReportArgs = {
  reporterId: mongoose.Types.ObjectId;
  userReported: mongoose.Types.ObjectId;
  reportDescription: string;
  reportFlags: string[];
  reportEvidence: string[];
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
    reporterId: data.reporterId,
    listingId: data.listingId,
    status: 'pending',
  });
  if (existing) {
    throw new AppError(409, 'You already have a pending report for this listing.');
  }

  const report = new ListingReport({
    reporterId: data.reporterId,
    listingId: data.listingId,
    facilityId: listing.housingId,
    reportDescription: data.reportDescription,
    reportFlags: data.reportFlags,
    reportEvidence: data.reportEvidence,
  });

  return await report.save();
};

export const reportUser = async (data: CreateUserReportArgs) => {
  const targetUser = await User.findById(data.userReported);
  if (!targetUser) {
    throw new AppError(404, 'User not found.');
  }

  if (data.reporterId.equals(data.userReported)) {
    throw new AppError(400, 'You cannot report yourself.');
  }

  const existing = await UserReport.findOne({
    reporterId: data.reporterId,
    userReported: data.userReported,
    status: 'pending',
  });
  if (existing) {
    throw new AppError(409, 'You already have a pending report for this user.');
  }

  const report = new UserReport({
    reporterId: data.reporterId,
    userReported: data.userReported,
    reportDescription: data.reportDescription,
    reportFlags: data.reportFlags,
    reportEvidence: data.reportEvidence,
  });

  return await report.save();
};

export const resolveReport = async (
  reportId: mongoose.Types.ObjectId,
  data: ResolveReportArgs,
) => {
  const report = await Report.findById(reportId);
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
