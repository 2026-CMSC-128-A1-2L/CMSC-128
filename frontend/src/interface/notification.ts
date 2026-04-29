import { GetNotificationsResponseBodySchema } from 'shared';
import type z from "zod";

export type GetNotificationsResponse = z.infer<
  typeof GetNotificationsResponseBodySchema
>;
