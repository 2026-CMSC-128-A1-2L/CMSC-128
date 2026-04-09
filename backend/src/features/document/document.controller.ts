import { RequestHandler } from "express";
import z from "zod";
import { ModelWithDocument, createGetDocuments, createAddDocument, createDeleteDocument, createAcceptDocument, createRejectDocument } from "./document.service";
import mongoose from "mongoose";

// GET ../documents
export const routeGetDocuments = (model: ModelWithDocument): RequestHandler => {
  const getDocuments = createGetDocuments(model);
  return async (req, res, next) => {
    assert.ok(res.locals.id);
    res.send({ data: await getDocuments(res.locals.id as mongoose.Types.ObjectId) });
  }
}

// POST ../documents/:docId/files
const AddDocumentParamsSchema = z.object({
  docId: z.string(),
});

const AddDocumentBodySchema = z.object({
  fileId: z.string(),
});

export const routeAddDocument = (model: ModelWithDocument): RequestHandler => {
  const addDocument = createAddDocument(model);
  return async (req, res, next) => {
    const params = AddDocumentParamsSchema.parse(req.params);
    const body = AddDocumentBodySchema.parse(req.body);

    assert.ok(res.locals.id);
    res.send({ data: await addDocument(res.locals.id as mongoose.Types.ObjectId, params.docId, body.fileId, req.user!._id) });
  }
}

// DELETE ../documents/:docId/files/:fileId
const DeleteDocumentParamsSchema = z.object({
  docId: z.string(),
  fileId: z.string(),
});

export const routeDeleteDocument = (model: ModelWithDocument): RequestHandler => {
  const deleteDocument = createDeleteDocument(model);
  return async (req, res, next) => {
    const params = DeleteDocumentParamsSchema.parse(req.params);
    assert.ok(res.locals.id);
    res.send({ data: await deleteDocument(res.locals.id as mongoose.Types.ObjectId, params.docId, params.fileId, req.user!._id) });
  }
}

// POST ../documents/:docId/accept
const AcceptDocumentParamsSchema = z.object({
  docId: z.string(),
});

export const routeAcceptDocument = (model: ModelWithDocument): RequestHandler => {
  const acceptDocument = createAcceptDocument(model);
  return async (req, res, next) => {
    const params = AcceptDocumentParamsSchema.parse(req.params);

    assert.ok(res.locals.id);
    res.send({ data: await acceptDocument(res.locals.id as mongoose.Types.ObjectId, params.docId) });
  }
}

// POST ../documents/:docId/reject
const RejectDocumentParamsSchema = z.object({
  docId: z.string(),
});

const RejectDocumentBodySchema = z.object({
  message: z.string(),
});

export const routeRejectDocument = (model: ModelWithDocument): RequestHandler => {
  const rejectDocument = createRejectDocument(model);
  return async (req, res, next) => {
    const params = RejectDocumentParamsSchema.parse(req.params);
    const body = RejectDocumentBodySchema.parse(req.body);

    assert.ok(res.locals.id);
    res.send({ data: await rejectDocument(res.locals.id as mongoose.Types.ObjectId, params.docId, body.message) });
  }
}

