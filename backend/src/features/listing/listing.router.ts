import { Router } from 'express';
import {
  listingViewFilter,
  managerFilter,
  isSuperAdmin,
  isVerifiedStudent,
} from '../../middleware';
import {
  routeGetListings,
  routeGetListing,
  routeUpdateListing,
  routeDeleteListing,
  routeApproveListing,
  routeRejectListing,
  routeUpdateListingTags,
  routeGetUnitsByListing,
  routeGetApplicationsByListing,
} from './listing.controller';
import { routeCreateUnit } from '../unit/unit.controller';
import { routeGetRentalsByListing } from '../rental/rental.controller';
import { routeGetListingReviews, routeCreateReview } from '../review/review.controller';
import { routeGetVisitBookingsByListing } from '../booking/booking.controller';
import { routeReportListing } from '../report/report.controller';

const router = Router();

// GET /api/listings
//
// Replaced with search, mainly used by admin.
router.get('/', listingViewFilter, routeGetListings);

// GET /api/listings/:listingId
//
// Returns the details of a listing, not including reviews.
router.get('/:listingId', listingViewFilter, routeGetListing);

// PATCH /api/listings/:listingId
//
// Manager with manageListings permission or landlord
router.patch('/:listingId', managerFilter('direct', 'manageListings'), routeUpdateListing);

// DELETE /api/listings/:listingId
//
// Manager with manageListings permission or landlord
router.delete('/:listingId', managerFilter('direct', 'manageListings'), routeDeleteListing);

// POST /api/listings/:listingId/approve
//
// admin only
router.post('/:listingId/approve', isSuperAdmin, routeApproveListing);

// POST /api/listings/:listingId/reject
//
// admin only
router.post('/:listingId/reject', isSuperAdmin, routeRejectListing);

// PATCH /listings/:listingId/tags
//
// {
//   set: {
//     ...
//   },
//   unset: {
//     ...
//   }
// }
// Manager with manageListings permission or landlord
router.patch('/:listingId/tags', managerFilter('direct', 'manageListings'), routeUpdateListingTags);

// GET /api/listings/:listingId/units
router.get('/:listingId/units', managerFilter('listing', null), routeGetUnitsByListing);

// POST /api/listings/:listingId/units
router.post('/:listingId/units', managerFilter('listing', 'manageListings'), routeCreateUnit); // TODO:

// GET /api/listings/:listingId/applications
router.get(
  '/:listingId/applications',
  managerFilter('listing', 'manageApplications'),
  routeGetApplicationsByListing,
);

// GET /api/listings/:listingId/rentals
router.get('/listings/:listingId/rentals', isSuperAdmin, routeGetRentalsByListing);

// GET /api/listings/:listingId/reviews
router.get('/listings/:listingId/reviews', listingViewFilter, routeGetListingReviews);

// POST /api/listings/:listingId/reviews
router.post('/listings/:listingId/reviews', listingViewFilter, routeCreateReview);

// GET /api/listings/:listingId/bookings
router.get(
  '/listings/:listingId/bookings',
  managerFilter('facility', 'manageListings'),
  routeGetVisitBookingsByListing,
);

// POST /api/listings/:listingId/report
router.post('/listings/:listingId/report', isVerifiedStudent, routeReportListing);

export default router;
