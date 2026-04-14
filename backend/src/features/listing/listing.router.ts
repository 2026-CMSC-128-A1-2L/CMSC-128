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

// ============================================================================
// POST /api/listings/:listingId/units
//
// Uses `listing-direct` filter because unit has not been created yet, compare
// directly to provided `listingId`.
// ============================================================================
router.post(
  '/:listingId/units',
  managerFilter('listing-direct', 'manageListings'),
  routeCreateUnit,
); // TODO:

// GET /listings/:listingId/applications
// Input:
// - listingId (ObjectId)
//
// Output:
// - Array of ApplicationForm objects
//
// Considerations:
// - Intended for managers/landlords
// - Returns all applications for a listing
// - Should enforce ownership via listing
router.get(
  '/:listingId/applications',
  managerFilter('listing', 'manageApplications'),
  routeGetApplicationsByListing,
);

// GET /api/listings/:listingId/rentals
router.get('/:listingId/rentals', isSuperAdmin, routeGetRentalsByListing);

// GET /api/listings/:listingId/reviews
// Input:
// - listingId (ObjectId)
//
// Output:
// - Array of Review objects
//
// Considerations:
// - Applies listingViewFilter
// - Returns 403 if listing exists but is not accessible
// - Returns 404 if listing does not exist
// - Fetches reviews only if listing is visible
router.get('/:listingId/reviews', listingViewFilter, routeGetListingReviews);

// POST /api/listings/:listingId/reviews
router.post('/:listingId/reviews', listingViewFilter, routeCreateReview);

// GET /api/listings/:listingId/bookings
router.get(
  '/:listingId/bookings',
  managerFilter('facility', 'manageListings'),
  routeGetVisitBookingsByListing,
);

// POST /api/listings/:listingId/report
router.post('/:listingId/report', isVerifiedStudent, routeReportListing);

export default router;
