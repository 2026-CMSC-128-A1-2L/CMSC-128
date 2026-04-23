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
  tags: Record<string, number | string | boolean>;
  roomType: (typeof ROOM_TYPES)[number];
  capacity: number;
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

  // A map of tag names to a string, number, or a boolean
  tags: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  roomType: { type: String, enum: ROOM_TYPES, required: true },

  // Maximum number of tenants in one unit
  capacity: { type: Number, required: true },

  // Optional description
  description: String,

  // List of images or video
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
