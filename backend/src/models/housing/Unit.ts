import mongoose from "mongoose";

// unit schema
const unitSchema = new mongoose.Schema({
  unitID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  roomNumber: {
    type: Number,
    unique: true,
    required: true, // Spec: Room number identifier
  },

  roomType: {
    type: String,
    enum: ["single", "double", "shared"],
    required: true, // Spec: Room type (single, double, shared)
  },

  capacity: {
    type: Number,
    required: true, // Spec: Capacity per room/bed space
  },

  currentOccupancy: {
    type: Number,
    default: 0,
    // Spec: Current occupancy — used to prevent overbooking of rooms
  },

  price: {
    type: Number,
    required: true,
  },
  floorNumber: {
    type: Number,
    required: false, // Physical location within the building
  },
  status: {
    type: String,
    required: true,
    enum: ["available", "occupied", "reserved", "maintenance"], // reserved = empty but to be occupied soon
  },
  listingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },

  // student with relation to said unit atm
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentVerified",
  },

  transfer_request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TransferRequest",
  },
});

export const Unit = mongoose.model("Unit", unitSchema);
