import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';
import { USER_TYPES } from '../constants.js';

const StudentPreferenceSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean()]),
);
const ScheduleSchema = z.object({});

const BaseProfileSchema = z.object({
  profilePicture: z.url(),
  address: z.string(),
  contact: z.string(),
});

// PATCH /users/:userId
export const UpdateStudentRequestBodySchema = BaseProfileSchema.partial().extend({
  preferences: StudentPreferenceSchema.optional(),
});

export const UpdateManagerRequestBodySchema = BaseProfileSchema.partial().extend({
  schedules: ScheduleSchema.optional(),
});

// POST /users/:userId/onboard
const OnboardStudentRequestBodySchema = BaseProfileSchema.partial().extend({
  userType: z.literal('Student'),
  preferences: StudentPreferenceSchema.optional(),
});

const OnboardManagerRequestBodySchema = BaseProfileSchema.partial().extend({
  userType: z.enum(['Manager', 'Landlord']),
});

export const OnboardSelfRequestBodySchema = z.discriminatedUnion('userType', [
  OnboardStudentRequestBodySchema,
  OnboardManagerRequestBodySchema,
]);

// POST /users/:userId/approve
export const ApproveUserRequestBodySchema = z
  .object({
    degreeProgram: z.string(),
    studentNumber: z.string().regex(/^[0-9]{9}$/, 'Must be exactly 9 digits'),
  })
  .optional();

// GET /users
export const UserFilterSchema = z.object({
  userId: ObjectIdSchema.optional(),
  userType: z.enum(USER_TYPES).optional(),
});

export const GetUsersQuerySchema = QuerySchema(UserFilterSchema);
