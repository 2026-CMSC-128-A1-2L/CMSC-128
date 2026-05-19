import { Router } from 'express';

import activityRouter from './features/activity/activity.router.js';
import availabilityRouter from './features/availability/availability.router.js';
import applicationRouter from './features/application/application.router.js';
import authRouter from './features/auth/auth.router.js';
import billingRouter from './features/billing/billing.router.js';
import bookingRouter from './features/booking/booking.router.js';
import bookmarkRouter from './features/bookmark/bookmark.router.js';
import calendarRouter from './features/calendar/calendar.router.js';
import facilityRouter from './features/facility/facility.router.js';
import fileRouter from './features/file/file.router.js';
import inviteRouter from './features/invite/invite.router.js';
import listingRouter from './features/listing/listing.router.js';
import messageRouter from './features/message/message.router.js';
import notificationRouter from './features/notification/notification.router.js';
import profileRouter from './features/profile/profile.router.js';
import rentalRouter from './features/rental/rental.router.js';
import removeRouter from './features/remove/remove.router.js';
import reportRouter from './features/report/report.router.js';
import reviewRouter from './features/review/review.router.js';
import tagRouter from './features/tag/tag.router.js';
import transferRouter from './features/transfer/transfer.router.js';
import unitRouter from './features/unit/unit.router.js';
import userRouter from './features/user/user.router.js';

import { errorHandler } from './error.js';

const router = Router();

router.use('/activities', activityRouter);
router.use('/availability', availabilityRouter);
router.use('/applications', applicationRouter);
router.use('/billings', billingRouter);
router.use('/bookings', bookingRouter);
router.use('/bookmarks', bookmarkRouter);
router.use('/facilities', facilityRouter);
router.use('/files', fileRouter);
router.use('/invites', inviteRouter);
router.use('/listings', listingRouter);
router.use('/messages', messageRouter);
router.use('/notifications', notificationRouter);
router.use('/profiles', profileRouter);
router.use('/rentals', rentalRouter);
router.use('/removal-requests', removeRouter);
router.use('/reports', reportRouter);
router.use('/reviews', reviewRouter);
router.use('/tags', tagRouter);
router.use('/transfers', transferRouter);
router.use('/units', unitRouter);
router.use('/users', userRouter);

router.use('/auth', authRouter);
router.use('/calendar', calendarRouter);

router.use(errorHandler);

export { router as apiRouter };
