import z from 'zod';
import { ObjectIdSchema } from './common.js';

const USER_TYPES = [
  'Admin',
  'Landlord',
  'Manager',
  'Student',
  'UnverifiedLandlord',
  'UnverifiedManager',
  'UnverifiedStudent',
] as const;

export const UpdateUserBodySchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().nullable().optional(),
  lastName: z.string().optional(),
  birthDate: z.iso.date().optional(),
  profilePicture: z.url().nullable().optional(),
  contact: z.string().optional(),
  studentNumber: z.string().optional(),
  degreeProgram: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const GetUserByIdParamsSchema = z.object({
  userId: ObjectIdSchema,
});

export const GetUserApplicationsParamsSchema = z.object({
  userId: ObjectIdSchema,
});

export const GetUserVisitsParamsSchema = z.object({
  userId: ObjectIdSchema,
});

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
