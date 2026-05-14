import type {
  GetMyConversationResponseBody as GetMyConversationResponseBodySchema,
  GetMyConversationsResponseBody as GetMyConversationsResponseBodySchema,
  SendMessageRequestBody as SendMessageRequestBodySchema,
} from 'shared';
import type z from 'zod';

export type GetMyConversationsResponseBody = z.infer<typeof GetMyConversationsResponseBodySchema>;
export type GetMyConversationResponseBody = z.infer<typeof GetMyConversationResponseBodySchema>;
export type SendMessageRequestBody = z.infer<typeof SendMessageRequestBodySchema>;
