import { Router } from 'express';
import {
  routeGetFacilities,
  routeCreateFacility,
  routeGetFacilityById,
  routeUpdateFacility,
  routeDeleteFacility,
  routeGetListingsByFacility,
} from './controllers/facility.js';
import {
  routeGetListings,
  routeCreateListing,
  routeGetListingById,
  routeUpdateListing,
  routeDeleteListing,
  routeGetUnitsByListing,
  routeGetListingReviewsById,
} from './controllers/listing.js';
import {
  routeGetUnits,
  routeCreateUnit,
  routeGetUnitById,
  routeUpdateUnit,
  routeDeleteUnit,
} from './controllers/unit.js';
import { listingViewFilter, listingUpdateFilter } from './controllers/middleware.js';

const router = Router();

// TODO: add auth middleware

router.get('/facilities', routeGetFacilities); // no auth
router.post('/facilities', routeCreateFacility); // manager/landlord

router.get('/facilities/:facility_id', routeGetFacilityById); // no auth
router.patch('/facilities/:facility_id', routeUpdateFacility); // correct manager/landlord
router.delete('/facilities/:facility_id', routeDeleteFacility); // correct manager/landlord, empty only

router.get('/facilities/:facility_id/listings', listingViewFilter, routeGetListingsByFacility); // correct manager/landlord

router.get('/listings', listingUpdateFilter, routeGetListings); // manager/landlord
router.post('/listings', listingUpdateFilter, routeCreateListing); // manager/landlord

router.get('/listings/:listing_id', listingViewFilter, routeGetListingById); // verified
router.get('/listings/:listing_id/reviews', listingViewFilter, routeGetListingReviewsById); // verified
router.patch('/listings/:listing_id', listingUpdateFilter, routeUpdateListing); // correct manager/landlord
router.delete('/listings/:listing_id', listingUpdateFilter, routeDeleteListing); // correct manager/landlord

router.get('/listings/:listing_id/units', routeGetUnitsByListing); // correct manager/landlord

router.get('/units', routeGetUnits); // superadmin only
router.post('/units', routeCreateUnit); // correct manager/landlord, should have listing in body

router.get('/units/:unit_id', routeGetUnitById); // correct manager/landlord (and user?)
router.patch('/units/:unit_id', routeUpdateUnit); // correct manager/landlord
router.delete('/units/:unit_id', routeDeleteUnit); // correct manager/landlord

export { router as apiRouter };
