import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /transfers
export const CreateTransferBodySchema = z.object({
  unitId: ObjectIdSchema,
  reasonCategory: z
    .enum(['academic', 'financial', 'personal', 'medical', 'relocation', 'other'])
    .optional(),
  intendedTransferDate: z.coerce.date().optional(),
  description: z.string().optional(),
  transferFee: z.number().nonnegative().optional(),
  depositHandling: z.enum(['refunded', 'transferred', 'forfeited']).optional(),
  advanceRentStatus: z.enum(['credited', 'forfeited', 'transferred']).optional(),
  documents: z
    .array(
      z.object({
        docId: z.string().min(1),
        name: z.string().min(1),
        fileIds: z.array(z.string().min(1)).min(1),
      }),
    )
    .optional(),
  termsAccepted: z.boolean().optional(),
});
