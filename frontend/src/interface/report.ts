import type {
  ReportListingBodySchema,
  ReportUserBodySchema,
  ResolveReportBodySchema,
} from 'shared';
import type z from 'zod';

export type ReportListingBody = z.infer<typeof ReportListingBodySchema>;
export type ReportUserBody = z.infer<typeof ReportUserBodySchema>;
export type ResolveReportBody = z.infer<typeof ResolveReportBodySchema>;
