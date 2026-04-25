import type { RequestHandler } from 'express';
import {
  GetUsersQuerySchema,
  UpdateStudentRequestBodySchema,
  UpdateManagerRequestBodySchema,
  OnboardSelfRequestBodySchema,
  ApproveUserRequestBodySchema,
  ObjectIdSchema,
} from 'shared';
import {
  getUsers,
  getUserById,
  deleteUser,
  approveUser,
  updateSelf,
  rejectUser,
  onboardSelf,
} from './user.service';
import { AppError } from '../../error';
import assert from 'node:assert';
import { UserType } from './user.model';

export const routeGetUsers: RequestHandler = async (req, res, _next) => {
  const params = GetUsersQuerySchema.parse(req.query);
  const users = await getUsers(params);
  res.status(200).json({ data: users });
};

export const routeGetSelf: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const user = await getUserById(req.user._id);
  res.status(200).json({ data: user });
};

export const routeGetUser: RequestHandler = async (req, res, _next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const user = await getUserById(userId);
  if (!user) throw new AppError(404, 'User not found.');
  res.status(200).json({ data: user });
};

export const routeUpdateSelf: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const userId = req.user._id;
  let user: UserType | undefined | null;
  if (req.user.userType === 'Student') {
    const body = UpdateStudentRequestBodySchema.parse(req.body);
    user = await updateSelf(userId, body);
  } else {
    const body = UpdateManagerRequestBodySchema.parse(req.body);
    user = await updateSelf(userId, body);
  }
  if (!user) throw new AppError(404, 'User not found.');
  res.status(200).json({ data: user });
};

export const routeOnboardSelf: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const userId = req.user._id;
  if (req.user.status !== 'setup') throw new AppError(422, 'Already done onboarding.');
  const body = OnboardSelfRequestBodySchema.parse(req.body);
  let user: UserType | undefined | null;
  if (body.userType === 'Student') {
    user = await onboardSelf(userId, body);
  } else {
    user = await onboardSelf(userId, body);
  }
  if (!user) throw new AppError(404, 'User not found.');
  res.status(200).json({ data: user });
};

export const routeDeleteSelf: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const userId = req.user._id;
  const user = await deleteUser(userId);
  if (!user) throw new AppError(404, 'User not found.');
  res.status(200).json({ data: user });
};

export const routeDeleteUser: RequestHandler = async (req, res, _next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const user = await deleteUser(userId);
  if (!user) throw new AppError(404, 'User not found.');
  res.status(200).json({ data: user });
};

export const routeApproveUser: RequestHandler = async (req, res, _next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const body = ApproveUserRequestBodySchema.parse(req.body);
  await approveUser(userId, body);
  res.sendStatus(204);
};

export const routeRejectUser: RequestHandler = async (req, res, _next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  await rejectUser(userId);
  res.sendStatus(204);
};
