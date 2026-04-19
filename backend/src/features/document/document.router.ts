/* Routers for:
 *   GET ../documents
 *   POST ../documents/:docId/files
 *   DELETE ../documents/:docId/files/:fileId
 *   POST ../documents/:docId/accept
 *   POST ../documents/:docId/reject
 */

import { RequestHandler, Router } from 'express';
import {
  routeGetDocuments,
  routeAddDocument,
  routeDeleteDocument,
  routeAcceptDocument,
  routeRejectDocument,
} from './document.controller';
import { ModelWithDocument } from './document.service';

// The model this handles should have a documents array.
// Middleware preceding this router should be added which includes the id of the parent.
//
// Assumes a filter middleware, but using a middleware that does an early response also works.
export const createDocumentRouter = (
  ownerMiddleware: RequestHandler,
  verifierMiddleware: RequestHandler,
  ownerOrVerifierMiddleware: RequestHandler,
  model: ModelWithDocument,
) => {
  const documentRouter = Router({ mergeParams: true });

  documentRouter.get('/', ownerOrVerifierMiddleware, routeGetDocuments(model));
  documentRouter.post('/:documentId', ownerMiddleware, routeAddDocument(model));
  documentRouter.delete('/:documentId', ownerMiddleware, routeDeleteDocument(model));
  documentRouter.post('/:documentId/accept', verifierMiddleware, routeAcceptDocument(model));
  documentRouter.post('/:documentId/reject', verifierMiddleware, routeRejectDocument(model));

  return documentRouter;
};
