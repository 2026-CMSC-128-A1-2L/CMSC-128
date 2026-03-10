import mongoose from 'mongoose';

// Created after application is accepted by the landlord.
const rentalSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

  // TODO: verify if not required, do all rentals come from applications?
  applicationID: { type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationForm', required: false },

  // 'inactive' when accepted, but not yet moved in.
  // 'active' when accepted and moved in.
  // 'ended' when accepted, moved in, and moved out.
  status: {
    type: String,
    enum: ['active', 'ended', 'on_waitlist', 'inactive'],
    default: 'inactive',
  },

  // Expected dates are filled up when 'inactive'
  // Actual move in date is filled up when 'active' and the tenant moves in.
  // Actual move out date is filled up when 'ended' and the tenant moves out.
  expectedMoveInDate: { type: Date },
  expectedMoveOutDate: { type: Date },
  actualMoveInDate: { type: Date },
  actualMoveOutDate: { type: Date },

  // Override reason is removed and is instead added to activities.
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
});

export const Rental = mongoose.model('Rental', rentalSchema);
