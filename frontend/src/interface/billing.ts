import type {
  CreateBillingBodySchema,
  GetBillingsFilterSchema,
  GetBillingsQuerySchema,
  UpdateBillingRequestBodySchema,
  UpdateBillingPaymentRequestBodySchema,
  SubmitBillingPaymentArgumentsSchema,
  VerifyBillingRequestBodySchema,
} from 'shared';
import type z from 'zod';

export type CreateBillingBody = z.infer<typeof CreateBillingBodySchema>;
export type GetBillingsFilter = z.infer<typeof GetBillingsFilterSchema>;
export type GetBillingsQuery = z.infer<typeof GetBillingsQuerySchema>;
export type UpdateBillingRequestBody = z.infer<typeof UpdateBillingRequestBodySchema>;
export type UpdateBillingPaymentRequestBody = z.infer<typeof UpdateBillingPaymentRequestBodySchema>;
export type SubmitBillingPaymentArguments = z.infer<typeof SubmitBillingPaymentArgumentsSchema>;
export type VerifyBillingRequestBody = z.infer<typeof VerifyBillingRequestBodySchema>;
