import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /invites
export const CreateInviteManagerBodySchema = z.object({
  facilityID: ObjectIdSchema,

  // manager email
  email: z.email(),
});
