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
  correctLandlordFilter,
  hasAccount,
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
import {
  routeCreateReview,
  routeUpdateReview,
  routeDeleteReview,
  routeGetFacilityReviews,
  routeGetListingReviews,
  routeGetReviews,
} from './controllers/reviews.js';
import {
  routeAcceptInvite,
  routeDeclineInvite,
  routeGetInvites,
  routeInviteManager,
} from './controllers/invites.js';
import {
  routeCreateTransferRequest,
  routeCancelTransferRequest,
  routeApproveTransferRequest,
  routeGetTransferRequests,
  routeRejectTransferRequest,
} from './controllers/transfers.js';
import {
  routeCreateBilling,
  routeGetBilling,
  routeGetBillings,
  routeGetUnitBillings,
  routeGetUserBillings,
  routeSubmitBillingPayment,
  routeUpdateBilling,
  routeVerifyBillingPayment,
} from './controllers/billing.js';
import {
  routeGetBookings,
  routeCreateBooking,
  routeApproveBooking,
  routeCancelBooking,
  routeRejectBooking,
  routeUpdateBooking,
} from './controllers/booking.js';
import { routeGetActivities } from './controllers/activity.js';
import { routeGetMessages, routeGetUserMessages, routeSendMessage } from './controllers/message.js';
import {
  routeGetNotification,
  routeGetNotifications,
  routeReadNotification,
} from './controllers/notifications.js';
import {
  routeGetReports,
  routeResolveReport,
  routeReportListing,
  routeReportUser,
} from './controllers/report.js';
import { routeGetCalendar } from './controllers/calendar.js';

import multer from "multer";
import multerS3 from "multer-s3";

import { S3Client } from "@aws-sdk/client-s3";
import path from 'path';
import { routeUploadFile } from './controllers/file.js';

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET!,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.R2_BUCKET_NAME!,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
});

const router = Router();

// TODO: add auth middleware

// Facilities
// GET /api/facilities
router.get('/facilities', routeGetFacilities);
// POST /api/facilities
router.post('/facilities', isLandlord, routeCreateFacility);
// GET /api/facilities/:facilityId
router.get('/facilities/:facilityId', routeGetFacility);
// PATCH /api/facilities/:facilityId
router.patch('/facilities/:facilityId', correctManagerOrLandlordFilter, routeUpdateFacility);
// DELETE /api/facilities/:facilityId
router.delete('/facilities/:facilityId', correctLandlordFilter, routeDeleteFacility);

// Listings
// GET /api/listings
router.get('/listings', listingViewFilter, routeGetListings);
// GET /api/listings/:listingId
router.get('/listings/:listingId', listingViewFilter, routeGetListing);
// PATCH /api/listings/:listingId
router.patch('/listings/:listingId', correctManagerOrLandlordFilter, routeUpdateListing);
// DELETE /api/listings/:listingId
router.delete('/listings/:listingId', correctManagerOrLandlordFilter, routeDeleteListing);
// POST /api/listings/:listingId/approve
router.post('/listings/:listingId/approve', isSuperAdmin, routeApproveListing);
// GET /api/facilities/:facilityId/listings
router.get('/facilities/:facilityId/listings', listingViewFilter, routeGetListingsByFacility);
// POST /api/facilities/:facilityId/listings
router.post('/facilities/:facilityId/listings', correctManagerOrLandlordFilter, routeCreateListing); // TODO: fix implementation, use parameter
// router.patch('/listings/:listingId/tags', correctManagerOrLandlordFilter, routeUpdateListingTags);

// Units
// GET /api/units
router.get('/units', isSuperAdmin, routeGetUnits);
// GET /api/units/:unitId
router.get('/units/:unitId', isTenantManagerOrLandlord, routeGetUnit);
// PATCH /api/units/:unitId
router.patch('/units/:unitId', correctManagerOrLandlordFilter, routeUpdateUnit);
// DELETE /api/units/:unitId
router.delete('/units/:unitId', correctManagerOrLandlordFilter, routeDeleteUnit);
// GET /api/listings/:listingId/units
router.get('/listings/:listingId/units', routeGetUnitsByListing);
// POST /api/listings/:listingId/units
router.post('/listings/:listingId/units', correctManagerOrLandlordFilter, routeCreateUnit); // TODO:

// Tags
// GET /api/tags
router.get('/tags', routeGetTags);
// POST /api/tags
router.post('/tags', isSuperAdmin, routeCreateTag);
// PATCH /api/tags/:tagName
router.patch('/tags/:tagName', isSuperAdmin, routeUpdateTag);
// DELETE /api/tags/:tagName
router.delete('/tags/:tagName', isSuperAdmin, routeDeleteTag);

