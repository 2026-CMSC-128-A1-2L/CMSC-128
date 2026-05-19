import mongoose from 'mongoose';
import type { ClientSession, QueryFilter } from 'mongoose';
import { Student, User } from './user.model.js';
import { AppError } from '../../error.js';
import { sendNotification } from '../notification/notification.service.js';
import { UserStatus, UserTypeType } from 'shared';
import type { StudentPreferences } from 'shared';
import { File } from '../file/file.model.js';

export type CreateUserParams = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  auth: {
    google: string;
  };
  profilePicture?: string;
};

export const createUser = async (params: CreateUserParams) => {
  const userResult = await User.findOne({
    $or: [{ emails: params.email }, { email: params.email }, { 'auth.google': params.auth.google }],
    status: { $in: ['setup', 'verified', 'unverified'] },
  }).lean();

  if (userResult) {
    const updates: { $set?: Record<string, unknown>; $addToSet?: Record<string, unknown> } = {};
    if (!userResult.email) updates.$set = { email: params.email };
    if (!userResult.emails?.includes(params.email)) {
      updates.$addToSet = { emails: params.email };
    }
    if (!userResult.auth.google?.includes(params.auth.google)) {
      updates.$addToSet = { ...updates.$addToSet, 'auth.google': params.auth.google };
    }
    if (Object.keys(updates).length > 0) {
      await User.updateOne({ _id: userResult._id }, updates);
      return await User.findById(userResult._id).lean();
    }
    return userResult;
  }

  const newUser = new User({
    email: params.email,
    firstName: params.firstName,
    middleName: params.middleName,
    lastName: params.lastName,
    emails: [params.email],
    auth: {
      google: [params.auth.google],
    },
    documents: [],
    profilePicture: params.profilePicture,
  });

  return await newUser.save();
};

export const createTestUser = async (params: unknown) => {
  const user = new User(params);
  const userResult = await user.save();

  return userResult;
};

export const getUserByEmail = async (email: string, session?: ClientSession) => {
  if (session) {
    return await User.findOne({ $or: [{ emails: email }, { email }] })
      .session(session)
      .lean();
  } else {
    return await User.findOne({ $or: [{ emails: email }, { email }] }).lean();
  }
};

export const getUserById = async (userId: mongoose.Types.ObjectId) => {
  return await User.findById(userId).lean();
};

export const deleteUser = async (userId: mongoose.Types.ObjectId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId, status: { $ne: 'disabled' } },
    {
      $set: {
        status: 'disabled',
        'auth.google': [],
      },
    },
    { returnDocument: 'after' },
  ).lean();
  if (!user) throw new AppError(404, 'User not found.');

  const db = mongoose.connection.db;
  if (db) {
    await db.collection('sessions').deleteMany({
      'session.passport.user': userId.toHexString(),
    });
  }

  return user;
};

type GetUsersArguments = {
  userId?: mongoose.Types.ObjectId | null;
  userType?: UserTypeType;
  status?: UserStatus;
  verificationStatus?: 'pending' | 'submitted' | 'rejected' | 'approved';
};

export const getUsers = async (params: GetUsersArguments) => {
  const filter: QueryFilter<typeof User> = {};
  if (params.userId) {
    filter._id = params.userId;
  }
  if (params.userType) {
    filter.userType = params.userType;
  }
  if (params.status) {
    filter.status = params.status;
  }
  if (params.verificationStatus) {
    filter.verificationStatus = params.verificationStatus;
  }

  return await User.find(filter).lean();
};

type SubmitVerificationParameters = {
  documents: {
    docId: string;
    name: string;
    fileIds: string[];
  }[];
};

export const submitVerification = async (
  userId: mongoose.Types.ObjectId,
  params: SubmitVerificationParameters,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found.');
  if (user.status === 'setup') throw new AppError(422, 'Finish onboarding first.');
  if (user.status === 'verified' || user.verificationStatus === 'approved') {
    throw new AppError(422, 'User is already verified.');
  }
  if (user.status === 'disabled') throw new AppError(422, 'Disabled users cannot be verified.');

  const uniqueFileIds = [...new Set(params.documents.flatMap((doc) => doc.fileIds))];
  const ownedFileCount = await File.countDocuments({ key: { $in: uniqueFileIds }, userId });
  if (ownedFileCount !== uniqueFileIds.length) {
    throw new AppError(422, 'One or more uploaded files were not found.');
  }

  user.documents = params.documents.map((doc) => ({
    docId: doc.docId,
    name: doc.name,
    status: 'pending',
    files: [...new Set(doc.fileIds)],
  }));
  user.verificationStatus = 'submitted';
  user.status = user.status === 'inactive' ? 'inactive' : 'unverified';

  return await user.save();
};

