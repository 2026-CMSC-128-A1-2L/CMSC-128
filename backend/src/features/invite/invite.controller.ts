import type { RequestHandler } from 'express';
import { CreateInviteManagerBodySchema, ObjectIdSchema } from 'shared';
import { sendNotification } from '../notification/notification.service';
import { Invite } from './invite.model';
import { inviteManager, acceptInvite, declineInvite } from './invite.service';

// GET /api/invites
// returns all invites for the logged in user (by their email)
export const routeGetInvites: RequestHandler = async (req, res, next) => {
  const emails = req.user!.emails;

  const invites = await Invite.find({ email: { $in: emails } });

  res.status(200).json({ data: invites });
};

// POST /api/invites
// landlord sends an invite to a manager by email
export const routeInviteManager: RequestHandler = async (req, res, next) => {
  const landlordID = req.user!._id;
  const params = CreateInviteManagerBodySchema.parse(req.body);

  const invite = await inviteManager({
    landlordId: landlordID,
    facilityId: params.facilityId,
    email: params.email,
    permissions: params.permissions,
  });

  res.status(201).json({ data: invite });
};

// POST /api/invites/:inviteId/accept
// logged in user accepts an invite
export const routeAcceptInvite: RequestHandler = async (req, res, next) => {
  const userID = req.user!._id;
  const inviteID = ObjectIdSchema.parse(req.params.inviteId);

  const invite = await acceptInvite(inviteID, userID);
  await sendNotification(
    invite.landlord,
    'Manager Invite Accepted',
    `A manager has accepted your invite for the facility.`,
  );

  res.status(200).json({ data: invite });
};

// POST /api/invites/:inviteId/decline
// logged in user declines an invite
export const routeDeclineInvite: RequestHandler = async (req, res, next) => {
  const userID = req.user!._id;
  const inviteID = ObjectIdSchema.parse(req.params.inviteId);

  const invite = await declineInvite(inviteID, userID);
  await sendNotification(
    invite.landlord,
    'Manager Invite Declined',
    `A manager has declined your invite for the facility.`,
  );

  res.status(200).json({ data: invite });
};
