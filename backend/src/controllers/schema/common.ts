import z from 'zod';
import mongoose from 'mongoose';

export const ObjectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const LocationSchema = z.object({
  coordinates: z
    .array(z.number())
    .refine((x) => x.length === 2)
    .optional(),
  text: z.string().optional(),
});
