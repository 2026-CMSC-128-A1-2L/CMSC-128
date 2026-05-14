import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error.js';
import {
  ApplicationForm,
  type ApplicationStatusType,
  type ApplicationType,
} from './application.model.js';
import { sendNotification } from '../notification/notification.service.js';
import { buildQuery, type NullablePartial } from '../../utils.js';
import z from 'zod';
import { DateTimeSchema, ObjectIdSchema } from 'shared';
import { combineFilters } from '../../middleware.js';
import { isUnitFull } from '../unit/unit.service.js';
import { Listing } from '../listing/listing.model.js';
import { File } from '../file/file.model.js';
import { createRental } from '../rental/rental.service.js';

export type GetApplicationsArguments = NullablePartial<{
  userId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  status: ApplicationStatusType;
  leaseDuration: '6-months' | '12-months';
  moveInDate?: {
    min?: Date | null;
    max?: Date | null;
  };
}> & {
  cursor?: string;
  limit: number;
};

export const createApplication = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
  data: {
    leaseDuration: '6-months' | '12-months';
    moveInDate: Date;
    message?: string | null;
  },
) => {
  const listing = await Listing.findById(listingId).select('facilityId');
  if (!listing) throw new AppError(404, 'Listing not found.');

  const newApplication = new ApplicationForm({
    userId,
    listingId,
    facilityId: listing.facilityId,
    leaseDuration: data.leaseDuration,
    moveInDate: data.moveInDate,
    preferredMoveInDate: data.moveInDate,
    message: data.message,
    documents: [
      { docId: 'official-id', name: 'Official University ID', status: 'pending', files: [] },
      { docId: 'parental-consent', name: 'Parental Consent Form', status: 'pending', files: [] },
      { docId: 'tenancy-contract', name: 'Tenancy Contract', status: 'pending', files: [] },
    ],
  });
  return await newApplication.save();
};

const CursorSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  z.string().transform((x) => schema.parse(JSON.parse(Buffer.from(x, 'base64').toString())));

const GetApplicationsCursorSchema = CursorSchema(
  z.object({
    createdAt: DateTimeSchema,
    _id: ObjectIdSchema,
  }),
);

const getExpectedMoveOutDate = (moveInDate: Date, leaseDuration: '6-months' | '12-months') => {
  const moveOutDate = new Date(moveInDate);
  moveOutDate.setMonth(moveOutDate.getMonth() + (leaseDuration === '6-months' ? 6 : 12));
  return moveOutDate;
};

export const getApplications = async (
  query: GetApplicationsArguments,
  filters: QueryFilter<ApplicationType>,
) => {
  const { cursor: _cursor, limit, ...applicationFilters } = query;
  const queryFilter = buildQuery<ApplicationType>(applicationFilters);
  const cursorQuery: QueryFilter<ApplicationType> = {};
  if (query.cursor) {
    const cursor = GetApplicationsCursorSchema.parse(query.cursor);
    cursorQuery.$or = [
      { createdAt: { $lt: cursor.createdAt } },
      { createdAt: cursor.createdAt, _id: { $lt: cursor._id } },
    ];
  }

  const queryExec = ApplicationForm.find(
    combineFilters<ApplicationType>(
      combineFilters<ApplicationType>(filters, queryFilter),
      cursorQuery,
    ),
  )
    .populate(
      'userId',
      'firstName middleName lastName emails email contact address studentNumber profilePicture',
    )
    .populate('facilityId', 'name location media')
    .populate('listingId', 'roomType capacity tags')
    .populate('unitId', 'roomNumber price location')
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .lean();

  return await queryExec;
};

export const getApplicationById = async (
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  return await ApplicationForm.where(filters)
    .findById(applicationId)
    .populate(
      'userId',
      'firstName middleName lastName emails email contact address studentNumber profilePicture',
    )
    .populate('facilityId', 'name location media')
    .populate('listingId', 'roomType capacity tags')
    .populate('unitId', 'roomNumber price location');
};

// no error because it can be empty, just return empty array
// A listing and student can just not have an application yet
export const getApplicationsByListing = async (listingId: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ listingId });
};

export const getApplicationsByStudent = async (userId: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ userId });
};

export const deleteApplication = async (
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  return await ApplicationForm.where(filters).findOneAndDelete({ _id: applicationId });
};

// TODO: fix these messages
const statusMessages: Record<string, { subject: string; content: string }> = {
  waitlisted: {
    subject: 'Waitlisted',
    content: 'Your application has been approved by the manager. You are now on the waitlist.',
  },
  approved: {
    subject: 'Approved',
    content: 'Your application has been approved by the landlord.',
  },
  rejected: {
    subject: 'Application Rejected',
    content: 'Your application has been rejected by the landlord.',
  },
  finalized: {
    subject: 'Finalized',
    content: 'Your application has been finalized.',
  },
};

