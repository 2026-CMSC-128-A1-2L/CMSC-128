import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  roomNumber: { type: String, unique: true, required: true },

  // NOTE: Always keep consistent everytime a user gets accepted or moves out.
  currentRentals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }],
  price: { type: Number, required: true },

  // Location inside the building
  location: { type: String, required: false },
  isAvailable: { type: Boolean, required: true, default: true },
});

unitSchema.index({ listingId: 1, roomNumber: 1 }, { unique: true });

export const Unit = mongoose.model('Unit', unitSchema);
