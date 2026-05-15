import z from 'zod';

export const AddDocumentParamsSchema = z.object({
  docId: z.string(),
});

export const AddDocumentBodySchema = z.object({
  fileId: z.string(),
});

export const DeleteDocumentParamsSchema = z.object({
  docId: z.string(),
  fileId: z.string(),
});

export const AcceptDocumentParamsSchema = z.object({
  docId: z.string(),
});

export const RejectDocumentParamsSchema = z.object({
  docId: z.string(),
});

export const RejectDocumentBodySchema = z.object({
  message: z.string(),
});
