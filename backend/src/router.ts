import { RequestHandler, Router } from 'express';
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
  routeGetApplicationsByListing,
  routeGetVisitBookingsByListing,
} from './controllers/listing.js';
import {
  routeGetUnits,
  routeCreateUnit,
  routeGetUnitById,
  routeUpdateUnit,
  routeDeleteUnit,
} from './controllers/unit.js';
import {
  listingViewFilter,
  isManager,
  isSuperAdmin,
  isDevelopment,
  correctManagerOrLandlordFilter,
  isLandlord,
  isSelfManagerOrSuperAdmin,
  isSelfOrSuperAdmin,
  isVerifiedStudent,
  isSelf,
  isSelfOrManager,
  isTenantManagerOrLandlord,
} from './controllers/middleware.js';
import passportGoogle from './auth/google.js';
import { routeCreateTag, routeDeleteTag, routeGetTags, routeUpdateTag } from './controllers/tag.js';
import { routeTestLogin, routeTestRegister } from './controllers/test.js';
import {
  routeGetUsers,
  routeGetUserById,
  routeUpdateUser,
  routeDeleteUser,
  routeGetApplicationsByStudent,
} from './controllers/user.js';
import {
  routeCreateApplication,
  routeGetApplications,
  routeGetApplicationByID,
  routeUpdateApplication,
  routeUpdateApplicationStatus,
  routeAssignApplicationUnit,
  routeDeleteApplication,
} from './controllers/application.js';
import {
  routeGetBookmarkedUnits,
  routeAddBookmark,
  routeDeleteBookmark,
} from './controllers/bookmarks.js';
import { routePayUnit, routeGetPayments } from './controllers/payments.js';
import {
  routeGetRentals,
  routeCreateRental,
  routeUpdateRental,
  routeDeleteRental,
} from './controllers/rentals.js';
import { routeCreateReview, routeUpdateReview, routeDeleteReview } from './controllers/reviews.js';
import {
  routeCreateVisitBooking,
  routeUpdateVisitBooking,
  routeCancelVisitBooking,
  routeGetVisitBookings,
} from './controllers/visits.js';
import { routeAcceptLandlordInvite, routeInviteManager } from './controllers/invites.js';

const router = Router();

// TODO: add auth middleware

router.get('/facilities', routeGetFacilities); // no auth
router.post('/facilities', isLandlord, routeCreateFacility); // manager/landlord

router.get('/facilities/:facilityId', routeGetFacilityById); // no auth
router.patch('/facilities/:facilityId', correctManagerOrLandlordFilter, routeUpdateFacility); // correct manager/landlord
router.delete('/facilities/:facilityId', routeDeleteFacility); // correct manager/landlord, empty only

router.get('/facilities/:facilityId/listings', listingViewFilter, routeGetListingsByFacility); // correct manager/landlord

router.get('/listings', listingViewFilter, routeGetListings); // no auth (filtered by verification status)
router.post('/listings', correctManagerOrLandlordFilter, routeCreateListing); // manager/landlord

router.get('/listings/:listingId', listingViewFilter, routeGetListingById); // verified
router.get('/listings/:listingId/reviews', listingViewFilter, routeGetListingReviewsById); // verified
router.get(
  '/listings/:listingId/applications',
  correctManagerOrLandlordFilter,
  routeGetApplicationsByListing,
);
router.get(
  '/listings/:listingId/visits',
  correctManagerOrLandlordFilter,
  routeGetVisitBookingsByListing,
);
router.patch('/listings/:listingId', correctManagerOrLandlordFilter, routeUpdateListing); // correct manager/landlord
router.delete('/listings/:listingId', correctManagerOrLandlordFilter, routeDeleteListing); // correct manager/landlord

router.get('/listings/:listingId/units', routeGetUnitsByListing); // correct manager/landlord

router.get('/units', isSuperAdmin, routeGetUnits); // superadmin only
router.post('/units', routeCreateUnit); // correct manager/landlord, should have listing in body

