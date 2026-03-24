import z from 'zod';
import { ObjectIdSchema } from './common';

export const GetUsersQuerySchema = z.object({
  q: z.string().transform((x) => (x ? JSON.parse(x) : {})),
});

export const UserSearchQuerySchema = z.object({
  userID: ObjectIdSchema.optional(),
  userType: z
    .enum([
      'Admin',
      'Student',
      'Manager',
      'Landlord',
      'UnverifiedStudent',
      'UnverifiedManager',
      'UnverifiedLandlord',
    ])
    .optional(),
});
