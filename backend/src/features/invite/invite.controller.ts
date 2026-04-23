import type { RequestHandler } from 'express';
import { CreateInviteManagerBodySchema } from 'shared';
import { sendNotification } from '../notification/notification.service';
import { inviteManager, acceptInvite, declineInvite, getInvites } from './invite.service';
import z from 'zod';

// GET /api/invites
// returns all invites for the logged in user (by their email)
export const routeGetInvites: RequestHandler = async (_req, res, _next) => {
  res.status(200).json({ data: await getInvites(res.locals.filters) });
};

// POST /api/invites
// landlord sends an invite to a manager by email
export const routeInviteManager: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const landlordId = req.user._id;
  const { facilityId, email, permissions } = CreateInviteManagerBodySchema.parse(req.body);
  const invite = await inviteManager(landlordId, facilityId, email, permissions);
  res.status(201).json({ data: invite });
};

// POST /api/invites/:token/accept
// logged in user accepts an invite
export const routeAcceptInvite: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const token = z.string().parse(req.params.token);
  const invite = await acceptInvite(token, req.user.emails);
  await sendNotification(
    invite.landlordId,
    'Manager Invite Accepted',
    `A manager has accepted your invite for the facility.`,
  );

  res.sendStatus(204);
};

// POST /api/invites/:token/decline
// logged in user declines an invite
export const routeDeclineInvite: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const token = z.string().parse(req.params.token);
  const invite = await declineInvite(token, req.user.emails);
  await sendNotification(
    invite.landlordId,
    'Manager Invite Declined',
    `A manager has declined your invite for the facility.`,
  );

  res.sendStatus(204);
};
