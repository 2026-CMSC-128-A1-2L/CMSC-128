import mongoose, { QueryFilter } from 'mongoose';
import { UnverifiedStudent, User } from './user.model';
import { AppError } from '../../error';
import { sendNotification } from '../notification/notification.service';

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

export const createUnverifiedStudent = async (params: CreateUserParams) => {
  const userResult = await User.findOne({ emails: params.email });
  if (userResult) {
    throw new AppError(409, 'User with this email already exists.');
  }

  const newUser = new UnverifiedStudent({
    firstName: params.firstName,
    middleName: params.middleName,
    lastName: params.lastName,
    emails: [params.email],
    auth: {
      google: [params.auth.google],
    },
    profilePicture: params.profilePicture,
  });

  // TODO: check for conflicts
  return await newUser.save();
};

export const createTestUser = async (params: unknown) => {
  const user = new User(params);
  const userResult = await user.save();

  return user;
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ emails: email });
};

export const getUserById = async (userId: mongoose.Types.ObjectId) => {
  return await User.findById(userId);
};

export const deleteUser = async (userId: mongoose.Types.ObjectId) => {
  return await User.updateOne({ _id: userId }, { isActive: false });
};

type GetUsersArguments = {
  userID?: mongoose.Types.ObjectId | null;
  userType?:
    | 'Admin'
    | 'Student'
    | 'Manager'
    | 'Landlord'
    | 'UnverifiedStudent'
    | 'UnverifiedManager'
    | 'UnverifiedLandlord';
};

export const getUsers = async (params: GetUsersArguments) => {
  const filter: QueryFilter<typeof User> = {};
  if (params.userID) {
    filter._id = params.userID;
  }
  if (params.userType) {
    filter.userType = params.userType;
  }

  return await User.find(filter);
};

export const approveUser = async (userId: mongoose.Types.ObjectId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found.');

  if (user.status === 'approved') {
    throw new AppError(422, 'User is already verified.');
  }

  if (user.status !== 'submitted') {
    throw new AppError(422, 'Verification not submitted yet.');
  }

  let documentsAccepted = true;
  user.documents.forEach((doc) => {
    if (doc.status === 'rejected' || doc.status === 'pending') {
      documentsAccepted = false;
    }
  });

  if (!documentsAccepted) {
    throw new AppError(422, 'Not all documents are accepted.');
  }

  // all documents must be accepted first
  if (user.userType === 'UnverifiedStudent') {
    user.status = 'approved';
    user.userType = 'Student';
  } else if (user.userType === 'UnverifiedLandlord') {
    user.status = 'approved';
    user.userType = 'Landlord';
  } else {
    throw new AppError(422, `User of type '${user.userType}' cannot be verified.`);
  }

  await user.save();
  await sendNotification(userId, 'Verification Approved', 'Your account has been verified.');
};

export const rejectUser = async (userId: mongoose.Types.ObjectId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found.');

  if (user.status === 'approved') {
    throw new AppError(422, 'User is already verified.');
  }

  if (user.status !== 'submitted') {
    throw new AppError(422, 'Verification not submitted yet.');
  }

  let documentsAccepted = true;
  user.documents.forEach((doc) => {
    if (doc.status === 'rejected' || doc.status === 'pending') {
      documentsAccepted = false;
    }
  });

  if (documentsAccepted) {
    // TODO: related to comment in router, this may be too restrictive.
    throw new AppError(422, 'Cannot reject a user with complete requirements.');
  }

  if (user.userType === 'UnverifiedStudent' || user.userType === 'UnverifiedLandlord') {
    user.status = 'rejected';
  } else {
    throw new AppError(422, `User of type '${user.userType}' cannot be rejected.`);
  }

  await user.save();
  await sendNotification(userId, 'Verification Rejected', 'Your account has been rejected.');
};
