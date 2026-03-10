import { UnverifiedStudent, User } from '../models/user/User';

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
