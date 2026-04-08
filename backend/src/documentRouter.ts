/* Routers for:
 *   GET ../documents
 *   POST ../documents/:docId/files
 *   DELETE ../documents/:docId/files/:fileId
 *   POST ../documents/:docId/accept
 *   POST ../documents/:docId/reject
 */

import { RequestHandler, Router } from "express";
import { routeGetDocuments, routeAddDocument, routeDeleteDocument, routeRejectDocument, routeAcceptDocument } from "./controllers/document";
import { ModelWithDocument } from "./services/documents";

// The model this handles should have a documents array
// Middleware preceding this router should be added which includes the id of the parent.
export const createDocumentRouter = (ownerMiddleware: RequestHandler, verifierMiddleware: RequestHandler, model: ModelWithDocument, docIds: string[]) => {
  const documentRouter = Router({ mergeParams: true });

  documentRouter.get("/", ownerMiddleware, routeGetDocuments(model))
  documentRouter.post("/:documentId", ownerMiddleware, routeAddDocument(model))
  documentRouter.delete("/:documentId", ownerMiddleware, routeDeleteDocument(model))
  documentRouter.post("/:documentId/accept", verifierMiddleware, routeAcceptDocument(model))
  documentRouter.post("/:documentId/reject", verifierMiddleware, routeRejectDocument(model))

  return documentRouter;
}
