import { CreateReviewBodySchema, UpdateReviewBodySchema, ReviewParamsSchema } from 'shared';
import type z from 'zod';

export type CreateReviewBody = z.infer<typeof CreateReviewBodySchema>;
export type UpdateReviewBody = z.infer<typeof UpdateReviewBodySchema>;
export type ReviewParams = z.infer<typeof ReviewParamsSchema>;
