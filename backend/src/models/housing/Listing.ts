import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
  listingID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  housingID: {
    type: mongoose.Schema.Types.ObjectId, // reference to parent housing
    ref: 'HousingFacility',
    required: true,
  },
  tags: {
    type: Array,
    default: [],
    // Each entry is an ObjectId ref: 'Tag'
    // Interaction point: HAS (many-to-many) with Tag.js
  },
  room_type: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: true,
  },
  allowVisit: {
    type: Boolean,
    default: false,
  },
  allowTransfer: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  mediaUrls: [{ type: String }],
  units: [
    { type: Number }, // array of room numbers
  ],
});

export const Listing = mongoose.model('Listing', ListingSchema);
