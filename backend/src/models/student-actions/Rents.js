import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  rentalID: { type: mongoose.Schema.Types.ObjectId, unique: true },

  studentID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'VerifiedStudent', // Interaction point: PAYS relationship
    required: true
  },

  unitID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Unit',            // Interaction point: payment is for this unit
    required: true
  },

  applicationID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'ApplicationForm',
    required: false
    // Interaction point: created from an approved ApplicationForm
  },

  status: {
    type:    String,
    enum:    ['active', 'ended', 'on_waitlist', 'inactive'],
    default: 'active'
    // Spec: 'on_waitlist' for students on the waiting list
  },

  expectedMoveInDate: { type: Date },
  expectedMoveOutDate: { type: Date },

  actualMoveInDate: { type: Date },
  actualMoveOutDate: { type: Date },

  assignedBy: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Administrator',
    required: false
    // Spec: Admin assigns student to room / can override room assignments
  },

  overrideReason: {
    type:     String,
    required: false
    // Spec: Admin can override room assignments — reason is documented here
  },

  duration: { type: Number } // optional, can just be calculated from move-in and move-out dates
});


export const Rental = mongoose.model('Rental', rentalSchema);

