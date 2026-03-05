import mongoose from "mongoose";

const HousingFacilitySchema = new mongoose.Schema({
  housingID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  name: {
    type: String,
    required: true,
  },

  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VerifiedLandlord", // Interaction point: HAS relationship (landlord owns facility)
    required: true,
  },

  manager_id: {
    type: mongoose.Schema.Types.ObjectId, // reference to Manager
    ref: "Manager",
  },

  location: {
    // format for GeoJSON
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lat, long]
    },
  },

  type: {
    type: String,
    enum: ["on-campus", "off-campus", "partner housing"],
    required: true,
    // Spec: Type (on-campus, off-campus, partner housing)
  },

  capacity: {
    type: Number,
    required: true,
    // Spec: Capacity of the housing facility
  },

  totalUnits: {
    type: Number,
    default: 0,
    // Derived count of rooms/bed spaces under this facility
  },

  documentsUrl: [{ type: String }],

  isAcceptingApplications: {
    type: Boolean,
    default: true,
    // Spec: application must be submitted within the allowed application period
  },

  applicationOpenDate: {
    type: Date,
    required: false, // Spec: start of the allowed application period
  },

  applicationCloseDate: {
    type: Date,
    required: false, // Spec: end of the allowed application period
  },

  listings: [
    {
      type: mongoose.Schema.Types.ObjectId, // array of listing
      ref: "Listing",
    },
  ],
});

export const HousingFacility = mongoose.model(
  "HousingFacility",
  HousingFacilitySchema,
);
