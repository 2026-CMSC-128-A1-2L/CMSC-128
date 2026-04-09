import { RequestHandler } from 'express';
import { GetUsersQuerySchema, ObjectIdSchema } from 'shared';
import { sendNotification } from '../notification/notification.service';
import { User } from './user.model';
import { getUsers, getUserById, deleteUser } from './user.service';

export const routeGetUsers: RequestHandler = async (req, res, next) => {
  const params = GetUsersQuerySchema.parse(req.query);
  const users = await getUsers(params);

  res.status(200).json({ data: users });
};

export const routeGetUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const user = await getUserById(userId);

  res.status(200).json({ data: user });
};

export const routeUpdateUser: RequestHandler = async (req, res, next) => {};
export const routeDeleteUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const user = await deleteUser(userId);

  res.status(200).json({ data: user });
};

export const routeApproveUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  await User.findByIdAndUpdate(userId, { userType: 'Student' });
  await sendNotification(userId, 'Verification Approved', 'Your account has been verified.');
  res.status(200).json({ message: 'User approved successfully.' });
};

export const routeRejectUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  await User.findByIdAndUpdate(userId, { isActive: false });
  await sendNotification(
    userId,
    'Verification Rejected',
    'Your account verification has been rejected.',
  );
  res.status(200).json({ message: 'User rejected successfully.' });
};
