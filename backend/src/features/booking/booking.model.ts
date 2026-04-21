import mongoose from 'mongoose';
import { BOOKING_STATUS, type BookingStatusType } from 'shared';

export type BookingType = {
  userId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  status: BookingStatusType;
  startDate: Date;
  endDate: Date;
  message?: string | null;
};

const visitBookingSchema = new mongoose.Schema<BookingType>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    status: { type: String, enum: BOOKING_STATUS, default: 'pending' },
    endDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    message: { type: String },
  },
  { timestamps: true },
);

export const VisitBooking = mongoose.model('VisitBooking', visitBookingSchema);
