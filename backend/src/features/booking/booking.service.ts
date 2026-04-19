import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { HousingFacility, type HousingFacilityType } from '../facility/facility.model';
import { type BookingType, VisitBooking } from './booking.model';
import { buildQuery } from '../../utils';
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

export const createBooking = async (
  data: CreateBookingArguments,
  filters: QueryFilter<HousingFacilityType>,
) => {
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    throw new AppError(422, 'Booking end date should not be before booking start date date.');
  }

  const facility = await HousingFacility.where(filters).findById(data.facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');

  // TODO: Check availability of managers

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
