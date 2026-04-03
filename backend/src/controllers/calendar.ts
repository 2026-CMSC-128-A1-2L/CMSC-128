import { RequestHandler } from 'express';
import z from 'zod';
import { getCalendar } from '../services/calendar.js';

export const routeGetCalendar: RequestHandler = async (req, res, next) => {
  const params = z.object({
    year: z.coerce.number().int().min(2000).max(2100),
    month: z.coerce.number().int().min(1).max(12),
  }).parse(req.query);

  const user = req.user!;
  const events = await getCalendar(user._id, user.userType, params.year, params.month);

  res.status(200).json({ data: events });
};
