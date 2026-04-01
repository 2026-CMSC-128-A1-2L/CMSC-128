import z from 'zod';
import { ObjectIdSchema } from './common.js';
import { student } from '../../../tests/integration/setup.js';


// POST /transfers
export const CreateTransferBodySchema = z.object({
  studentID: ObjectIdSchema,
  unitID: ObjectIdSchema,
  status: z.enum(['pending', 'approved', 'cancelled']).default('pending'),
  description: z.string().optional(),
});

// UPDATE /transfers/:transferRequestId
export const CancelTransferBodySchema = z.object({
  transferRequestID: ObjectIdSchema
});