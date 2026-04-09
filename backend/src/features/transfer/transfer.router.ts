import { Router } from 'express';
import { isVerifiedStudent, managerFilter, selfFilter } from '../../middleware';
import {
  routeGetTransferRequests,
  routeCreateTransferRequest,
  routeApproveTransferRequest,
  routeRejectTransferRequest,
  routeCancelTransferRequest,
} from './transfer.controller';

const router = Router();

// Lease Transfers
// GET /api/transfers
router.get('/', isVerifiedStudent, routeGetTransferRequests);
// POST /api/transfers
router.post('/', isVerifiedStudent, routeCreateTransferRequest);
// POST /api/transfers/:transferId/approve
router.post(
  '/:transferId/approve',
  managerFilter('facility', 'manageListings'),
  routeApproveTransferRequest,
);
// POST /api/transfers/:transferId/reject
router.post(
  '/:transferId/reject',
  managerFilter('facility', 'manageListings'),
  routeRejectTransferRequest,
);
// DELETE /api/transfers/:transferId
router.delete('/:transferId', selfFilter(false), routeCancelTransferRequest); // TODO: check if transfer is already processed, cannot delete

export default router;
