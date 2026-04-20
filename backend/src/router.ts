import { Router } from 'express';

import activityRouter from './features/activity/activity.router';
import applicationRouter from './features/application/application.router';
import authRouter from './features/auth/auth.router';
import billingRouter from './features/billing/billing.router';
import bookingRouter from './features/booking/booking.router';
import bookmarkRouter from './features/bookmark/bookmark.router';
import calendarRouter from './features/calendar/calendar.router';
import facilityRouter from './features/facility/facility.router';
import fileRouter from './features/file/file.router';
import inviteRouter from './features/invite/invite.router';
import listingRouter from './features/listing/listing.router';
import messageRouter from './features/message/message.router';
import notificationRouter from './features/notification/notification.router';
import profileRouter from './features/profile/profile.router';
import rentalRouter from './features/rental/rental.router';
import reportRouter from './features/report/report.router';
import reviewRouter from './features/review/review.router';
import tagRouter from './features/tag/tag.router';
import transferRouter from './features/transfer/transfer.router';
import unitRouter from './features/unit/unit.router';
import userRouter from './features/user/user.router';

import { errorHandler } from './error';

const router = Router();

router.use('/activities', activityRouter);
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
