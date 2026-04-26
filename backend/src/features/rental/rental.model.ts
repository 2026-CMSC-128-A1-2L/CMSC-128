import mongoose from 'mongoose';

const RENTAL_STATUS = ['active', 'ended', 'on_waitlist', 'inactive'] as const;
type RentalStatusType = (typeof RENTAL_STATUS)[number];

export type RentalType = {
  userId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;
  applicationId?: mongoose.Types.ObjectId | null;
  status: RentalStatusType;
  expectedMoveInDate?: Date | null;
  expectedMoveOutDate?: Date | null;
  actualMoveInDate?: Date | null;
  actualMoveOutDate?: Date | null;
};

// Created after application is accepted by the landlord.
// Rentals are created when an application becomes contract-signed.
// NOTE: Existing tenants from the old system may have rentals without applications.
const rentalSchema = new mongoose.Schema<RentalType>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },

  // for easier permission checks
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
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
