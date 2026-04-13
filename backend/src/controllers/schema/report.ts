import z from 'zod';

export const ReportListingBodySchema = z.object({
  reportDescription: z.string().min(1).max(200),
  reportFlags: z.array(z.string()).min(1),
  reportEvidence: z.array(z.string()).default([]),
});

export const ReportUserBodySchema = z.object({
  reportDescription: z.string().min(1).max(200),
  reportFlags: z.array(z.string()).min(1),
  reportEvidence: z.array(z.string()).default([]),
});

export const ResolveReportBodySchema = z.object({
  status: z.enum(['resolved', 'dismissed']),
});
