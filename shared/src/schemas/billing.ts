import z, { file } from 'zod';
import { ObjectIdSchema, QuerySchema, RangeSchema } from './common.js';

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
  paymentMethod: z.array(
    z.object({
      method: z.enum(['gcash', 'bank_transfer', 'cash']),
      qr: z.array(
        z.object({
          docId: z.string(),
          name: z.string(),
          status: z.enum(['accepted', 'rejected', 'pending']),
          message: z.string().optional(),
          files: z.array(z.string()),
        }),
      ),
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
    paymentStatus: z.enum(['unpaid', 'paid', 'overdue']),
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
    paymentStatus: z.enum(['unpaid', 'paid', 'overdue', 'partially_paid']),
    paidAmount: z.number().nullable().optional(),
  })
  .partial();

export const UpdateBillingPaymentRequestBodySchema = z.object({
  amount: z.number(),
});

export const SubmitBillingPaymentArgumentsSchema = z.object({
  file: z.string(),
  paymentMethod: z.enum(['gcash', 'bank_transfer', 'cash']),
});

export const VerifyBillingRequestBodySchema = z.object({
  amount: z.number(),
});
