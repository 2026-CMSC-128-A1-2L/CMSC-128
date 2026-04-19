import { RequestHandler } from 'express';
import { GetUsersQuerySchema, UpdateUserRequestBodySchema, ObjectIdSchema } from 'shared';
import {
  getUsers,
  getUserById,
  deleteUser,
  approveUser,
  updateUser,
  rejectUser,
} from './user.service';
import { AppError } from '../../error';

export const routeGetUsers: RequestHandler = async (req, res, next) => {
  const params = GetUsersQuerySchema.parse(req.query);
  const users = await getUsers(params);
  res.status(200).json({ data: users });
};

export const routeGetSelf: RequestHandler = async (req, res, next) => {
  const user = await getUserById(req.user!._id);
  res.status(200).json({ data: user });
};

export const routeGetUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const user = await getUserById(userId);
  if (!user) return next(new AppError(404, 'User not found.'));
  res.status(200).json({ data: user });
};

export const routeUpdateUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const body = UpdateUserRequestBodySchema.parse(req.body);
  const user = await updateUser(userId, body, res.locals.filters);
  if (!user) return next(new AppError(404, 'User not found.'));
  res.status(200).json({ data: user });
};

export const routeDeleteUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const user = await deleteUser(userId, res.locals.filters);
  if (!user) return next(new AppError(404, 'User not found.'));
  res.status(200).json({ data: user });
};

export const routeApproveUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  await approveUser(userId);
  res.sendStatus(204);
};

export const routeRejectUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  await rejectUser(userId);
  res.sendStatus(204);
};
