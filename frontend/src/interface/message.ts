import { GetMyConversationResponseBody, SendMessageRequestBody } from 'shared';
import type z from 'zod';

export type GetMyConversationResponseBody = z.infer<typeof GetMyConversationResponseBody>;
export type SendMessageRequestBody = z.infer<typeof SendMessageRequestBody>;
