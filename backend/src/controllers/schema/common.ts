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

// Common zod schema for endpoints that use a query containing JSON
export const QuerySchema = z.object({
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  q: z.string().transform((x) => (x ? JSON.parse(x) : {})),
});
