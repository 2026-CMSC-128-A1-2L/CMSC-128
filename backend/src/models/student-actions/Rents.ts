import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Interaction point: PAYS relationship
  unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true }, // Interaction point: payment is for this unit
  applicationID: { type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationForm', required: false }, // Interaction point: created from an approved ApplicationForm
  status: { type: String, enum: ['active', 'ended', 'on_waitlist', 'inactive'], default: 'active' }, // Spec: 'on_waitlist' for students on the waiting list

  expectedMoveInDate: { type: Date },
  expectedMoveOutDate: { type: Date },

  actualMoveInDate: { type: Date },
  actualMoveOutDate: { type: Date },

  overrideReason: {
    type: String,
    required: false,
    // Spec: Landlord can override room assignments — reason is documented here
  },
  duration: { type: Number }, // optional, can just be calculated from move-in and move-out dates
});

export const Rental = mongoose.model('Rental', rentalSchema);
