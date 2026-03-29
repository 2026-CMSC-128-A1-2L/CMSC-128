import { RequestHandler } from 'express';
import { GetUsersQuerySchema, UserFilterSchema } from './schema/user';
import { ObjectIdSchema } from './schema/common';
import { deleteUser, getUserById, getUsers } from '../services/user';

export const routeGetUsers: RequestHandler = async (req, res, next) => {
  const searchQuery = GetUsersQuerySchema.parse(req.query);

  const params = UserFilterSchema.parse(searchQuery.q);
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
export const routeGetApplicationsByStudent: RequestHandler = async (req, res, next) => {};
export const routeGetVisitBookingsByStudent: RequestHandler = async (req, res, next) => {};
export const routeGetDocuments: RequestHandler = async (req, res, next) => {};
export const routeAddDocument: RequestHandler = async (req, res, next) => {};
export const routeDeleteDocument: RequestHandler = async (req, res, next) => {};
export const routeApproveUser: RequestHandler = async (req, res, next) => {};
export const routeRejectUser: RequestHandler = async (req, res, next) => {};
