import z from 'zod';
import { ObjectIdSchema } from './common.js';

const ManagerPermissionSchema = z.object({
  manageBillings: z.boolean().default(false),
  manageApplications: z.boolean().default(false),
  manageListings: z.boolean().default(false),
});

// POST /invites
export const CreateInviteManagerBodySchema = z.object({
  facilityId: ObjectIdSchema,

  // manager email
  email: z.email(),

  // permissions to grant upon acceptance
  permissions: ManagerPermissionSchema,
});
