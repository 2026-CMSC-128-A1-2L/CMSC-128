import type { RequestHandler } from 'express';

export const routeGetActivities: RequestHandler = async (_req, res, _next) => {
  res.status(200).json({ data: [] });
};
