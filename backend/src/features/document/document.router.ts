/* Routers for:
 *   GET ../documents
 *   POST ../documents/:docId
 *   DELETE ../documents/:docId/:fileId
 *   POST ../documents/:docId/accept
 *   POST ../documents/:docId/reject
 */

import { type RequestHandler, Router } from 'express';
import {
  routeGetDocuments,
  routeAddDocument,
  routeDeleteDocument,
  routeAcceptDocument,
  routeRejectDocument,
} from './document.controller.js';
import type { ModelWithDocument } from './document.service.js';

// The model this handles should have a documents array.
// Middleware preceding this router should be added which includes the id of the parent.
//
// Assumes a filter middleware, but using a middleware that does an early response also works.
export const createDocumentRouter = (
  ownerMiddleware: RequestHandler,
  verifierMiddleware: RequestHandler,
  ownerOrVerifierMiddleware: RequestHandler | RequestHandler[],
  model: ModelWithDocument,
) => {
  const documentRouter = Router({ mergeParams: true });

  documentRouter.get('/', ownerOrVerifierMiddleware, routeGetDocuments(model));
  documentRouter.post('/:docId', ownerMiddleware, routeAddDocument(model));
  documentRouter.delete('/:docId/:fileId', ownerMiddleware, routeDeleteDocument(model));
  documentRouter.post('/:docId/accept', verifierMiddleware, routeAcceptDocument(model));
  documentRouter.post('/:docId/reject', verifierMiddleware, routeRejectDocument(model));

  return documentRouter;
};
