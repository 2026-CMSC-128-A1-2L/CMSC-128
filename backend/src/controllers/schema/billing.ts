import z from 'zod';
import { ObjectIdSchema } from './common';

export const CreateBillingBodySchema = z.object({
  studentID: ObjectIdSchema,
  unitID: ObjectIdSchema,
  managerID: ObjectIdSchema,

  dueDate: z.coerce.date(), // Auto converts date string to Z date

  paymentDate: z.iso
    .datetime()
    .transform((date) => new Date(date))
    .optional(), // Done after creation

  amount: z.number(),
  paidAmount: z.number().optional(), // Done after creation

  paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']).optional(),

  proofOfPayment: z.string().optional(), // Done after creation
  paymentType: z.string(), // 'rent', 'deposit', etc.
});

export const GetBillingsQuerySchema = z.object({
  studentID: ObjectIdSchema.optional(),
  unitID: ObjectIdSchema.optional(),
  managerID: ObjectIdSchema.optional(),

  dueDate: z.coerce.date().optional(),
  paymentDate: z.coerce.date().optional(),

  amount: z.number().optional(),
  paidAmount: z.number().optional(),

  paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']).optional(),

  proofOfPayment: z.string().optional(),
  paymentType: z.string().optional(),
});
