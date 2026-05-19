import type { CreateInviteManagerBodySchema, CreateInviteStudentBodySchema } from 'shared';
import type z from 'zod';

export type CreateInviteManagerBody = z.infer<typeof CreateInviteManagerBodySchema>;
export type CreateInviteStudentBody = z.infer<typeof CreateInviteStudentBodySchema>;
