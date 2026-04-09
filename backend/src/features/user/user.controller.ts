import { RequestHandler } from 'express';
import { GetUsersQuerySchema, ObjectIdSchema } from 'shared';
import { getUsers, getUserById, deleteUser, approveUser } from './user.service';

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
  await approveUser(userId);
  res.sendStatus(204);
};

export const routeRejectUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  await approveUser(userId);
  res.sendStatus(204);
};
