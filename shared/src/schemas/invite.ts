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

export const CreateInviteStudentBodySchema = z.object({
  facilityId: ObjectIdSchema,
  unitId: ObjectIdSchema,
  email: z.email(),
});
