import mongoose from 'mongoose';

const visitBookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
    },
    endDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    message: { type: String },
  },
  { timestamps: true },
);

export const VisitBooking = mongoose.model('VisitBooking', visitBookingSchema);
