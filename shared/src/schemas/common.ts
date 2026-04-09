import z from 'zod';
import mongoose from 'mongoose';

export const ObjectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

// Common zod schema for endpoints that use a query containing JSON
//
// Assumes the schema have defaults for empty or missing query case
export const QuerySchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  z.object({
    q: z.string().transform((x): z.infer<z.ZodObject<T>> => schema.parse(x ? JSON.parse(x) : {})),
  }).transform(x => x.q);

export const RangeSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    min: schema,
    max: schema,
  });