export const updateApplicationStatus = async (
  applicationId: mongoose.Types.ObjectId,
  status: ApplicationStatusType,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findOneAndUpdate(
    { _id: applicationId },
    { $set: { status } },
    { returnDocument: 'after' },
  );
  if (!application) return null;
  const { subject, content } = statusMessages[application.status];
  return await sendNotification(application.userId, subject, content);
};

export const approveFinalApplication = async (
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findById(applicationId);
  if (!application) return;

  // The only legal states for final acceptance is from
  // `manager-approved` and `manager-waitlisted`.
  //
  // TODO: clarify this case. Landlord should be able to override an application
  // that is rejected by a manager. But this also means that the requirements are
  // not met.
  //
  // throw new AppError(422, "Cannot accept an application rejected by a manager.");
  if (application.status !== 'finalized') {
    throw new AppError(422, `Applications that are '${application.status}' cannot be approved.`);
  }

  if (!application.unitId) {
    throw new AppError(422, 'Application must have an assigned unit before final approval.');
  }

  await createRental({
    userId: application.userId,
    facilityId: application.facilityId,
    unitId: application.unitId,
    applicationId: application._id,
    expectedMoveInDate: application.moveInDate,
    expectedMoveOutDate: getExpectedMoveOutDate(application.moveInDate, application.leaseDuration),
  });

  application.status = 'approved';
  const { subject, content } = statusMessages[application.status];
  await sendNotification(application.userId, subject, content);
  return await application.save();
};

export const approveInitialApplication = async (
  applicationId: mongoose.Types.ObjectId,
  unitId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findById(applicationId);
  if (!application) return;

  // The only legal states for initial acceptance is from `pending`
  if (application.status !== 'pending')
    throw new AppError(422, `Applications that are '${application.status}' cannot be approved.`);

  if (await isUnitFull(unitId, { listingId: application.listingId }))
    throw new AppError(422, 'Unit is already full.');

  application.status = 'waitlisted';
  application.unitId = unitId;
  const { subject, content } = statusMessages[application.status];
  await sendNotification(application.userId, subject, content);
  return await application.save();
};

export const rejectFinalApplication = async (
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findById(applicationId);
  if (!application) return;

  // The only legal states for final rejection is from `manager-approved` and `manager-waitlisted`.
  //
  // throw new AppError(422, "Cannot accept an application rejected by a manager.");
  if (application.status !== 'finalized')
    throw new AppError(422, `Applications that are '${application.status}' cannot be rejected.`);

  application.status = 'rejected';
  const { subject, content } = statusMessages[application.status];
  await sendNotification(application.userId, subject, content);
  return await application.save();
};

export const rejectInitialApplication = async (
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findById(applicationId);
  if (!application) return;

  // The only legal states for initial acceptance is from `pending`
  if (application.status !== 'pending')
    throw new AppError(422, `Applications that are '${application.status}' cannot be rejected.`);

  application.status = 'rejected';
  const { subject, content } = statusMessages[application.status];
  await sendNotification(application.userId, subject, content);
  return await application.save();
};

export const assignApplicationUnit = async (
  applicationId: mongoose.Types.ObjectId,
  unitId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findOne(applicationId);
  if (!application) throw new AppError(404, 'Application not found.');

  if (application.status === 'pending' || application.status === 'rejected') {
    throw new AppError(
      422,
      `Applications that are '${application.status}' cannot have an assigned unit.`,
    );
  }

  // TODO: check the correct status
  // 'waitlisted',
  // 'approved',
  // 'finalized',

  if (await isUnitFull(unitId, { listingId: application.listingId }))
    throw new AppError(422, 'This unit is already full.');

  application.unitId = unitId;
  return await application.save();
};

export const getUnvalidatedApplications = async (listingId: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({
    listingId,
    status: { $in: ['pending', 'waitlisted'] },
  });
};

export const getPendingApplications = async (listingId: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({
    listingId,
    status: 'pending',
  });
};

// user side kapag approved ni manager/landlord
export const finalizeApplication = async (
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findById(applicationId);
  if (!application) return;

  // The only legal states for initial acceptance is from `approved`
  if (application.status !== 'waitlisted')
    throw new AppError(422, `Applications that are '${application.status}' cannot be finalized.`);

  application.status = 'finalized';
  const { subject, content } = statusMessages[application.status];
  await sendNotification(application.userId, subject, content);
  return await application.save();
};

export const addApplicationDocument = async (
  applicationId: mongoose.Types.ObjectId,
  docId: string,
  fileKey: string,
  userId: mongoose.Types.ObjectId,
) => {
  const application = await ApplicationForm.findOne({ _id: applicationId, userId });
  if (!application) throw new AppError(404, 'Application not found.');

  const file = await File.findOne({ key: fileKey, userId });
  if (!file) throw new AppError(404, 'File not found.');

  const document = application.documents.find((doc) => doc.docId === docId);
  if (!document) throw new AppError(404, 'Document requirement not found.');

  if (!document.files.includes(fileKey)) document.files.push(fileKey);
  document.status = 'pending';
  return await application.save();
};
