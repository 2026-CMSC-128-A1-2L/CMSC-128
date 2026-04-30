import mongoose from 'mongoose';
import { DOCUMENT_STATUS, type DocumentStatusType } from 'shared';

export type DocumentType = {
  docId: string;
  name: string;
  status: DocumentStatusType;
  message?: string;
  files: string[];
};

export const documentSchema = new mongoose.Schema<DocumentType>({
  docId: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: DOCUMENT_STATUS, default: 'pending', required: true },
  message: String,
  files: { type: [String], required: true, default: [] },
});
