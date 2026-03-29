import { RequestHandler, Router } from 'express';
import { errorHandler } from './controllers/error.js';
import {
  routeCreateFacility,
  routeGetFacility,
  routeUpdateFacility,
  routeDeleteFacility,
  routeGetListingsByFacility,
  routeGetFacilities,
} from './controllers/facility.js';
import {
  routeGetListings,
  routeCreateListing,
  routeGetListing,
  routeUpdateListing,
  routeDeleteListing,
  routeGetUnitsByListing,
  routeGetVisitBookingsByListing,
  routeApproveListing,
} from './controllers/listing.js';
import {
  routeGetUnits,
  routeCreateUnit,
  routeGetUnit,
  routeUpdateUnit,
  routeDeleteUnit,
} from './controllers/unit.js';
import {
  listingViewFilter,
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
  routeGetUser,
  routeUpdateUser,
  routeDeleteUser,
  routeGetVisitBookingsByStudent,
  routeAddDocument,
  routeGetDocuments,
  routeApproveUser,
  routeDeleteDocument,
  routeRejectUser,
} from './controllers/user.js';
import {
  routeCreateApplication,
  routeGetApplications,
  routeGetApplication,
  routeGetApplicationsByListing,
  routeGetApplicationsByStudent,
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
import {
  routeGetRentals,
  routeGetRentalsByUnit,
  routeUpdateRental,
  routeGetRental,
  routeGetRentalsByListing,
  routeGetRentalsByUser,
  routeMoveIn,
  routeMoveOut,
} from './controllers/rentals.js';
import { routeCreateReview, routeUpdateReview, routeDeleteReview, routeGetFacilityReviews, routeGetListingReviews } from './controllers/reviews.js';
import { routeAcceptInvite, routeDeclineInvite, routeGetInvites, routeInviteManager } from './controllers/invites.js';
import { routeCreateTransferRequest, routeCancelTransferRequest, routeApproveTransferRequest, routeGetTransferRequests, routeRejectTransferRequest } from './controllers/transfers.js';
import { routeCreateBilling, routeGetBilling, routeGetBillings, routeGetUnitBillings, routeGetUserBillings, routeSubmitBillingPayment, routeUpdateBilling, routeVerifyBillingPayment } from './controllers/billing.js';
import { routeGetBookings, routeCreateBooking, routeApproveBooking, routeCancelBooking, routeRejectBooking, routeUpdateBooking } from './controllers/booking.js';
import { routeGetActivities } from './controllers/activity.js';
import { routeGetMessages, routeGetUserMessages, routeSendMessage } from './controllers/message.js';
import { routeGetNotifications, routeReadAllNotifications, routeReadNotification } from './controllers/notifications.js';
import { routeGetReports, routeResolveReport, routeReportListing, routeReportUser } from './controllers/report.js';
import { routeGetCalendar } from './controllers/calendar.js';

const router = Router();

// TODO: add auth middleware

// Facilities
router.get('/facilities', routeGetFacilities);
router.post('/facilities', isLandlord, routeCreateFacility);
router.get('/facilities/:facilityId', routeGetFacility);
router.patch('/facilities/:facilityId', correctManagerOrLandlordFilter, routeUpdateFacility);
router.delete('/facilities/:facilityId', routeDeleteFacility);

// Listings
router.get('/listings', listingViewFilter, routeGetListings);
router.get('/listings/:listingId', listingViewFilter, routeGetListing);
router.patch('/listings/:listingId', correctManagerOrLandlordFilter, routeUpdateListing);
router.delete('/listings/:listingId', correctManagerOrLandlordFilter, routeDeleteListing);
router.post('/listings/:listingId/approve', isSuperAdmin, routeApproveListing);
router.get('/facilities/:facilityId/listings', listingViewFilter, routeGetListingsByFacility);
router.post('/facilities/:facilityId/listings', correctManagerOrLandlordFilter, routeCreateListing); // TODO: fix implementation, use parameter
// router.patch('/listings/:listingId/tags', correctManagerOrLandlordFilter, routeUpdateListingTags);

// Units
router.get('/units', isSuperAdmin, routeGetUnits);
router.get('/units/:unitId', isTenantManagerOrLandlord, routeGetUnit);
router.patch('/units/:unitId', correctManagerOrLandlordFilter, routeUpdateUnit);
router.delete('/units/:unitId', correctManagerOrLandlordFilter, routeDeleteUnit);
router.get('/listings/:listingId/units', routeGetUnitsByListing);
router.post('/listing/:listingId/units', correctManagerOrLandlordFilter, routeCreateUnit); // TODO: 

// Tags
router.get('/tags', routeGetTags);
router.post('/tags', isSuperAdmin, routeCreateTag);
router.patch('/tags/:tagName', isSuperAdmin, routeUpdateTag);
router.delete('/tags/:tagName', isSuperAdmin, routeDeleteTag);

// Users
router.get('/users', isSuperAdmin, routeGetUsers);
router.get('/users/:userId', isSelfOrSuperAdmin, routeGetUser);
router.patch('/users/:userId', isSelfOrSuperAdmin, routeUpdateUser);
router.delete('/users/:userId', isSelfOrSuperAdmin, routeDeleteUser);
router.get('/users/:userId/documents', isSelfOrSuperAdmin, routeGetDocuments);
router.post('/users/:userId/documents', isSelfOrSuperAdmin, routeAddDocument);
router.delete('/users/:userId/documents/:documentId', isSelfOrSuperAdmin, routeDeleteDocument);
router.post('/users/:userId/approve', isSelfOrSuperAdmin, routeApproveUser);
router.post('/users/:userId/reject', isSelfOrSuperAdmin, routeRejectUser);

// Applications
router.get('/applications', isSuperAdmin, routeGetApplications);
router.post('/applications', isVerifiedStudent, routeCreateApplication);
router.get('/applications/:applicationId', isSelfManagerOrSuperAdmin, routeGetApplication);
router.patch('/applications/:applicationId', isSelfManagerOrSuperAdmin, routeUpdateApplication);
router.delete('/applications/:applicationId', isSelfOrSuperAdmin, routeDeleteApplication);
router.post('/applications/:applicationId/approve', correctManagerOrLandlordFilter, routeUpdateApplicationStatus);
router.post('/applications/:applicationId/reject', correctManagerOrLandlordFilter, routeUpdateApplicationStatus);
router.post('/applications/:applicationId/assign-unit', correctManagerOrLandlordFilter, routeAssignApplicationUnit);
router.get('/users/:userId/applications', isSelfOrSuperAdmin, routeGetApplicationsByStudent);
router.get('/listings/:listingId/applications', isSelfOrSuperAdmin, routeGetApplicationsByListing);

// Rentals
router.get('/rentals', isSuperAdmin, routeGetRentals);
router.get('/rentals/:rentalId', isSuperAdmin, routeGetRental);
router.get('/users/:userId/rentals', isSuperAdmin, routeGetRentalsByUser);
router.get('/listing/:listingId/rentals', isSuperAdmin, routeGetRentalsByListing);
router.get('/units/:unitId/rentals', isSuperAdmin, routeGetRentalsByUnit);
router.patch('/rentals/:rentalId', correctManagerOrLandlordFilter, routeUpdateRental);
router.post('/rentals/:rentalId/move-in', correctManagerOrLandlordFilter, routeMoveIn);
router.post('/rentals/:rentalId/move-out', correctManagerOrLandlordFilter, routeMoveOut);
// TODO: check what else changes when a rental is deleted
// router.delete('/rentals/:rentalId', isSuperAdmin, routeDeleteRental);

// Billings
router.get('/billings', isSelfOrSuperAdmin, routeGetBillings);
router.post('/billings', isVerifiedStudent, routeCreateBilling);
router.get('/billings/:billingId', isVerifiedStudent, routeGetBilling);
router.patch('/billings/:billingId', isVerifiedStudent, routeUpdateBilling);
router.post('/billings/:billingId/pay', isVerifiedStudent, routeSubmitBillingPayment);
router.post('/billings/:billingId/verify', isVerifiedStudent, routeVerifyBillingPayment);
router.get('/users/:userId/billings', isVerifiedStudent, routeGetUserBillings);
router.get('/unit/:unitId/billings', isVerifiedStudent, routeGetUnitBillings);

// Bookmarks
router.get('/bookmarks', isVerifiedStudent, routeGetBookmarkedUnits);
router.post('/bookmarks/:listingId', isVerifiedStudent, routeAddBookmark);
router.delete('/bookmarks/:listingId', isVerifiedStudent, routeDeleteBookmark);

// Reviews
router.get('/reviews', listingViewFilter, routeGetListingReviews);
router.get('/listings/:listingId/reviews', listingViewFilter, routeCreateReview);
router.post('/listings/:listingId/reviews', listingViewFilter, routeGetListingReviews);
router.get('/facilities/:facilityId/reviews', routeGetFacilityReviews);
router.patch('/reviews/:reviewId', listingViewFilter, routeUpdateReview);
router.delete('/reviews/:reviewId', listingViewFilter, routeDeleteReview);

// Visit Bookings
router.get('/bookings', isSuperAdmin, routeGetBookings);
router.post('/bookings', isVerifiedStudent, routeCreateBooking);
router.patch('/bookings/:bookingId', isSelfOrManager, routeUpdateBooking);
router.delete('/bookings/:bookingId', isSelfOrManager, routeCancelBooking);
router.post('/bookings/:bookingId/approve', isSelfOrManager, routeApproveBooking);
router.post('/bookings/:bookingId/reject', isSelfOrManager, routeRejectBooking);
router.get('/users/:userId/bookings', isSelfOrSuperAdmin, routeGetVisitBookingsByStudent);
router.get('/listings/:listingId/bookings', correctManagerOrLandlordFilter, routeGetVisitBookingsByListing);

// Lease Transfers
router.get('/transfers', isVerifiedStudent, routeGetTransferRequests);
router.post('/transfers', isVerifiedStudent, routeCreateTransferRequest);
router.post('/transfers/:transferId/approve', isSelfOrSuperAdmin, routeApproveTransferRequest);
router.post('/transfers/:transferId/reject', isSelfOrSuperAdmin, routeRejectTransferRequest);
router.delete('/transfers/:transferId', isSelfOrSuperAdmin, routeCancelTransferRequest);

// Invites
router.get('/invites', routeGetInvites);
router.post('/invites', isLandlord, routeInviteManager);
router.post('/invites/:inviteId/accept', routeAcceptInvite);
router.post('/invites/:inviteId/decline', routeDeclineInvite);

// Activities
router.get('/activities', routeGetActivities);

// Reports
router.get('/reports', routeGetReports);
router.post('/reports/:reportId/resolve', routeResolveReport);
router.post('/listings/:listingId/report', isVerifiedStudent, routeReportListing);
router.post('/users/:userId/report', isSelfOrSuperAdmin, routeReportUser);

// Messages
router.get('/messages', routeGetMessages);
router.get('/messages/:userId', routeGetUserMessages);
router.post('/messages/:userId', routeSendMessage);

// Summaries
// Files
// Notifications
router.get('/notifications', routeGetNotifications);
router.post('/notifications/read-all', routeReadAllNotifications);
router.post('/notifications/:notificationId/read', routeReadNotification);

// Calendar
router.get('/calendar', routeGetCalendar)

// creation of fake accounts endpoints
router.post('/auth/test/register', isDevelopment, routeTestRegister);
router.post('/auth/test/login', isDevelopment, routeTestLogin);

router.get('/auth/google/student',
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
