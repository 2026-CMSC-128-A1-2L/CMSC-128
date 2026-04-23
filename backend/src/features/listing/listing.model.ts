import mongoose from 'mongoose';
import { ROOM_TYPES } from 'shared';
import { managerPermissionSchema } from '../facility/facility.model';

export type ListingType = {
  _id: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  managers: {
    userId: mongoose.Types.ObjectId;
    permissions: { manageBillings: boolean; manageApplications: boolean; manageListings: boolean };
  }[];
  tags: Record<string, any>;
  roomType: (typeof ROOM_TYPES)[number];
  capacity: number;
  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  description?: string | null;
  media: {
    sourceType: 'local' | 'external';
    value: string;
  }[];
};

const ListingSchema = new mongoose.Schema<ListingType>({
  // include both owners for easier checking of owner, changes to these fields should be rare in practice
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },

  managers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
      permissions: {
        type: managerPermissionSchema,
        required: true,
      },
    },
  ],

  // Uses names
  tags: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  roomType: { type: String, enum: ROOM_TYPES, required: true },
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
