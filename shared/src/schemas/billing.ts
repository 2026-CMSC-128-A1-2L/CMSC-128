import z from 'zod';
import { ObjectIdSchema, QuerySchema, RangeSchema } from './common';

// POST /billings
export const CreateBillingBodySchema = z.object({
  rentalId: ObjectIdSchema,
  dueDate: z.iso.datetime().transform((x) => new Date(x)),
  breakdown: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
    }),
  ),
});

// GET /payments
export const GetBillingsFilterSchema = z
  .object({
    userId: ObjectIdSchema,
    unitId: ObjectIdSchema,
    facilityId: ObjectIdSchema,
    dueDate: RangeSchema(
      z.iso
        .date()
        .transform((x) => new Date(x))
        .optional(),
    ),
    paymentDate: RangeSchema(
      z.iso
        .date()
        .transform((x) => new Date(x))
        .optional(),
    ),
    paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']),
  })
  .partial();

export const GetBillingsQuerySchema = QuerySchema(GetBillingsFilterSchema);

export const UpdateBillingRequestBodySchema = z
  .object({
    dueDate: z.iso.datetime().transform((x) => new Date(x)),
    breakdown: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
      }),
    ),
  })
  .partial();

export const UpdateBillingPaymentRequestBodySchema = z.object({
  amount: z.number(),
});

export const VerifyBillingRequestBodySchema = z.object({
  amount: z.number(),
});