// Users
// GET /api/users
router.get('/users', isSuperAdmin, routeGetUsers);
// GET /api/users/:userId
router.get('/users/:userId', isSelfOrSuperAdmin, routeGetUser);
// PATCH /api/users/:userId
router.patch('/users/:userId', isSelfOrSuperAdmin, routeUpdateUser);
// DELETE /api/users/:userId
router.delete('/users/:userId', isSelfOrSuperAdmin, routeDeleteUser);
// GET /api/users/:userId/documents
router.get('/users/:userId/documents', isSelfOrSuperAdmin, routeGetDocuments);
// POST /api/users/:userId/documents
router.post('/users/:userId/documents', isSelfOrSuperAdmin, routeAddDocument);
// DELETE /api/users/:userId/documents/:documentId
router.delete('/users/:userId/documents/:documentId', isSelfOrSuperAdmin, routeDeleteDocument);
// POST /api/users/:userId/approve
router.post('/users/:userId/approve', isSuperAdmin, routeApproveUser);
// POST /api/users/:userId/reject
router.post('/users/:userId/reject', isSuperAdmin, routeRejectUser);

// Applications
// GET /api/applications
router.get('/applications', isSuperAdmin, routeGetApplications);
// POST /api/applications
router.post('/applications', isVerifiedStudent, routeCreateApplication);
// GET /api/applications/:applicationId
router.get('/applications/:applicationId', isSelfManagerOrSuperAdmin, routeGetApplication);
// PATCH /api/applications/:applicationId
router.patch('/applications/:applicationId', isSelfManagerOrSuperAdmin, routeUpdateApplication);
// DELETE /api/applications/:applicationId
router.delete('/applications/:applicationId', isSelf, routeDeleteApplication);
// POST /api/applications/:applicationId/approve
router.post('/applications/:applicationId/approve', correctManagerOrLandlordFilter, routeUpdateApplicationStatus);
// POST /api/applications/:applicationId/reject
router.post('/applications/:applicationId/reject', correctManagerOrLandlordFilter, routeUpdateApplicationStatus);
// POST /api/applications/:applicationId/assign-unit
router.post('/applications/:applicationId/assign-unit', correctManagerOrLandlordFilter, routeAssignApplicationUnit);
// GET /api/users/:userId/applications
router.get('/users/:userId/applications', isSelf, routeGetApplicationsByStudent);
// GET /api/listings/:listingId/applications
router.get('/listings/:listingId/applications', correctManagerOrLandlordFilter, routeGetApplicationsByListing);

// Rentals
// GET /api/rentals
router.get('/rentals', isSuperAdmin, routeGetRentals);
// GET /api/rentals/:rentalId
router.get('/rentals/:rentalId', isTenantManagerOrLandlord, routeGetRental);
// GET /api/users/:userId/rentals
router.get('/users/:userId/rentals', isSelf, routeGetRentalsByUser);
// GET /api/listings/:listingId/rentals
router.get('/listings/:listingId/rentals', isSuperAdmin, routeGetRentalsByListing);
// GET /api/units/:unitId/rentals
router.get('/units/:unitId/rentals', correctManagerOrLandlordFilter, routeGetRentalsByUnit);
// PATCH /api/rentals/:rentalId
router.patch('/rentals/:rentalId', correctManagerOrLandlordFilter, routeUpdateRental);
// POST /api/rentals/:rentalId/move-in
router.post('/rentals/:rentalId/move-in', correctManagerOrLandlordFilter, routeMoveIn);
// POST /api/rentals/:rentalId/move-out
router.post('/rentals/:rentalId/move-out', correctManagerOrLandlordFilter, routeMoveOut);
// TODO: check what else changes when a rental is deleted
// router.delete('/rentals/:rentalId', isSuperAdmin, routeDeleteRental);

// Billings
// GET /api/billings
router.get('/billings', isSuperAdmin, routeGetBillings);
// POST /api/billings
router.post('/billings', correctManagerOrLandlordFilter, routeCreateBilling);
// GET /api/billings/:billingId
router.get('/billings/:billingId', isSelfOrManager, routeGetBilling);
// PATCH /api/billings/:billingId
router.patch('/billings/:billingId', correctManagerOrLandlordFilter, routeUpdateBilling);
// POST /api/billings/:billingId/pay
router.post('/billings/:billingId/pay', isVerifiedStudent, routeSubmitBillingPayment);
// POST /api/billings/:billingId/verify
router.post('/billings/:billingId/verify', correctManagerOrLandlordFilter, routeVerifyBillingPayment);
// GET /api/users/:userId/billings
router.get('/users/:userId/billings', isSelf, routeGetUserBillings);
// GET /api/units/:unitId/billings
router.get('/units/:unitId/billings', isTenantManagerOrLandlord, routeGetUnitBillings);

