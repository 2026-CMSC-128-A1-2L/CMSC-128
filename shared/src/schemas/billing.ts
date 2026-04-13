import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common';

// POST /payments
export const CreateBillingBodySchema = z.object({
  userId: ObjectIdSchema,
  unitId: ObjectIdSchema,
  facilityId: ObjectIdSchema,
  dueDate: z.iso.datetime().transform((x) => new Date(x)),
  paymentDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(), // Done after creation
  amount: z.number(),
  paidAmount: z.number().optional(), // Done after creation
  paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']).default('unpaid'),
  proofOfPayment: z.string().optional(), // Done after creation
  paymentType: z.string(), // 'rent', 'deposit', etc.
});

// GET /payments
export const GetBillingsFilterSchema = z.object({
  userId: ObjectIdSchema.optional(),
  unitId: ObjectIdSchema.optional(),
  facilityId: ObjectIdSchema.optional(),
  dueDate: z.iso
    .date()
    .transform((x) => new Date(x))
    .optional(),
  paymentDate: z.iso
    .date()
    .transform((x) => new Date(x))
    .optional(),
  amount: z.number().optional(),
  paidAmount: z.number().optional(),
  paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']).optional(),
  proofOfPayment: z.string().optional(),
  paymentType: z.string().optional(),
});

export const GetBillingsQuerySchema = QuerySchema;

export const UpdateBillingBodySchema = z.object({
  dueDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),

  paymentDate: z.iso
    .datetime()
    .transform((x) => new Date(x))
    .optional(),

  amount: z.number().optional(),
  paidAmount: z.number().optional(),

  paymentStatus: z
    .enum(['unpaid', 'paid', 'overdue', 'partially_paid'])
    .optional(),

  proofOfPayment: z
    .object({
      file: z.string().optional(),
      isVerified: z.boolean().optional(),
    })
    .optional(),

  paymentType: z.string().optional(),
});