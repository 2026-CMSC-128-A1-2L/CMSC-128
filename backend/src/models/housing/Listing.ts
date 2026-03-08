import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
  // reference to parent housing
  housingID: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

  // include both owners for easier checking of owner, changes to these fields should be rare in practice
  landlordID: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },

  // Each entry is an ObjectId ref: 'Tag'
  // Interaction point: HAS (many-to-many) with Tag.js
  tags: [
    {
      tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
      value: mongoose.Schema.Types.Mixed,
    },
  ],
  // roomType: { type: String, enum: ['single', 'double', 'shared'], required: true }, // Spec: Room type (single, double, shared)
  roomType: { type: String, required: true },
  capacity: { type: Number, required: true },
  isPrivate: { type: Boolean, default: false },
  allowVisit: { type: Boolean, default: false },
  allowTransfer: { type: Boolean, default: false },
  description: { type: String },
  mediaUrls: [{ type: String }],
  units: [{ type: String }], // room "numbers" can contain non-numeric characters
});

export const Listing = mongoose.model('Listing', ListingSchema);
