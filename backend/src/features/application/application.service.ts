import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error';
import {
  ApplicationForm,
  type ApplicationStatusType,
  type ApplicationType,
} from './application.model';
import { sendNotification } from '../notification/notification.service';
import { Unit } from '../unit/unit.model';
import { Rental } from '../rental/rental.model';
import { buildQuery, type NullablePartial } from '../../utils';
import z from 'zod';
import { DateTimeSchema, ObjectIdSchema } from 'shared';
import { combineFilters } from '../../middleware';

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
) => {
  const newApplication = new ApplicationForm({ userId, listingId });
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

export const getApplications = async (
  query: GetApplicationsArguments,
  filters: QueryFilter<ApplicationType>,
) => {
  const queryFilter = buildQuery<ApplicationType>(query);
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
    .sort({ createdAt: -1, _id: -1 })
    .limit(query.limit)
    .lean();

  return await queryExec;
};

export const getApplicationById = async (
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  return await ApplicationForm.where(filters).findById(applicationId);
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

const statusMessages: Record<string, { subject: string; content: string }> = {
  'manager-approved': {
    subject: 'Application Approved',
    content: 'Your application has been approved by the manager.',
  },
  'manager-rejected': {
    subject: 'Application Rejected',
    content: 'Your application has been rejected by the manager.',
  },
  'manager-waitlisted': {
    subject: 'Application Waitlisted',
    content: 'Your application has been waitlisted by the manager.',
  },
  'landlord-approved': {
    subject: 'Application Approved',
    content: 'Your application has been approved by the landlord.',
  },
  'landlord-rejected': {
    subject: 'Application Rejected',
    content: 'Your application has been rejected by the landlord.',
  },
  'landlord-waitlisted': {
    subject: 'Application Waitlisted',
    content: 'Your application has been waitlisted by the landlord.',
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

export const approveApplication = async (
  isFinal: boolean,
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findById(applicationId);
  if (!application) return;

  if (isFinal) {
    // The only legal states for final acceptance is from
    // `manager-approved` and `manager-waitlisted`.
    //
    // TODO: clarify this case. Landlord should be able to override an application
    // that is rejected by a manager. But this also means that the requirements are
    // not met.
    //
    // throw new AppError(422, "Cannot accept an application rejected by a manager.");
    if (application.status === 'waitlisted') {
      application.status = 'approved';
      const { subject, content } = statusMessages[application.status];
      await sendNotification(application.userId, subject, content);
      return await application.save();
    }

    throw new AppError(422, `Applications that are '${application.status}' cannot be approved.`);
  } else {
    // The only legal states for initial acceptance is from `pending`
    if (application.status === 'pending') {
      application.status = 'waitlisted';
      const { subject, content } = statusMessages[application.status];
      await sendNotification(application.userId, subject, content);
      return await application.save();
    }

    throw new AppError(422, `Applications that are '${application.status}' cannot be approved.`);
  }
};

export const rejectApplication = async (
  isFinal: boolean,
  applicationId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findById(applicationId);
  if (!application) return;

  if (isFinal) {
    // The only legal states for final rejection is from `manager-approved` and `manager-waitlisted`.
    //
    // throw new AppError(422, "Cannot accept an application rejected by a manager.");
    if (application.status === 'waitlisted' || application.status === 'pending') {
      application.status = 'rejected';
      const { subject, content } = statusMessages[application.status];
      await sendNotification(application.userId, subject, content);
      return await application.save();
    }

    throw new AppError(422, `Applications that are '${application.status}' cannot be rejected.`);
  } else {
    // The only legal states for initial acceptance is from `pending`
    if (application.status === 'pending') {
      application.status = 'rejected';
      const { subject, content } = statusMessages[application.status];
      await sendNotification(application.userId, subject, content);
      return await application.save();
    }

    throw new AppError(422, `Applications that are '${application.status}' cannot be rejected.`);
  }
};

export const assignApplicationUnit = async (
  applicationId: mongoose.Types.ObjectId,
  unitId: mongoose.Types.ObjectId,
  filters: QueryFilter<ApplicationType>,
) => {
  const application = await ApplicationForm.where(filters).findOne(applicationId);
  if (!application) throw new AppError(404, 'Application not found.');

  // TODO: check the correct status
  // 'waitlisted',
  // 'approved',
  // 'contract-signed',

  // Only units that are in the correct listing
  const unit = await Unit.findOne({ _id: unitId, listingId: application.listingId });
  if (!unit) throw new AppError(404, 'Unit not found.');

  // Count active rentals
  //
  // TODO: if this is too slow, add an index or keep the count in the unit
  const activeRentals = await Rental.find({ unitId, status: 'active' });

  // If the unit is full, don't add
  if (unit.capacity === activeRentals.length) throw new AppError(422, 'This unit is already full.');

  application.unitId = unitId;
  return await application.save();
};
