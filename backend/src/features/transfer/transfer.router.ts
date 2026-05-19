import { Router } from 'express';
import {
  isVerifiedStudent,
  manageApplicationsFilter,
  manageListingsFilter,
  selfFilter,
} from '../../middleware.js';
import {
  routeGetTransferRequests,
  routeGetApprovedPasaloListings,
  routeGetApprovedPasaloTransfer,
  routeGetManagedTransferRequest,
  routeGetManagedTransferRequests,
  routeCreateTransferRequest,
  routeApproveTransferRequest,
  routeRejectTransferRequest,
  routeCancelTransferRequest,
} from './transfer.controller.js';

const router = Router();

router.get('/pasalo', routeGetApprovedPasaloListings);
router.get('/pasalo/:transferId', routeGetApprovedPasaloTransfer);
router.get('/managed', manageApplicationsFilter, routeGetManagedTransferRequests);
router.get('/managed/:transferId', manageApplicationsFilter, routeGetManagedTransferRequest);

// Lease Transfers
// GET /api/transfers
// Input:
// - None (uses req.user._id)
//
// Output:
// - Array of TransferRequest objects
//
// Considerations:
// - Requires verified student
// - Returns only user's own transfer requests
// - No access to others' data
router.get('/', isVerifiedStudent, routeGetTransferRequests);
// POST /api/transfers
router.post('/', isVerifiedStudent, routeCreateTransferRequest);
// POST /api/transfers/:transferId/approve
// Input:
// - transferId (ObjectId)
//
// Output:
// - Updated TransferRequest object
//
// Considerations:
// - Requires manager/landlord ownership
// - Validates via: Transfer → Unit → Listing
// - Returns 403 if not authorized
// - Returns 404 if resource not found
// - Sets status to 'approved'
router.post('/:transferId/approve', manageListingsFilter, routeApproveTransferRequest);
// POST /api/transfers/:transferId/reject
// Input:
// - transferId (ObjectId)
//
// Output:
// - Updated TransferRequest object
//
// Considerations:
// - Requires manager/landlord ownership
// - Validates via: Transfer → Unit → Listing
// - Returns 403 if not authorized
// - Returns 404 if resource not found
// - Sets status to 'rejected'
router.post('/:transferId/reject', manageListingsFilter, routeRejectTransferRequest);
// DELETE /api/transfers/:transferId
router.delete('/:transferId', selfFilter, routeCancelTransferRequest); // TODO: check if transfer is already processed, cannot delete

export default router;
