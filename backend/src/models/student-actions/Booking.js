import mongoose from 'mongoose';

const visitBookingSchema = new mongoose.Schema({
  VisitBookingId: { type: mongoose.Schema.Types.ObjectId, unique: true },
  StudentEmail: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  HousingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Housing' },
  Status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'] },
  EndDateTime: { type: Date },
  StartDateTime: { type: Date },
  // Reason for booking
  Request: { type: String },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
});

export const VisitBooking = mongoose.model('VisitBooking', visitBookingSchema);