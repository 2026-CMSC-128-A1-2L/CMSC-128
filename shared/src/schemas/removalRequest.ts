import z from 'zod';

export const CreateRemovalRequestBodySchema = z.object({
  tenantId: z.string().optional(),
  tenantDisplayName: z.string(),
  tenantEmail: z.string().email(),
  facilityName: z.string(),
  reasons: z.object({
    backedOut: z.boolean(),
    noDocuments: z.boolean(),
    other: z.boolean(),
    otherReason: z.string().optional(),
  }),
});
