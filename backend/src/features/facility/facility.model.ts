import mongoose from 'mongoose';
import { FacilityType } from 'shared';
import { documentSchema, DocumentType } from '../document/document.model';

export type ManagerPermissionType = {
  manageBillings: boolean;
  manageApplications: boolean;
  manageListings: boolean;
};

export type HousingFacilityType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  landlord: mongoose.Types.ObjectId;
  managers: {
    user: mongoose.Types.ObjectId;
    permissions: ManagerPermissionType;
  }[];
  location?: {
    coordinates?: {
      lat: number;
      long: number;
    };
    text?: string;
  };
  type: FacilityType;
  capacity: number;
  documents: DocumentType[];

  // Overrides dates if specified
  isAcceptingApplications?: boolean;

  // Range of allowed application period. Can be overridden by `isAcceptingApplications`
  applicationOpenDate?: Date;
  applicationCloseDate?: Date;

  createdAt: Date;
  updatedAt: Date;
};

const HousingFacilitySchema = new mongoose.Schema<HousingFacilityType>(
  {
    name: { type: String, required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
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
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
      },
      // TODO: cache distances
      text: String, // location as text
    },
    type: { type: String, enum: ['on-campus', 'off-campus', 'partner housing'], required: true },
    capacity: { type: Number, required: true },
    documents: [documentSchema],

    // Overrides dates if specified
    isAcceptingApplications: { type: Boolean, default: false },

    // Range of allowed application period. Can be overridden by `isAcceptingApplications`
    applicationOpenDate: { type: Date, required: false },
    applicationCloseDate: { type: Date, required: false },
  },
  { timestamps: true },
);

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
