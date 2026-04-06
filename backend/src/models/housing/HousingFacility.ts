import mongoose from 'mongoose';
import { ROOM_TYPES } from '../../constants';

const HousingFacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },

  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  managers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
      permissions: {
        type: {
          manageBillings: { type: Boolean, default: false },
          manageApplications: { type: Boolean, default: false },
          manageListings: { type: Boolean, default: false },
        },
        required: true,
      },
    },
  ],

  location: {
    coordinates: {
      type: [Number], // [lat, long]
    },
    text: String, // location as text
  },

  type: { type: String, enum: ['on-campus', 'off-campus', 'partner housing'], required: true },
  capacity: { type: Number, required: true },

  documents: [
    {
      file: { type: String, ref: 'File', required: true },
      isVerified: { type: Boolean, default: false },
    },
  ],

  // Overrides dates if specified
  isAcceptingApplications: { type: Boolean, default: false },

  // Range of allowed application period. Can be overridden by `isAcceptingApplications`
  applicationOpenDate: { type: Date, required: false },
  applicationCloseDate: { type: Date, required: false },
});

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
