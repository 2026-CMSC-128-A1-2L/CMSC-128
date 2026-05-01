import type { RequestHandler } from 'express';
import z from 'zod';
import {
  type ModelWithDocument,
  createGetDocuments,
  createAddDocument,
  createDeleteDocument,
  createAcceptDocument,
  createRejectDocument,
  WithDocument,
} from './document.service.js';
import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AddDocumentBodySchema, AddDocumentParamsSchema, DeleteDocumentParamsSchema, AcceptDocumentParamsSchema, RejectDocumentParamsSchema, RejectDocumentBodySchema } from 'shared';

// GET ../documents
export const routeGetDocuments = (model: ModelWithDocument): RequestHandler => {
  const getDocuments = createGetDocuments(model);
  return async (_req, res, _next) => {
    assert.ok(res.locals.id);
    res.send({
      data: await getDocuments(res.locals.id as mongoose.Types.ObjectId, res.locals.filters),
    });
  };
};



export const routeAddDocument = (model: ModelWithDocument): RequestHandler => {
  const addDocument = createAddDocument(model);
  return async (req, res, _next) => {
    const params = AddDocumentParamsSchema.parse(req.params);
    const body = AddDocumentBodySchema.parse(req.body);

    assert.ok(res.locals.id);
    res.send({
      data: await addDocument(
        res.locals.id as mongoose.Types.ObjectId,
        params.docId,
        body.fileId,
        res.locals.filters,
      ),
    });
  };
};

export const routeDeleteDocument = (model: ModelWithDocument): RequestHandler => {
  const deleteDocument = createDeleteDocument(model);
  return async (req, res, _next) => {
    const params = DeleteDocumentParamsSchema.parse(req.params);
    assert.ok(res.locals.id);
    res.send({
      data: await deleteDocument(
        res.locals.id as mongoose.Types.ObjectId,
        params.docId,
        params.fileId,
        res.locals.filters,
      ),
    });
  };
};

export const routeAcceptDocument = (model: ModelWithDocument): RequestHandler => {
  const acceptDocument = createAcceptDocument(model);
  return async (req, res, _next) => {
    const params = AcceptDocumentParamsSchema.parse(req.params);

    assert.ok(res.locals.id);
    res.send({
      data: await acceptDocument(
        res.locals.id as mongoose.Types.ObjectId,
        params.docId,
        res.locals.filters,
      ),
    });
  };
};

export const routeRejectDocument = (
  model: ModelWithDocument,
): RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  {
    id: mongoose.Types.ObjectId;
    filters?: QueryFilter<WithDocument>;
  }
> => {
  const rejectDocument = createRejectDocument(model);
  return async (req, res, _next) => {
    const params = RejectDocumentParamsSchema.parse(req.params);
    const body = RejectDocumentBodySchema.parse(req.body);

    assert.ok(res.locals.id);
    res.send({
      data: await rejectDocument(
        res.locals.id as mongoose.Types.ObjectId,
        params.docId,
        body.message,
        res.locals.filters,
      ),
    });
  };
};
