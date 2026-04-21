import type mongoose from 'mongoose';
import type { Model, QueryFilter } from 'mongoose';
import { File } from '../file/file.model';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import type { UserType } from '../user/user.model';

export type ModelWithDocument = Model<{
  documents: {
    docId: string;
    status: 'accepted' | 'rejected' | 'pending';
    message?: string;
    files: string[];
  }[];
}>;

export const createGetDocuments =
  (model: ModelWithDocument) =>
  async (id: mongoose.Types.ObjectId, filters: QueryFilter<UserType>) => {
    const result = await model.where(filters).findOne({ _id: id }, { documents: 1 }).lean();
    return result?.documents;
  };

export const createAddDocument =
  (model: ModelWithDocument) =>
  async (
    id: mongoose.Types.ObjectId,
    docId: string,
    fileKey: string,
    filters: QueryFilter<UserType>,
  ) => {
    const file = await File.findOne({ key: fileKey, userId: id });
    if (!file) throw new AppError(404, 'File not found.');

    const result = await model
      .where(filters)
      .findOneAndUpdate(
        { _id: id, 'documents.docId': docId },
        { $push: { 'documents.$.files': fileKey } },
        { returnDocument: 'after' },
      )
      .lean();

    return result?.documents;
  };

export const createDeleteDocument =
  (model: ModelWithDocument) =>
  async (
    id: mongoose.Types.ObjectId,
    docId: string,
    fileKey: string,
    filters: QueryFilter<UserType>,
  ) => {
    // check if file is owned by the current user
    // TODO: use reference counting to check if file is kept?
    const file = await File.findOne({ key: fileKey, userId: id });
    if (!file) throw new AppError(404, 'File not found.');

    const result = await model
      .where(filters)
      .findOneAndUpdate(
        { _id: id, 'documents.docId': docId },
        { pull: { 'documents.$.files': fileKey } },
        { returnDocument: 'after' },
      )
      .lean();

    return result?.documents;
  };

export const createAcceptDocument =
  (model: ModelWithDocument) =>
  async (id: mongoose.Types.ObjectId, docId: string, filters: QueryFilter<UserType>) => {
    const result = await model
      .where(filters)
      .findOneAndUpdate(
        { _id: id, 'documents.docId': docId },
        { 'documents.$.status': 'accepted', message: null },
        { returnDocument: 'after' },
      )
      .lean();

    return result?.documents;
  };

export const createRejectDocument =
  (model: ModelWithDocument) =>
  async (
    id: mongoose.Types.ObjectId,
    docId: string,
    message: string,
    filters: QueryFilter<UserType>,
  ) => {
    const result = await model
      .where(filters)
      .findOneAndUpdate(
        { _id: id, 'documents.docId': docId },
        { 'documents.$.status': 'rejected', message },
        { returnDocument: 'after' },
      )
      .lean();

    return result?.documents;
  };
