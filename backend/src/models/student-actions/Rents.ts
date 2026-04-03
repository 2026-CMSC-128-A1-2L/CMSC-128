import mongoose from 'mongoose';

// Created after application is accepted by the landlord.
// Rentals are created when an application becomes contract-signed.
// Note: Existing tenants from the old system may have rentals without applications.
const rentalSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

  // Not required because existing tenants from the old system may not have applications.
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationForm', required: false },

  // 'inactive' when accepted, but not yet moved in.
  // 'active' when accepted and moved in.
  // 'ended' when accepted, moved in, and moved out.
  status: {
    type: String,
    enum: ['active', 'ended', 'on_waitlist', 'inactive'],

    // TODO: verify if should be 'active' since rental is created after contract is signed
    default: 'inactive',
  },

  // Expected dates are filled up when 'inactive'
  // Actual move in date is filled up when 'active' and the tenant moves in.
  // Actual move out date is filled up when 'ended' and the tenant moves out.
  expectedMoveInDate: { type: Date },
  expectedMoveOutDate: { type: Date },
  actualMoveInDate: { type: Date },
  actualMoveOutDate: { type: Date },
});

export const Rental = mongoose.model('Rental', rentalSchema);
