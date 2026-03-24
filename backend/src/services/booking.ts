import mongoose, { QueryFilter } from 'mongoose';
import { combineFilters } from '../controllers/middleware.js';
import { VisitBooking } from '../models/student-actions/VisitBooking.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
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
  if (
    data.startDate &&
    data.endDate &&
    data.endDate < data.startDate
  ) {
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

export function buildBookingQuery(args: Partial<GetBookingArguments>
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
