import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const CreateReviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  description: z.string().optional(),
});

export const UpdateReviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  description: z.string().optional(),
});

export const ReviewParamsSchema = z.object({
  reviewId: ObjectIdSchema,
});

export const ListingParamsSchema = z.object({
  listingId: ObjectIdSchema,
});
