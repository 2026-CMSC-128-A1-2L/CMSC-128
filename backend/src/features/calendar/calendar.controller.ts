import type { RequestHandler } from 'express';
import z from 'zod';
import { getCalendar } from './calendar.service';

export const routeGetCalendar: RequestHandler = async (req, res, next) => {
  const params = z
    .object({
      year: z.coerce.number().int().min(2000).max(2100),
      month: z.coerce.number().int().min(1).max(12),
    })
    .parse(req.query);

  const user = req.user!;
  const events = await getCalendar(user._id, user.userType!, params.year, params.month);

  res.status(200).json({ data: events });
};

export const routeGetUpcomingEvents: RequestHandler = async (req, res, next) => {
  const user = req.user!;
  // get next 30 days of events
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const events = await getCalendar(user._id, user.userType!, year, month);
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  res.status(200).json({ data: upcoming });
};
