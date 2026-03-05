import mongoose from 'mongoose';

const visitBookingSchema = new mongoose.Schema(
  {
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Interaction point: PAYS relationship
    housingID: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
    },
    endDateTime: { type: Date, required: true },
    startDateTime: { type: Date, required: true },

    // Reason for booking
    request: { type: String },
  },
  { timestamps: true },
);

export const VisitBooking = mongoose.model('VisitBooking', visitBookingSchema);
