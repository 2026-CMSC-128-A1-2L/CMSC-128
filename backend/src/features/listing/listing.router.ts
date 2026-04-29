import { Router } from 'express';
import {
  listingViewFilter,
  isVerifiedStudent,
  manageApplicationsFilter,
  manageListingsFilter,
  managerFilter,
} from "../../middleware.js";
import {
  routeGetListings,
  routeGetListing,
  routeUpdateListing,
  routeDeleteListing,
  routeUpdateListingTags,
} from "./listing.controller.js";
import { routeCreateUnit, routeGetUnitsByListing } from "../unit/unit.controller.js";
import { routeGetRentalsByListing } from "../rental/rental.controller.js";
import { routeGetListingReviews, routeCreateReview } from "../review/review.controller.js";
import { routeReportListing } from "../report/report.controller.js";
import { routeGetApplicationsByListing } from "../application/application.controller.js";

const router = Router();

// ============================================================================
// GET /api/listings
//
// Replaced with search, mainly used by admin.
// ============================================================================
router.get('/', listingViewFilter, routeGetListings);

// ============================================================================
// GET /api/listings/:listingId
//
// Returns the details of a listing, not including reviews.
// ============================================================================
router.get('/:listingId', listingViewFilter, routeGetListing);

// ============================================================================
// PATCH /api/listings/:listingId
//
// Manager with manageListings permission or landlord
// ============================================================================
router.patch('/:listingId', manageListingsFilter, routeUpdateListing);

// ============================================================================
// DELETE /api/listings/:listingId
//
// Manager with manageListings permission or landlord
// ============================================================================
router.delete('/:listingId', manageListingsFilter, routeDeleteListing);

// ============================================================================
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
// ============================================================================
router.patch('/:listingId/tags', manageListingsFilter, routeUpdateListingTags);

// ============================================================================
// GET /api/listings/:listingId/units
// ============================================================================
router.get('/:listingId/units', managerFilter, routeGetUnitsByListing);

// ============================================================================
// POST /api/listings/:listingId/units
//
// Uses `listing-direct` filter because unit has not been created yet, compare
// directly to provided `listingId`.
// ============================================================================
router.post('/:listingId/units', manageListingsFilter, routeCreateUnit); // TODO:

// ============================================================================
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
// ============================================================================
router.get('/:listingId/applications', manageApplicationsFilter, routeGetApplicationsByListing);

// ============================================================================
// GET /api/listings/:listingId/rentals
// ============================================================================
router.get('/:listingId/rentals', managerFilter, routeGetRentalsByListing);

// ============================================================================
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
// ============================================================================
router.get('/:listingId/reviews', listingViewFilter, routeGetListingReviews);

// ============================================================================
// POST /api/listings/:listingId/reviews
// ============================================================================
router.post('/:listingId/reviews', routeCreateReview);

// ============================================================================
// POST /api/listings/:listingId/report
// ============================================================================
router.post('/:listingId/report', isVerifiedStudent, routeReportListing);

export default router;
