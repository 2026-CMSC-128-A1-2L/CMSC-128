import z from 'zod';
import { ObjectIdSchema } from './common';


const BaseProfileSchema = z.object({
  id: ObjectIdSchema,
  contact: z.string().nullish(),
  emails: z.array(z.string()),
  firstName: z.string(),
  middleName: z.string().nullish(),
  lastName: z.string(),
  profilePicture: z.string().nullish(),
  facilities: z.array(
    z.object({
      id: ObjectIdSchema,
      name: z.string(),
    })
  )
})

const LeanUserSchema = z.object({

  id: ObjectIdSchema,
  firstName: z.string(),
  middleName: z.string().nullish(),
  lastName: z.string(),
});

const ManagerProfileSchema = BaseProfileSchema.extend({
  userType: z.literal('Manager'),
  employers: z.array(LeanUserSchema)
});

const LandlordProfileSchema = BaseProfileSchema.extend({
  userType: z.literal('Landlord'),
  employees: z.array(LeanUserSchema)
});

export const ProfileSchema = z.discriminatedUnion('userType', [
  ManagerProfileSchema,
  LandlordProfileSchema,
])

