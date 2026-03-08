import mongoose from 'mongoose';

// unit schema
const unitSchema = new mongoose.Schema({
  roomNumber: { type: String, unique: true, required: true }, // Spec: Room number identifier
  capacity: { type: Number, required: true }, // Spec: Capacity per room/bed space
  currentOccupancy: { type: Number, default: 0 }, // Spec: Current occupancy — used to prevent overbooking of rooms
  price: { type: Number, required: true },
  floorNumber: { type: Number, required: false }, // Physical location within the building
  status: {
    type: String,
    required: true,
    enum: ['available', 'unavailable'],
  },
  listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },

  // include both owners for easier checking of owner, changes to these fields should be rare in practice
  landlordID: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
});

export const Unit = mongoose.model('Unit', unitSchema);
