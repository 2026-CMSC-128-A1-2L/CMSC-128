import type mongoose from 'mongoose';
import { AppError } from '../../error.js';
import { Listing } from '../listing/listing.model.js';
import { Rental } from '../rental/rental.model.js';
import { Unit } from '../unit/unit.model.js';
import { User } from '../user/user.model.js';
import { Report, ListingReport, UserReport } from './report.model.js';

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
  reporterType: string;
  userReported: mongoose.Types.ObjectId;
  description: string;
  flags: string[];
  evidence: string[];
};

export type ResolveReportArgs = {
  status: 'resolved' | 'dismissed';
};

export const getReports = async () => {
  const reports = await Report.find()
    .populate('userId', 'firstName middleName lastName emails')
    .sort({ createdAt: -1 })
    .lean();

  const userIds = [
    ...new Set(
      reports.map((r) => {
        const uid = r.userId;
        return typeof uid === 'object' && uid !== null ? (uid as any)._id : uid;
      }),
    ),
  ];

  const rentals = await Rental.find({
    userId: { $in: userIds },
    status: 'active',
  })
    .populate('facilityId', 'name')
    .lean();

  const facilityByUserId = new Map<string, string>();
  for (const rental of rentals) {
    const uid = rental.userId.toString();
    if (!facilityByUserId.has(uid) && rental.facilityId) {
      const facility = rental.facilityId as any;
      facilityByUserId.set(uid, facility.name || null);
    }
  }

  return reports.map((report) => {
    const uid =
      typeof report.userId === 'object' && report.userId !== null
        ? (report.userId as any)._id.toString()
        : (report.userId as any).toString();
    return {
      ...report,
      reporterFacility: facilityByUserId.get(uid) || null,
    };
  });
};

export const getReport = async (reportId: mongoose.Types.ObjectId) => {
  const report = await Report.findById(reportId);
  if (!report) throw new AppError(404, 'Report not found.');
  return report;
};

export const getMyReports = async (userId: mongoose.Types.ObjectId) => {
  return await Report.find({ userId }).sort({ createdAt: -1 });
};

export const reportListing = async (data: CreateListingReportArgs) => {
  const listing = await Listing.findById(data.listingId);
  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }

  // Only active tenants of this facility may submit a report
  const facilityListingIds = await Listing.find({ facilityId: listing.facilityId }).distinct('_id');
  const facilityUnitIds = await Unit.find({ listingId: { $in: facilityListingIds } }).distinct(
    '_id',
  );
  const activeRental = await Rental.findOne({
    userId: data.userId,
    unitId: { $in: facilityUnitIds },
    status: 'active',
  });
  if (!activeRental)
    throw new AppError(403, 'Only active tenants of this facility can submit a report.');

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

  // Students can only report managers; landlords and managers can only report tenants
  if (
    data.reporterType === 'Student' &&
    targetUser.userType !== 'Manager' &&
    targetUser.userType !== 'Landlord'
  ) {
    throw new AppError(403, 'Students can only report managers or landlords.');
  }

  if (
    (data.reporterType === 'Landlord' || data.reporterType === 'Manager') &&
    targetUser.userType !== 'Student'
  ) {
    throw new AppError(403, 'You can only report tenants.');
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

export const resolveReport = async (reportId: mongoose.Types.ObjectId, data: ResolveReportArgs) => {
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
