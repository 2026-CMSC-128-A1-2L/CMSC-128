import z from 'zod';
import { ObjectIdSchema } from './common';


// No activities field yet
export const UpdateRentalSchema = z.object({
  status: z.enum(['active', 'ended', 'on_waitlist', 'inactive']).optional(),

  expectedMoveInDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),
  expectedMoveOutDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),

  actualMoveInDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),
  actualMoveOutDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(),
});