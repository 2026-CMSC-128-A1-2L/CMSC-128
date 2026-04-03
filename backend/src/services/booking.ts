import mongoose, { QueryFilter } from 'mongoose';
import { combineFilters } from '../controllers/middleware.js';
import { VisitBooking } from '../models/student-actions/VisitBooking.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { AppError } from '../controllers/error.js';

export type CreateBookingArguments = {
  studentId: mongoose.Types.ObjectId;
  housingId: mongoose.Types.ObjectId;

  startDate: Date;
  endDate: Date;

  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  message?: string;
};

export type GetBookingArguments = {
  studentId?: mongoose.Types.ObjectId;
  housingId?: mongoose.Types.ObjectId;

  startDate?: Date;
  endDate?: Date;

  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  message?: string;
};

export const createBooking = async (data: CreateBookingArguments, filters: any) => {
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    throw new AppError(422, 'Booking end date should not be before booking start date date.');
  }
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: data.housingId }));
  if (!facility) {
    const facilityNoFilter = await HousingFacility.findById(data.housingId);
    if (facilityNoFilter) {
      throw new AppError(403, 'You are not allowed to create a booking for this facility.');
    } else {
      throw new AppError(404, 'Facility not found.');
    }
  }

  const newBooking = new VisitBooking({
    studentId: data.studentId,
    housingId: data.housingId,

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

  if (args.studentId) {
    query.studentId = args.studentId;
  }

  if (args.housingId) {
    query.housingId = args.housingId;
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
