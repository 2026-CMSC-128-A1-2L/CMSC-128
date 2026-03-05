import mongoose from 'mongoose';

const HousingFacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  landlordID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VerifiedLandlord', // Interaction point: HAS relationship (landlord owns facility)
    required: true,
  },

  managerID: {
    type: mongoose.Schema.Types.ObjectId, // reference to Manager
    ref: 'Manager',
  },

  location: {
    // format for GeoJSON
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [lat, long]
    },
  },

  type: {
    type: String,
    enum: ['on-campus', 'off-campus', 'partner housing'],
    required: true,
    // Spec: Type (on-campus, off-campus, partner housing)
  },

  capacity: {
    type: Number,
    required: true,
    // Spec: Capacity of the housing facility
  },

  documentUrls: [{ type: String }],

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
      ref: 'Listing',
    },
  ],
});

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
