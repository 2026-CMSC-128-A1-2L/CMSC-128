import { Router } from 'express';
import { errorHandler } from './controllers/error.js';
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
import { listingViewFilter, isManager, isSuperAdmin } from './controllers/middleware.js';
import passportGoogle from './auth/google.js';
import { RequestHandler } from 'http-proxy-middleware';

const router = Router();

// TODO: add auth middleware

router.get('/facilities', routeGetFacilities); // no auth
router.post('/facilities', isManager, routeCreateFacility); // manager/landlord

router.get('/facilities/:facilityId', routeGetFacilityById); // no auth
router.patch('/facilities/:facilityId', routeUpdateFacility); // correct manager/landlord
router.delete('/facilities/:facilityId', routeDeleteFacility); // correct manager/landlord, empty only

router.get('/facilities/:facilityId/listings', listingViewFilter, routeGetListingsByFacility); // correct manager/landlord

router.get('/listings', routeGetListings); // manager/landlord
router.post('/listings', routeCreateListing); // manager/landlord

router.get('/listings/:listingId', listingViewFilter, routeGetListingById); // verified
router.get('/listings/:listingId/reviews', listingViewFilter, routeGetListingReviewsById); // verified
router.patch('/listings/:listingId', routeUpdateListing); // correct manager/landlord
router.delete('/listings/:listingId', routeDeleteListing); // correct manager/landlord

router.get('/listings/:listingId/units', routeGetUnitsByListing); // correct manager/landlord

router.get('/units', isSuperAdmin, routeGetUnits); // superadmin only
router.post('/units', routeCreateUnit); // correct manager/landlord, should have listing in body

router.get('/units/:unitId', routeGetUnitById); // correct manager/landlord (and user?)
router.patch('/units/:unitId', routeUpdateUnit); // correct manager/landlord
router.delete('/units/:unitId', routeDeleteUnit); // correct manager/landlord

router.get(
  '/auth/google/student',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler,
);
router.get(
  '/auth/google/student/callback',
  passportGoogle.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  }) as RequestHandler,
);

router.use(errorHandler);

export { router as apiRouter };
