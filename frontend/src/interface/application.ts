import type {
  CreateApplicationBodySchema,
  ApplicationFilterSchema,
  GetApplicationsQuerySchema,
  AssignUnitRequestBodySchema,
  ApproveApplicationRequestBodySchema,
} from 'shared';
import type z from 'zod';

export type CreateApplicationBody = z.infer<typeof CreateApplicationBodySchema>;
export type ApplicationFilter = z.infer<typeof ApplicationFilterSchema>;
export type GetApplicationsQuery = z.infer<typeof GetApplicationsQuerySchema>;
export type AssignUnitRequestBody = z.infer<typeof AssignUnitRequestBodySchema>;
export type ApproveApplicationRequestBody = z.infer<typeof ApproveApplicationRequestBodySchema>;