// Bookmarks
// GET /api/bookmarks
router.get('/bookmarks', isVerifiedStudent, routeGetBookmarkedUnits);
// POST /api/bookmarks/:listingId
router.post('/bookmarks/:listingId', isVerifiedStudent, routeAddBookmark);
// DELETE /api/bookmarks/:listingId
router.delete('/bookmarks/:listingId', isVerifiedStudent, routeDeleteBookmark);

// Reviews
// GET /api/reviews
router.get('/reviews', listingViewFilter, routeGetReviews);
// GET /api/listings/:listingId/reviews
router.get('/listings/:listingId/reviews', listingViewFilter, routeGetListingReviews);
// POST /api/listings/:listingId/reviews
router.post('/listings/:listingId/reviews', listingViewFilter, routeCreateReview);
// GET /api/facilities/:facilityId/reviews
router.get('/facilities/:facilityId/reviews', listingViewFilter, routeGetFacilityReviews);
// PATCH /api/reviews/:reviewId
router.patch('/reviews/:reviewId', isSelf, routeUpdateReview);
// DELETE /api/reviews/:reviewId
router.delete('/reviews/:reviewId', isSelf, routeDeleteReview);

// Visit Bookings
// GET /api/bookings
router.get('/bookings', isSuperAdmin, routeGetBookings);
// POST /api/bookings
router.post('/bookings', isVerifiedStudent, routeCreateBooking);
// PATCH /api/bookings/:bookingId
router.patch('/bookings/:bookingId', isSelfOrManager, routeUpdateBooking);
// DELETE /api/bookings/:bookingId
router.delete('/bookings/:bookingId', isSelfOrManager, routeCancelBooking);
// POST /api/bookings/:bookingId/approve
router.post('/bookings/:bookingId/approve', isSelfOrManager, routeApproveBooking);
// POST /api/bookings/:bookingId/reject
router.post('/bookings/:bookingId/reject', isSelfOrManager, routeRejectBooking);
// GET /api/users/:userId/bookings
router.get('/users/:userId/bookings', isSelfOrSuperAdmin, routeGetVisitBookingsByStudent);
// GET /api/listings/:listingId/bookings
router.get('/listings/:listingId/bookings', correctManagerOrLandlordFilter, routeGetVisitBookingsByListing);

// Lease Transfers
// GET /api/transfers
router.get('/transfers', isVerifiedStudent, routeGetTransferRequests);
// POST /api/transfers
router.post('/transfers', isVerifiedStudent, routeCreateTransferRequest);
// POST /api/transfers/:transferId/approve
router.post('/transfers/:transferId/approve', correctManagerOrLandlordFilter, routeApproveTransferRequest);
// POST /api/transfers/:transferId/reject
router.post('/transfers/:transferId/reject', correctManagerOrLandlordFilter, routeRejectTransferRequest);
// DELETE /api/transfers/:transferId
router.delete('/transfers/:transferId', isSelf, routeCancelTransferRequest); // TODO: check if transfer is already processed, cannot delete

// Invites
// GET /api/invites
router.get('/invites', routeGetInvites);
// POST /api/invites
router.post('/invites', isLandlord, routeInviteManager);
// POST /api/invites/:inviteId/accept
router.post('/invites/:inviteId/accept', routeAcceptInvite);
// POST /api/invites/:inviteId/decline
router.post('/invites/:inviteId/decline', routeDeclineInvite);

// Activities
// GET /api/activities
router.get('/activities', routeGetActivities);

// Reports
// GET /api/reports
router.get('/reports', isSuperAdmin, routeGetReports);
// POST /api/reports/:reportId/resolve
router.post('/reports/:reportId/resolve', isSuperAdmin, routeResolveReport);
// POST /api/listings/:listingId/report
router.post('/listings/:listingId/report', isVerifiedStudent, routeReportListing);
// POST /api/users/:userId/report
router.post('/users/:userId/report', isSelfOrSuperAdmin, routeReportUser);

// Messages
// GET /api/messages
router.get('/messages', routeGetMessages);
// GET /api/messages/:userId
router.get('/messages/:userId', routeGetUserMessages);
// POST /api/messages/:userId
router.post('/messages/:userId', routeSendMessage);

// Summaries
// Files
router.post("/files", hasAccount, upload.single("file"), routeUploadFile);

// Notifications
// GET /api/notifications
router.get('/notifications', routeGetNotifications);
// POST /api/notifications/:notificationId
router.get('/notifications/:notificationId', routeGetNotification);
// POST /api/notifications/:notificationId/read
router.post('/notifications/:notificationId/read', routeReadNotification);

// Calendar
// GET /api/calendar
router.get('/calendar', routeGetCalendar);

// creation of fake accounts endpoints
router.post('/auth/test/register', isDevelopment, routeTestRegister);
router.post('/auth/test/login', isDevelopment, routeTestLogin);

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
