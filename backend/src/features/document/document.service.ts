import type mongoose from 'mongoose';
import type { Model, QueryFilter } from 'mongoose';
import { File } from '../file/file.model.js';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';

export type WithDocument = {
  documents: {
    docId: string;
    status: 'accepted' | 'rejected' | 'pending';
    message?: string;
    files: string[];
  }[];
};

export type ModelWithDocument = Model<WithDocument>;

export const createGetDocuments =
  (model: ModelWithDocument) =>
  async (id: mongoose.Types.ObjectId, filters: QueryFilter<WithDocument> | undefined) => {
    const result = await model
      .findOne(combineFilters<WithDocument>(filters, { _id: id }), { documents: 1 })
      .lean();
    return result?.documents;
  };

export const createAddDocument =
  (model: ModelWithDocument) =>
  async (
    id: mongoose.Types.ObjectId,
    docId: string,
    fileKey: string,
    filters: QueryFilter<WithDocument> | undefined,
  ) => {
    const file = await File.findOne({ key: fileKey, userId: id });
    if (!file) throw new AppError(404, 'File not found.');

    const result = await model
      .findOneAndUpdate(
        combineFilters<WithDocument>(filters, { _id: id, 'documents.docId': docId }),
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
    filters: QueryFilter<WithDocument> | undefined,
  ) => {
    // check if file is owned by the current user
    // TODO: use reference counting to check if file is kept?
    const file = await File.findOne({ key: fileKey, userId: id });
    if (!file) throw new AppError(404, 'File not found.');

    const result = await model
      .findOneAndUpdate(
        combineFilters<WithDocument>(filters, { _id: id, 'documents.docId': docId }),
        { pull: { 'documents.$.files': fileKey } },
        { returnDocument: 'after' },
      )
      .lean();

    return result?.documents;
  };

export const createAcceptDocument =
  (model: ModelWithDocument) =>
  async (
    id: mongoose.Types.ObjectId,
    docId: string,
    filters: QueryFilter<WithDocument> | undefined,
  ) => {
    const result = await model
      .findOneAndUpdate(
        combineFilters<WithDocument>(filters, { _id: id, 'documents.docId': docId }),
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
    filters: QueryFilter<WithDocument> | undefined,
  ) => {
    const result = await model
      .findOneAndUpdate(
        combineFilters<WithDocument>(filters, { _id: id, 'documents.docId': docId }),
        { 'documents.$.status': 'rejected', message },
        { returnDocument: 'after' },
      )
      .lean();

    return result?.documents;
  };
