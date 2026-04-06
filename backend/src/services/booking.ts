import mongoose, { QueryFilter } from 'mongoose';
import { combineFilters } from '../controllers/middleware.js';
import { VisitBooking } from '../models/student-actions/VisitBooking.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { Listing } from '../models/housing/Listing.js';
import { AppError } from '../controllers/error.js';

export type CreateBookingArguments = {
  studentID: mongoose.Types.ObjectId;
  housingID: mongoose.Types.ObjectId;

  startDate: Date;
  endDate: Date;

  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  message?: string;
};

export type GetBookingArguments = {
  studentID?: mongoose.Types.ObjectId;
  housingID?: mongoose.Types.ObjectId;

  startDate?: Date;
  endDate?: Date;

  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  message?: string;
};

export const createBooking = async (data: CreateBookingArguments, filters: any) => {
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    throw new AppError(422, 'Booking end date should not be before booking start date date.');
  }
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: data.housingID }));
  if (!facility) {
    const facilityNoFilter = await HousingFacility.findById(data.housingID);
    if (facilityNoFilter) {
      throw new AppError(403, 'You are not allowed to create a booking for this facility.');
    } else {
      throw new AppError(404, 'Facility not found.');
    }
  }

  const newBooking = new VisitBooking({
    studentID: data.studentID,
    housingID: data.housingID,

    startDate: data.startDate,
    endDate: data.endDate,

    status: data.status ?? 'pending',
    message: data.message,
  });
  return await newBooking.save();
};

export function buildBookingQuery(
  args: Partial<GetBookingArguments>,
): QueryFilter<typeof VisitBooking> {
  const query: QueryFilter<typeof VisitBooking> = {};

  if (args.studentID) {
    query.studentID = args.studentID;
  }

  if (args.housingID) {
    query.housingID = args.housingID;
  }

  if (args.startDate) {
    query.startDate = args.startDate;
  }

  if (args.endDate) {
    query.endDate = args.endDate;
  }

  if (args.status) {
    query.status = args.status;
  }

  if (args.message) {
    query.message = args.message;
  }

  return query;
}

export const getBookings = async (query: Partial<GetBookingArguments>, filters: any) => {
  const dbFilters = buildBookingQuery(query);
  return await VisitBooking.find(combineFilters(filters, dbFilters));
};

export const updateBooking = async (
  bookingId: mongoose.Types.ObjectId,
  data: { startDate?: Date; endDate?: Date; message?: string },
) => {
  const booking = await VisitBooking.findById(bookingId);
  if (!booking) {
    throw new AppError(404, 'Booking not found.');
  }
  if (booking.status !== 'pending') {
    throw new AppError(422, 'Only pending bookings can be updated.');
  }

  if (data.startDate !== undefined) booking.startDate = data.startDate;
  if (data.endDate !== undefined) booking.endDate = data.endDate;
  if (data.message !== undefined) booking.message = data.message;

  if (booking.endDate < booking.startDate) {
    throw new AppError(422, 'Booking end date should not be before start date.');
  }

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

export const approveBooking = async (bookingId: mongoose.Types.ObjectId, filters: any) => {
  const booking = await VisitBooking.findById(bookingId);
  if (!booking) {
    throw new AppError(404, 'Booking not found.');
  }
  if (booking.status !== 'pending') {
    throw new AppError(422, 'Only pending bookings can be approved.');
  }

  const listing = await Listing.findOne(combineFilters(filters, { housingId: booking.housingId }));
  if (!listing) {
    throw new AppError(403, 'Forbidden.');
  }

  booking.status = 'approved';
  return await booking.save();
};

export const rejectBooking = async (bookingId: mongoose.Types.ObjectId, filters: any) => {
  const booking = await VisitBooking.findById(bookingId);
  if (!booking) {
    throw new AppError(404, 'Booking not found.');
  }
  if (booking.status !== 'pending') {
    throw new AppError(422, 'Only pending bookings can be rejected.');
  }

  const listing = await Listing.findOne(combineFilters(filters, { housingId: booking.housingId }));
  if (!listing) {
    throw new AppError(403, 'Forbidden.');
  }

  booking.status = 'rejected';
  return await booking.save();
};

export const getBookingsByStudent = async (studentId: mongoose.Types.ObjectId) => {
  return await VisitBooking.find({ studentId });
};

export const getBookingsByListing = async (
  listingId: mongoose.Types.ObjectId,
  filters: any,
) => {
  const listing = await Listing.findOne(combineFilters(filters, { _id: listingId }));
  if (!listing) {
    throw new AppError(404, 'Listing not found.');
  }

  return await VisitBooking.find({ housingId: listing.housingId });
};
