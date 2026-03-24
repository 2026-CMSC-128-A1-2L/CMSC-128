import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';
import { USER_TYPES } from '../../constants.js';

// PATCH /users/:userId
export const UpdateUserBodySchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().nullable().optional(),
  lastName: z.string().optional(),
  birthDate: z.iso.date().transform(x => new Date(x)).optional(),
  profilePicture: z.url().nullable().optional(),
  contact: z.string().optional(),
  studentNumber: z.string().optional(),
  degreeProgram: z.string().optional(),
  isActive: z.boolean().optional(),
});

// GET /users
export const GetUsersQuerySchema = QuerySchema;

export const UserFilterSchema = z.object({
  userId: ObjectIdSchema.optional(),
  userType: z.enum(USER_TYPES).optional(),
});
