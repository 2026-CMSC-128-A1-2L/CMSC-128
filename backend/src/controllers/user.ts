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

export const routeGetUserById: RequestHandler = async (req, res, next) => {
  const userID = ObjectIdSchema.parse(req.params.userId);
  const user = await getUserById(userID);

  res.status(200).json({ data: user });
};

export const routeUpdateUser: RequestHandler = async (req, res, next) => { };
export const routeDeleteUser: RequestHandler = async (req, res, next) => {
  const userID = ObjectIdSchema.parse(req.params.userId);
  const user = await deleteUser(userID);

  res.status(200).json({ data: user });
};
export const routeGetApplicationsByStudent: RequestHandler = async (req, res, next) => { };
export const routeGetVisitBookingsByStudent: RequestHandler = async (req, res, next) => { };
