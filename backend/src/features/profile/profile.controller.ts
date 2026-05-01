import type { RequestHandler } from 'express';
import { ObjectIdSchema } from 'shared';
import { getProfile } from './profile.service.js';

export const routeGetProfile: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  res.status(200).send({ data: await getProfile(userId) });
};
