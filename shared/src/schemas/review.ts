import z from 'zod';
import { ObjectIdSchema } from './common.js';

// POST /reviews
export const CreateReviewBodySchema = z.object({
  studentId: ObjectIdSchema,
  listingId: ObjectIdSchema,
  rating: z.number().int().min(1).max(5),
  description: z.string().optional(),
});

// PATCH /reviews/:reviewId
export const UpdateReviewBodySchema = z.object({
  reviewId: ObjectIdSchema,
  rating: z.number().int().min(1).max(5).optional(),
  description: z.string().optional(),
});

// GET /reviews/:reviewId
// DELETE /reviews/:reviewId
export const ReviewParamsSchema = z.object({
  reviewId: ObjectIdSchema,
});
