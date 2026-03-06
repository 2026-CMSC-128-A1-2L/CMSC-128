import { RequestHandler } from 'express';
import z from 'zod';
import { createTestUser, getUserByEmail } from '../services/user';
import { AppError } from './error';
import { promisify } from 'util';

const userType = {
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string(),
  auth: z.object({
    google: z.string().optional(),
  }),
  profilePicture: z.string().optional(),
} as const;

const verificationSchema = {
  verification: z.object({
    documentUrls: z.record(z.string(), z.string()),
    status: z.enum(['pending', 'submitted', 'rejected', 'approved']),
  }),
};

const testRegisterSchema = z.discriminatedUnion('userType', [
  z.object({ userType: z.literal('Admin'), ...userType }),
  z.object({ userType: z.literal('UnverifiedLandlord'), ...userType, ...verificationSchema }),
  z.object({ userType: z.literal('UnverifiedManager'), ...userType, ...verificationSchema }),
  z.object({ userType: z.literal('UnverifiedStudent'), ...userType, ...verificationSchema }),
  z.object({ userType: z.literal('Landlord'), ...userType, contact: z.string() }),
  z.object({ userType: z.literal('Manager'), ...userType, contact: z.string() }),
  z.object({
    userType: z.literal('Student'),
    ...userType,
    degreeProgram: z.string().optional(),
    studentNumber: z.string(),
  }),
]);

export const routeTestRegister: RequestHandler = async (req, res, next) => {
  const params = testRegisterSchema.parse(req.body);
  return res.status(200).send(await createTestUser(params));
};

const testLoginSchema = z.object({
  email: z.string(),
});

export const routeTestLogin: RequestHandler = async (req, res, next) => {
  const params = testLoginSchema.parse(req.body);
  const user = await getUserByEmail(params.email);
  if (!user) {
    return next(new AppError(404, 'User not found.'));
  }

  await promisify(req.login.bind(req))(user);
  res.status(200).send();
};
