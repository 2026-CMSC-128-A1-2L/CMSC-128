import z from 'zod';
import {
  DateTimeSchema,
  ObjectIdSchema,
  PaginationRequestSchema,
  PaginationResponseSchema,
} from './common';

// GET /messages
export const GetMyConversationsResponseBody = z
  .object({
    conversations: z.array(
      z.object({
        user: z.object({
          id: ObjectIdSchema,
          profilePicture: z.string().nullish(),
          name: z.string(),
          role: z.string(),
        }),
        message: z.object({
          userId: ObjectIdSchema,
          text: z.string(),
        }),
        createdAt: DateTimeSchema,
        readAt: DateTimeSchema.nullish(),
      }),
    ),
  })
  .extend(PaginationRequestSchema);

// GET /messages/:userId
export const GetMyConversationResponseBody = z
  .object({
    user: z.object({
      id: ObjectIdSchema,
      profilePicture: z.string().nullish(),
      name: z.string(),
      role: z.string(),
    }),
    messages: z.array(
      z.object({
        userId: ObjectIdSchema,
        text: z.string(),
      }),
    ),
    readAt: DateTimeSchema.nullish(),
  })
  .extend(PaginationResponseSchema);

// POST /messages/:userId
export const SendMessageRequestBody = z.object({
  text: z.string(),
});
