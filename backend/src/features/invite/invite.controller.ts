import type { RequestHandler } from 'express';
import { CreateInviteManagerBodySchema } from 'shared';
import { sendNotification } from '../notification/notification.service.js';
import { inviteManager, acceptInvite, declineInvite, getInvites } from './invite.service.js';
import { AppError } from '../../error.js';
import { Invite } from './invite.model.js';
import z from 'zod';
import assert from 'node:assert';

// returns all invites for the logged in user (by their email)
export const routeGetInvites: RequestHandler = async (_req, res, _next) => {
  res.status(200).json({ data: await getInvites(res.locals.filters) });
};

// landlord sends an invite to a manager by email
export const routeInviteManager: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const landlordId = req.user._id;
  const { facilityId, email, permissions } = CreateInviteManagerBodySchema.parse(req.body);
  const invite = await inviteManager(landlordId, facilityId, email, permissions);
  res.status(201).json({ data: invite });
};

// manager accepts an invite from landlord
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

// manager declines an invite
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

// get specific invites
export const routeGetInviteById: RequestHandler = async (req, res, next) => {
  const token = z.string().parse(req.params.inviteId);
  const invite = await Invite.findOne({ token, ...res.locals.filters });
  if (!invite) throw new AppError(404, 'Invite not found.');
  res.status(200).json({ data: invite });
};

// landlord to delete/retract invites to add a manager
export const routeDeleteInvite: RequestHandler = async (req, res, next) => {
  assert.ok(req.user);
  const token = z.string().parse(req.params.inviteId);
  const invite = await Invite.findOne({ token, landlordId: req.user._id });
  if (!invite) throw new AppError(404, 'Invite not found.');
  if (invite.status !== 'pending') throw new AppError(400, 'Can only cancel pending invites.');
  await invite.deleteOne();
  res.sendStatus(204);
};
