import z from 'zod';
import { ObjectIdSchema } from './common.js';
import { ManagerPermissionSchema } from './facility.js';

// POST /invites
export const CreateInviteManagerBodySchema = z.object({
  facilityId: ObjectIdSchema,

  // manager email
  email: z.email(),

  // permissions to grant upon acceptance
  permissions: ManagerPermissionSchema,
});
