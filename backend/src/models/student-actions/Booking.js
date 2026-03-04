import mongoose from 'mongoose';

const visitBookingSchema = new mongoose.Schema({
  VisitBookingId: { type: mongoose.Schema.Types.ObjectId, unique: true },
  studentID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'VerifiedStudent', // Interaction point: PAYS relationship
    required: true
  },

  housingID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Housing Facility',
    required: true
  },

  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' },
  endDateTime: { type: Date, required: true },
  startDateTime: { type: Date, required: true },
  
  // Reason for booking
  request: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const VisitBooking = mongoose.model('VisitBooking', visitBookingSchema);