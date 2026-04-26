import z from 'zod';
import { ObjectIdSchema } from './common.js';

const RatingsSchema = z.object({
  quality: z.number().int().min(1).max(5),
  comfort: z.number().int().min(1).max(5),
  environment: z.number().int().min(1).max(5),
});

// POST /listings/:listingId/reviews
//
// userId is taken from the session; listingId is taken from the URL params
export const CreateReviewBodySchema = z.object({
  ratings: RatingsSchema,
  description: z.string().optional(),
  mediaUrls: z.array(z.string()).max(2).optional(),
});

// PATCH /reviews/:reviewId
export const UpdateReviewBodySchema = z.object({
  reviewId: ObjectIdSchema,
  ratings: RatingsSchema.optional(),
  description: z.string().optional(),
});

// GET /reviews/:reviewId
// DELETE /reviews/:reviewId
export const ReviewParamsSchema = z.object({
  reviewId: ObjectIdSchema,
});
