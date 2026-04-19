import mongoose, { QueryFilter } from 'mongoose';
import { Student, User, UserType } from './user.model';
import { AppError } from '../../error';
import { sendNotification } from '../notification/notification.service';
import { combineFilters } from '../../middleware';

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

  const newUser = new Student({
    firstName: params.firstName,
    middleName: params.middleName,
    lastName: params.lastName,
    emails: [params.email],
    auth: {
      google: [params.auth.google],
    },
    // TODO: fill with required documents
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

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ emails: email }).lean();
};

export const getUserById = async (userId: mongoose.Types.ObjectId) => {
  return await User.findById(userId).lean();
};

export const deleteUser = async (userId: mongoose.Types.ObjectId) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        status: 'disabled',
        'auth.google': [],
        emails: [],
        documents: [],
      },
      $unset: {
        address: '',
        contact: '',
        profilePicture: '',
      },
    },
    { returnDocument: 'after' },
  ).lean();
};

type GetUsersArguments = {
  userID?: mongoose.Types.ObjectId | null;
  userType?: 'Admin' | 'Student' | 'Manager' | 'Landlord';
};

export const getUsers = async (params: GetUsersArguments) => {
  const filter: QueryFilter<typeof User> = {};
  if (params.userID) {
    filter._id = params.userID;
  }
  if (params.userType) {
    filter.userType = params.userType;
  }

  return await User.find(filter).lean();
};

type ApproveUserParams = {
  degreeProgram: string;
  studentNumber: string;
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
    user.verificationStatus = 'approved';
    user.status = 'verified';
    assert.ok(params);
    const student = Student.hydrate(user.toObject());
    student.degreeProgram = params.degreeProgram;
    student.studentNumber = params.studentNumber;
    await user.save();
  } else if (user.userType === 'Landlord') {
    user.verificationStatus = 'approved';
    user.status = 'verified';
    await user.save();
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
  profilePicture: string;
  address: string;
  contact: string;
}>;

export const updateSelf = async (userId: mongoose.Types.ObjectId, params: UpdateUserParameters) => {
  return await User.findOneAndUpdate({ _id: userId }, params, {
    returnDocument: 'after',
  }).lean();
};
