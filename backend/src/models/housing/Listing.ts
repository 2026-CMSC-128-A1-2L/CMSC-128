import mongoose from 'mongoose';
import { ROOM_TYPES } from '../../constants';

const ListingSchema = new mongoose.Schema({
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

  // include both owners for easier checking of owner, changes to these fields should be rare in practice
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

  // Uses names
  tags: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  roomType: { type: ROOM_TYPES, required: true },
  capacity: { type: Number, required: true },
  isPrivate: { type: Boolean, default: false },
  allowVisit: { type: Boolean, default: false },
  allowTransfer: { type: Boolean, default: false },
  description: { type: String },
  media: [
    {
      // Local source type is used for ones that are uploaded to the object store
      // while external source type is used for ones that are via URL.
      sourceType: { type: String, enum: ['local', 'external'], required: true },
      value: { type: String, required: true },
    },
  ],
});

export const Listing = mongoose.model('Listing', ListingSchema);
