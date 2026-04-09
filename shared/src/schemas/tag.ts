import z from 'zod';
import { ObjectIdSchema } from './common';

export const DataTypeSchema = z.discriminatedUnion('name', [
  z.object({
    name: z.literal('enum'),
    values: z.array(z.string()).min(1),
  }),
  z.object({
    name: z.literal('numeric'),
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  z.object({
    name: z.literal('boolean'),
  }),
]);

// POST /tags
export const CreateTagBodySchema = z.object({
  name: z.string(),
  displayName: z.string(),
  isRequired: z.boolean(),
  dataType: DataTypeSchema,
});

// PATCH /tags/:tagName
export const UpdateTagBodySchema = z.object({
  displayName: z.string().optional(),
  isRequired: z.boolean().optional(),
  dataType: DataTypeSchema.optional(),
});
