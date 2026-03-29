import mongoose from 'mongoose';
import { ROOM_TYPES } from '../../constants';

const ListingSchema = new mongoose.Schema({
  housingId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

  // include both owners for easier checking of owner, changes to these fields should be rare in practice
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },

  tags: [
    {
      // Use names instead of id for easier querying:
      //  When getting listings, filters include the name of the tag and the value (or range).
      //  The name is not directly inside this document, so it cannot be queried like that.
      name: { type: String, required: true },
      value: mongoose.Schema.Types.Mixed,
    },
  ],
  roomType: { type: ROOM_TYPES, required: true },
  capacity: { type: Number, required: true },
  isPrivate: { type: Boolean, default: false },
  allowVisit: { type: Boolean, default: false },
  allowTransfer: { type: Boolean, default: false },
  description: { type: String },
  mediaUrls: [{ type: String }],
  units: [{ type: String }], // room "numbers" can contain non-numeric characters
});

export const Listing = mongoose.model('Listing', ListingSchema);
