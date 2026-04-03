import mongoose from 'mongoose';
import { ROOM_TYPES } from '../../constants';

const HousingFacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },

  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  managers: [
    {
      managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
      permissions: {
        manageBillings: { type: Boolean, default: false },
        manageApplications: { type: Boolean, default: false },
        manageListings: { type: Boolean, default: false },
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

  // TODO: replace with Files
  documentUrls: [{ type: String }],

  // Overrides dates if specified
  isAcceptingApplications: { type: Boolean, default: false },

  // Range of allowed application period. Can be overridden by `isAcceptingApplications`
  applicationOpenDate: { type: Date, required: false },
  applicationCloseDate: { type: Date, required: false },

  // Reference to Listings
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
});

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