type ApproveUserParams = {
  degreeProgram?: string;
  studentNumber?: string;
};

export const approveUser = async (userId: mongoose.Types.ObjectId, params?: ApproveUserParams) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found.');
  if (user.status === 'disabled') throw new AppError(422, 'User cannot be approved.');

  if (user.verificationStatus === 'approved') {
    throw new AppError(422, 'User is already verified.');
  }

  if (user.verificationStatus !== 'submitted') {
    throw new AppError(422, 'Verification not submitted yet.');
  }

  let documentsAccepted = true;
  for (const doc of user.documents) {
    if (doc.status === 'rejected' || doc.status === 'pending') {
      documentsAccepted = false;
    }
  }

  if (!documentsAccepted) {
    throw new AppError(422, 'Not all documents are accepted.');
  }

  // all documents must be accepted first
  if (user.userType === 'Student') {
    if (!params?.degreeProgram || !params.studentNumber) {
      throw new AppError(422, 'Student number and degree program are required.');
    }
    await Student.findByIdAndUpdate(userId, {
      $set: {
        verificationStatus: 'approved',
        status: 'verified',
        degreeProgram: params.degreeProgram,
        studentNumber: params.studentNumber,
      },
    });
  } else if (user.userType === 'Landlord') {
    await User.findByIdAndUpdate(userId, {
      $set: {
        verificationStatus: 'approved',
        status: 'verified',
      },
    });
  } else {
    throw new AppError(422, `User of type '${user.userType}' cannot be verified.`);
  }

  await sendNotification(userId, 'Verification Approved', 'Your account has been verified.');
};

export const rejectUser = async (userId: mongoose.Types.ObjectId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found.');

  if (user.verificationStatus === 'approved') {
    throw new AppError(422, 'User is already verified.');
  }

  if (user.verificationStatus !== 'submitted') {
    throw new AppError(422, 'Verification not submitted yet.');
  }

  let documentsAccepted = true;
  for (const doc of user.documents) {
    if (doc.status === 'rejected' || doc.status === 'pending') {
      documentsAccepted = false;
    }
  }

  if (documentsAccepted) {
    throw new AppError(422, 'Cannot reject a user with complete requirements.');
  }

  if (user.userType === 'Student' || user.userType === 'Landlord') {
    user.verificationStatus = 'rejected';
  } else {
    throw new AppError(422, `User of type '${user.userType}' cannot be rejected.`);
  }

  await user.save();
  await sendNotification(userId, 'Verification Rejected', 'Your account has been rejected.');
};

type UpdateUserParameters = Partial<{
  firstName: string;
  middleName: string;
  lastName: string;
  profilePicture: string;
  address: string;
  contact: string;
}>;

type UpdateStudentParameters = UpdateUserParameters & {
  preferences?: StudentPreferences;
};

// TODO: handle additional landlord and manager parameters
type UpdateManagerParameters = UpdateUserParameters;

type OnboardStudentParameters = UpdateUserParameters & {
  userType: 'Student';
  preferences?: StudentPreferences;
};

type OnboardManagerParameters = UpdateUserParameters & {
  userType: 'Manager' | 'Landlord';
};

export const updateSelf = async (
  userId: mongoose.Types.ObjectId,
  params: UpdateStudentParameters | UpdateManagerParameters,
) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { $set: params },
    {
      returnDocument: 'after',
    },
  ).lean();
};

export const onboardSelf = async (
  userId: mongoose.Types.ObjectId,
  params: OnboardStudentParameters | OnboardManagerParameters,
) => {
  const { userType, ...profileParams } = params;
  return await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        ...profileParams,
        userType,
        status: 'unverified',
      },
    },
    {
      returnDocument: 'after',
      overwriteDiscriminatorKey: true,
    },
  ).lean();
};
