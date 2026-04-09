import mongoose, { Model } from 'mongoose';
import { File } from '../file/file.model';
import { AppError } from '../../error';

export type ModelWithDocument = Model<{
  documents: {
    docId: mongoose.Types.ObjectId;
    status: 'accepted' | 'rejected' | 'pending';
    message?: string;
    files: string[];
  }[];
}>;

export const createGetDocuments = (model: ModelWithDocument) => (id: mongoose.Types.ObjectId) =>
  model.findById(id, { documents: 1 });
export const createAddDocument =
  (model: ModelWithDocument) =>
  async (
    id: mongoose.Types.ObjectId,
    docId: string,
    fileKey: string,
    userId: mongoose.Types.ObjectId,
  ) => {
    const file = await File.findOne({ key: fileKey, userId });
    if (!file) throw new AppError(404, 'File not found.');

    return await model.updateOne(
      { _id: id, 'documents.docId': docId },
      { $push: { 'documents.$.files': fileKey } },
    );
  };

export const createDeleteDocument =
  (model: ModelWithDocument) =>
  async (
    id: mongoose.Types.ObjectId,
    docId: string,
    fileKey: string,
    userId: mongoose.Types.ObjectId,
  ) => {
    // check if file is owned by the current user
    // TODO: use reference counting to check if file is kept?
    const file = await File.findOne({ key: fileKey, userId });
    if (!file) throw new AppError(404, 'File not found.');

    return await model.updateOne(
      { _id: id, 'documents.docId': docId },
      { pull: { 'documents.$.files': fileKey } },
    );
  };

export const createAcceptDocument =
  (model: ModelWithDocument) => async (id: mongoose.Types.ObjectId, docId: string) => {
    return await model.updateOne(
      { _id: id, 'documents.docId': docId },
      { 'documents.$.status': 'accepted', message: null },
    );
  };

export const createRejectDocument =
  (model: ModelWithDocument) =>
  async (id: mongoose.Types.ObjectId, docId: string, message: string) => {
    return await model.updateOne(
      { _id: id, 'documents.docId': docId },
      { 'documents.$.status': 'rejected', message },
    );
  };
