import { UpdateStudentRequestBodySchema, UpdateManagerRequestBodySchema, OnboardSelfRequestBodySchema, ApproveUserRequestBodySchema, UserFilterSchema, GetUsersQuerySchema } from 'shared';
import type z from 'zod';

export type UpdateStudentRequestBody = z.infer<typeof UpdateStudentRequestBodySchema>;
export type UpdateManagerRequestBody = z.infer<typeof UpdateManagerRequestBodySchema>;
export type OnboardSelfRequestBody = z.infer<typeof OnboardSelfRequestBodySchema>;
export type ApproveUserRequestBody = z.infer<typeof ApproveUserRequestBodySchema>;

export type UserFilter = z.infer<typeof UserFilterSchema>;
export type GetUsersQuery = z.infer<typeof GetUsersQuerySchema>;
