import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const CreateInviteManagerBodySchema = z.object({
  email: z.email(),
});

export const InviteLandlordParamsSchema = z.object({
  inviteId: ObjectIdSchema,
});

export const InviteManagerParamsSchema = z.object({
  inviteId: ObjectIdSchema,
});
