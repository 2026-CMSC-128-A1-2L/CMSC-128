import mongoose from 'mongoose';

const visitBookingSchema = new mongoose.Schema({
  VisitBookingId: { type: mongoose.Schema.Types.ObjectId, unique: true },
  StudentEmail: { type: String, ref: 'Student' },
  HousingID: { type: String, ref: 'Housing' },
  Status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'] },
  EndDateTime: { type: Date },
  StartDateTime: { type: Date },
  Request: { type: String },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
});

export const VisitBooking = mongoose.model('VisitBooking', visitBookingSchema);