router.get('/units/:unitId', routeGetUnitById); // correct manager/landlord (and user?)
router.patch('/units/:unitId', routeUpdateUnit); // correct manager/landlord
router.delete('/units/:unitId', routeDeleteUnit); // correct manager/landlord

router.get('/tags', routeGetTags);
router.post('/tags', isSuperAdmin, routeCreateTag);
router.patch('/tags/:tagName', isSuperAdmin, routeUpdateTag);
router.delete('/tags/:tagName', isSuperAdmin, routeDeleteTag);

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

router.get('/users', isSuperAdmin, routeGetUsers);
router.get('/users/:userId', isSelfOrSuperAdmin, routeGetUserById);
router.patch('/users/:userId', isSelfOrSuperAdmin, routeUpdateUser);
router.delete('/users/:userId', isSelfOrSuperAdmin, routeDeleteUser);
router.get('/users/:userId/applications', isSelfOrSuperAdmin, routeGetApplicationsByStudent);
router.post('/applications', isVerifiedStudent, routeCreateApplication);
router.get('/applications', isSuperAdmin, routeGetApplications);
router.get('/applications/:applicationId', isSelfManagerOrSuperAdmin, routeGetApplicationByID);
router.patch('/applications/:applicationId', isSelfManagerOrSuperAdmin, routeUpdateApplication);
router.patch(
  '/applications/:applicationId/status',
  correctManagerOrLandlordFilter,
  routeUpdateApplicationStatus,
);
router.patch(
  '/applications/:applicationId/assign',
  correctManagerOrLandlordFilter,
  routeAssignApplicationUnit,
);
router.delete('/applications/:applicationId', isSelfOrSuperAdmin, routeDeleteApplication);

router.get('/rentals', isSuperAdmin, routeGetRentals);
router.post('/rentals', correctManagerOrLandlordFilter, routeCreateRental);
router.patch('/rentals/:rentalId', correctManagerOrLandlordFilter, routeUpdateRental);
router.delete('/rentals/:rentalId', isSuperAdmin, routeDeleteRental);
router.post('/payments', isVerifiedStudent, routePayUnit);
router.get('/payments', isSelfOrSuperAdmin, routeGetPayments);

router.get('/bookmarks', isVerifiedStudent, routeGetBookmarkedUnits);
router.post('/bookmarks/:unitId', isVerifiedStudent, routeAddBookmark);
router.delete('/bookmarks/:unitId', isVerifiedStudent, routeDeleteBookmark);

router.post('/reviews/:listingId', isVerifiedStudent, routeCreateReview);
router.patch('/reviews/:reviewId', isSelf, routeUpdateReview);
router.delete('/reviews/:reviewId', isSelfOrSuperAdmin, routeDeleteReview);

router.get('/visits', isSuperAdmin, routeGetVisitBookings);
router.post('/visits', isVerifiedStudent, routeCreateVisitBooking);
router.patch('/visits/:visitId', isSelfOrManager, routeUpdateVisitBooking);
router.delete('/visits/:visitId', isSelfOrManager, routeCancelVisitBooking);

router.post('/invites/landlord/:inviteId/accept', routeAcceptLandlordInvite);
router.post('/invites/manager', isLandlord, routeInviteManager);

router.post('/units', correctManagerOrLandlordFilter, routeCreateUnit);
router.get('/units/:unitId', isTenantManagerOrLandlord, routeGetUnitById);
router.patch('/units/:unitId', correctManagerOrLandlordFilter, routeUpdateUnit);
router.delete('/units/:unitId', correctManagerOrLandlordFilter, routeDeleteUnit);

// creation of fake accounts endpoints
router.post('/auth/test/register', isDevelopment, routeTestRegister);
router.post('/auth/test/login', isDevelopment, routeTestLogin);

router.use(errorHandler);

export { router as apiRouter };
