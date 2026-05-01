import { AddDocumentParamsSchema, AddDocumentBodySchema, DeleteDocumentParamsSchema, AcceptDocumentParamsSchema, RejectDocumentParamsSchema, RejectDocumentBodySchema } from 'shared'
import type z from 'zod';

export type AddDocumentBody = z.infer<typeof AddDocumentBodySchema>;
export type AddDocumentParams = z.infer<typeof AddDocumentParamsSchema>;
export type DeleteDocumentParams = z.infer<typeof DeleteDocumentParamsSchema>;
export type AcceptDocumentParams = z.infer<typeof AcceptDocumentParamsSchema>;
export type RejectDocumentParams = z.infer<typeof RejectDocumentParamsSchema>;
export type RejectDocumentBody = z.infer<typeof RejectDocumentBodySchema>;
