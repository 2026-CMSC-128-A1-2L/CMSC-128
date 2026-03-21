import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const CreateTransferBodySchema = z.object({
  unitID: ObjectIdSchema,
  description: z.string().optional(),
});

export const TransferParamsSchema = z.object({
  transferId: ObjectIdSchema,
});
