import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';
import { USER_TYPES } from '../constants.js';

// PATCH /users/:userId
export const UpdateUserRequestBodySchema = z
  .object({
    profilePicture: z.url(),
    address: z.string(),
    contact: z.string(),
    degreeProgram: z.string(),
    studentNumber: z.string().regex(/^[0-9]{9}$/, 'Must be exactly 9 digits'),
  })
  .partial();

// GET /users
export const UserFilterSchema = z.object({
  userId: ObjectIdSchema.optional(),
  userType: z.enum(USER_TYPES).optional(),
});

export const GetUsersQuerySchema = QuerySchema(UserFilterSchema);
