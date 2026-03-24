import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /transfers
export const CreateTransferBodySchema = z.object({
  unitId: ObjectIdSchema,
  description: z.string().optional(),
});
