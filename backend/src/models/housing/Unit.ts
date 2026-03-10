import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
  listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },

  roomNumber: { type: String, unique: true, required: true },
  capacity: { type: Number, required: true },

  // NOTE: Always keep consistent everytime a user gets accepted or moves out.
  currentOccupancy: { type: Number, default: 0 },
  price: { type: Number, required: true },

  // Location inside the building
  location: { type: String, required: false },
  isAvailable: { type: Boolean, required: true, default: true },

  // include both owners for easier checking of owner, changes to these fields should be rare in practice
  landlordID: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
});

export const Unit = mongoose.model('Unit', unitSchema);
