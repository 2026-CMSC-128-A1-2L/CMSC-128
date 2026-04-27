import { Router } from 'express';
import {
  routeGetFacilities,
  routeSearchFacilities,
  routeCreateFacility,
  routeGetFacility,
  routeUpdateFacility,
  routeDeleteFacility,
  routeRemoveManager,
  routeUpdateManagerPermissions,
  routeApproveFacility,
  routeRejectFacility,
  routeGetMonthlyIncomeByLandlord,
  routeGetOverdueTenantsByLandlord,
} from './facility.controller';
import { routeCreateListing } from '../listing/listing.controller';
import {
  routeGetFacilityReviews,
  routeGetAverageRatingsByFacility,
} from '../review/review.controller';
import {
  correctLandlordFilter,
  directManagerFilter,
  isLandlord,
  isSuperAdmin,
  listingViewFilter,
} from '../../middleware';
import { routeGetVisitBookingsByFacility } from '../booking/booking.controller';

const router = Router();

// GET /api/facilities
//
// Lists the facilties which satisfies the conditions of the filter.
//
// Replaced with search for most cases, mainly used by admin
router.get('/', routeGetFacilities);

// POST /api/facilities/search
//
// Lists the facilties which contains listings which satisfy the conditions
// of the filter.
// This also returns some details for these listings.
//
// Any user type
router.post('/search', routeSearchFacilities);

// POST /api/facilities
//
// Creates a new facility.
//
// landlord only
router.post('/', isLandlord, routeCreateFacility);

// ============================================================================
// GET /api/facilities/landlord/monthly-income
//
// Returns expected monthly income across all facilities owned by the landlord.
// Calculated as the sum of unit prices for every active rental.
//
// Must be declared before /:facilityId to avoid route param collision.
//
// landlord only
// ============================================================================
router.get('/landlord/monthly-income', isLandlord, routeGetMonthlyIncomeByLandlord);

// ============================================================================
// GET /api/facilities/landlord/overdue-tenants
//
// Returns all active tenants whose most recent billing is overdue,
// across all facilities owned by the landlord.
//
// Must be declared before /:facilityId to avoid route param collision.
//
// landlord only
// ============================================================================
router.get('/landlord/overdue-tenants', isLandlord, routeGetOverdueTenantsByLandlord);

// GET /api/facilities/:facilityId
//
// Retreives a facility. This includes listing details, including reviews.
//
// Any user type, includes listing details
router.get('/:facilityId', routeGetFacility);

// PATCH /api/facilities/:facilityId
//
// Edits a facility.
//
// manager with manageListings permission only
router.patch('/:facilityId', directManagerFilter('manageListings'), routeUpdateFacility);

// DELETE /api/facilities/:facilityId
//
// soft-delete, facility landlord only
router.delete('/:facilityId', correctLandlordFilter, routeDeleteFacility);

// DELETE /api/facilities/:facilityId/managers/:managerId
//
// Removes a manager. This change propagates to listings.
//
// landlord only
router.delete('/:facilityId/managers/:managerId', isLandlord, routeRemoveManager);

// PATCH /api/facilities/:facilityId/managers/:managerId
//
// Updates the permissions for a manager.
//
// update permissions, landlord only
router.patch('/:facilityId/managers/:managerId', isLandlord, routeUpdateManagerPermissions);

// GET /api/facilities/:facilityId/listings
//
// use /listings instead with a query
// router.get('/facilities/:facilityId/listings', listingViewFilter, routeGetListingsByFacility);

// POST /api/facilities/:facilityId/listings
//
// Manager with manageListings permission or landlord
router.post('/:facilityId/listings', directManagerFilter('manageListings'), routeCreateListing); // TODO: fix implementation, use parameter

// GET /api/facilities/:facilityId/reviews
// Input:
// - facilityId (ObjectId)
//
// Output:
// - Array of Review objects, reviews of the listings within a facility
//
// Considerations:
// - Applies listingViewFilter to listings under facility
// - Returns 404 if facility not found
// - Uses relation: Facility → Listings → Reviews
// - Empty array is valid if no reviews
router.get('/:facilityId/reviews', listingViewFilter, routeGetFacilityReviews);

// GET /api/facilities/:facilityId/average-ratings
//
// Returns average quality, comfort, environment, and overall ratings
// across all reviews for all listings within the facility.
//
// Any user type
router.get('/:facilityId/average-ratings', routeGetAverageRatingsByFacility);

// POST /api/facilities/:facilityId/approve
//
// admin only
router.post('/:facilityId/approve', isSuperAdmin, routeApproveFacility);

// POST /api/facilities/:facilityId/reject
//
// admin only
router.post('/:facilityId/reject', isSuperAdmin, routeRejectFacility);

// ============================================================================
// GET /api/facilities/:facilityId/bookings
// ============================================================================
router.get(
  '/:facilityId/bookings',
  directManagerFilter('manageListings'),
  routeGetVisitBookingsByFacility,
);
export default router;
