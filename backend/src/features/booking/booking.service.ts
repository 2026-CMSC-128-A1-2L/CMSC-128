import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { HousingFacility, type HousingFacilityType } from '../facility/facility.model.js';
import { type BookingType, VisitBooking } from './booking.model.js';
import { buildQuery } from '../../utils.js';
import type { BookingStatusType } from 'shared';

export type CreateBookingArguments = {
  userId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;

  startDate: Date;
  endDate: Date;

  status?: BookingStatusType;
  message?: string;
};

export type GetBookingArguments = {
  userId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;

  startDate: {
    min?: Date;
    max?: Date;
  };
  endDate: {
    min?: Date;
    max?: Date;
  };

  status: BookingStatusType;
  message: string;
};

const DEFAULT_VISIT_START_HOUR = 9;
const DEFAULT_VISIT_END_HOUR = 17;
const VISIT_SLOT_MINUTES = 60;

const isSameSlot = (left: Date, right: Date) => left.getTime() === right.getTime();

const getDayBounds = (date: Date) => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return { dayStart, dayEnd };
};

const getDefaultVisitStarts = (date: Date) => {
  const { dayStart } = getDayBounds(date);
  const dayOfWeek = dayStart.getDay();

  // TODO: Replace these default hours with persisted landlord/manager availability.
  return dayOfWeek === 0 || dayOfWeek === 6
    ? []
    : Array.from({ length: DEFAULT_VISIT_END_HOUR - DEFAULT_VISIT_START_HOUR }, (_, index) => {
        const start = new Date(dayStart);
        start.setHours(DEFAULT_VISIT_START_HOUR + index, 0, 0, 0);
        return start;
      });
};

export const getAvailableVisitSlots = async (
  facilityId: mongoose.Types.ObjectId,
  date: Date,
  filters: QueryFilter<HousingFacilityType> = {},
) => {
  const facility = await HousingFacility.where(filters).findById(facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');
  if (!facility.allowVisit) return [];

  const { dayStart, dayEnd } = getDayBounds(date);
  const availableStarts = getDefaultVisitStarts(date).filter((start) => start > new Date());

  const bookedSlots = await VisitBooking.find({
    facilityId,
    status: { $ne: 'cancelled' },
    startDate: { $gte: dayStart, $lte: dayEnd },
  }).select('startDate');

  return availableStarts.map((startDate) => {
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + VISIT_SLOT_MINUTES);

    return {
      startDate,
      endDate,
      available: !bookedSlots.some((booking) => isSameSlot(booking.startDate, startDate)),
    };
  });
};

export const createBooking = async (
  data: CreateBookingArguments,
  filters: QueryFilter<HousingFacilityType> = {},
) => {
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    throw new AppError(422, 'Booking end date should not be before booking start date date.');
  }
  if (data.startDate < new Date()) {
    throw new AppError(422, 'Booking start date should not be in the past.');
  }

  const facility = await HousingFacility.where(filters).findById(data.facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');
  if (!facility.allowVisit) throw new AppError(422, 'This facility is not accepting visits.');

  const selectedSlotStart = getDefaultVisitStarts(data.startDate).find((slotStart) =>
    isSameSlot(slotStart, data.startDate),
  );
  if (!selectedSlotStart) {
    throw new AppError(422, 'Selected visit time is outside the available schedule.');
  }
  const existingBooking = await VisitBooking.exists({
    facilityId: data.facilityId,
    status: { $ne: 'cancelled' },
    startDate: data.startDate,
  });
  if (existingBooking) {
    throw new AppError(409, 'Selected visit slot is no longer available.');
  }

  // TODO: When landlord approval is implemented, keep new bookings pending until approve/reject.
  // For now, pending bookings are considered accepted by the student calendar flow.
  const newBooking = new VisitBooking(data);
  return await newBooking.save();
};

export const getBookings = async (
  query: Partial<GetBookingArguments>,
  filters: QueryFilter<BookingType>,
) => {
  return await VisitBooking.where(filters).find(buildQuery<BookingType>(query));
};

export const updateBookingStatus = async (
  bookingId: mongoose.Types.ObjectId,
  status: BookingStatusType,
  filters: QueryFilter<BookingType>,
) => {
  const booking = await VisitBooking.findOne(combineFilters(filters, { _id: bookingId }));
  if (!booking) throw new AppError(404, 'Booking not found.');

  if (booking.status !== 'pending') {
    throw new AppError(400, 'Booking has already been processed.');
  }

  booking.status = status;
  return await booking.save();
};

export const cancelBooking = async (bookingId: mongoose.Types.ObjectId) => {
  const booking = await VisitBooking.findById(bookingId);
  if (!booking) {
    throw new AppError(404, 'Booking not found.');
  }
  if (booking.status !== 'pending') {
    throw new AppError(422, 'Only pending bookings can be cancelled.');
  }

  booking.status = 'cancelled';
  return await booking.save();
};
