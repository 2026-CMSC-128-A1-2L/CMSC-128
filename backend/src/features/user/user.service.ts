import mongoose, { QueryFilter } from 'mongoose';
import { UnverifiedStudent, User } from './user.model';

export type CreateUserParams = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  auth: {
    google?: string;
  };
  profilePicture?: string;
};

export const createUnverifiedStudent = async (params: CreateUserParams) => {
  const userResult = await UnverifiedStudent.findOneAndUpdate({ email: params.email }, params, {
    returnDocument: 'after',
    upsert: true,
    includeResultMetadata: true,
  });

  const user = userResult.value;

  if (!user) {
    throw new Error('User should not be null after upsert');
  }

  // TODO: verify that this does not leak data
  return user;
};

export const createTestUser = async (params: unknown) => {
  const user = new User(params);
  const userResult = await user.save();

  return user;
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
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
