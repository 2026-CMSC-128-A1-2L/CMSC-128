import z from 'zod';

export const ReportListingBodySchema = z.object({
  description: z.string().min(1).max(200),
  flags: z.array(z.string()).min(1),
  evidence: z.array(z.string()).default([]),
});

export const ReportUserBodySchema = z.object({
  description: z.string().min(1).max(200),
  flags: z.array(z.string()).min(1),
  evidence: z.array(z.string()).default([]),
});

export const ResolveReportBodySchema = z.object({
  status: z.enum(['resolved', 'dismissed']),
});
