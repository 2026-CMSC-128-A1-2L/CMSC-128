import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /invites
export const CreateInviteManagerBodySchema = z.object({
  facilityId: ObjectIdSchema,

  // manager email
  email: z.email(),
});
