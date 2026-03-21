import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const CreatePaymentBodySchema = z.object({
  unitID: ObjectIdSchema,
  billingPeriodStart: z.iso.date().optional(),
  billingPeriodEnd: z.iso.date().optional(),
  dueDate: z.iso.date().optional(),
  paidAmount: z.number().optional(),
  amount: z.number().positive().optional(),
  paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']).optional(),
  proofOfPayment: z.string().optional(),
  paymentType: z.enum(['rent', 'deposit', 'utility']).optional(),
});

export const GetPaymentsQuerySchema = z.object({
  q: z.string().transform((x) => (x ? JSON.parse(x) : {})),
});

export const PaymentFilterSchema = z.object({
  studentID: ObjectIdSchema.optional(),
  unitID: ObjectIdSchema.optional(),
  paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']).optional(),
  paymentType: z.enum(['rent', 'deposit', 'utility']).optional(),
});

export const PaymentParamsSchema = z.object({
  paymentId: ObjectIdSchema,
});
