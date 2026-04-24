import mongoose from 'mongoose';
import type { FacilityType } from 'shared';
import { documentSchema, type DocumentType } from '../document/document.model';

export type ManagerPermissionType = {
  manageBillings: boolean;
  manageApplications: boolean;
  manageListings: boolean;
};

export const managerPermissionSchema = new mongoose.Schema<ManagerPermissionType>({
  manageBillings: { type: Boolean, default: false },
  manageApplications: { type: Boolean, default: false },
  manageListings: { type: Boolean, default: false },
});

export type HousingFacilityType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  landlordId: mongoose.Types.ObjectId;
  managers: {
    userId: mongoose.Types.ObjectId;
    permissions: ManagerPermissionType;
  }[];
  location: {
    coordinates: {
      lat: number;
      long: number;
    };
    text: string;
  };
  type: FacilityType;
  status: 'pending' | 'approved' | 'rejected' | 'submitted';
  capacity: number;
  documents: DocumentType[];

  // For reviews

  qualityAvg: number;
  comfortAvg: number;
  environmentAvg: number;
  reviewCount: number;

  // Overrides dates if specified
  isAcceptingApplications?: boolean;

  // Range of allowed application period. Can be overridden by `isAcceptingApplications`
  applicationOpenDate?: Date;
  applicationCloseDate?: Date;

  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;

  description: string;
  media: {
    sourceType: 'local' | 'external';
    value: string;
  }[];
};

const HousingFacilitySchema = new mongoose.Schema<HousingFacilityType>(
  {
    name: { type: String, required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
    managers: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          permissions: {
            type: managerPermissionSchema,
            required: true,
          },
        },
      ],
      required: true,
    },
    location: {
      coordinates: {
        type: new mongoose.Schema(
          {
            lat: { type: Number, required: true },
            long: { type: Number, required: true },
          },
          { _id: false },
        ),
        required: true,
      },
      text: { type: String, required: true },
    },
    type: { type: String, enum: ['on-campus', 'off-campus', 'partner housing'], required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'submitted'],
      required: true,
      default: 'pending',
    },
    capacity: { type: Number, required: true },
    documents: [documentSchema],

    // For review
    qualityAvg: { type: Number, default: 0.0 },
    comfortAvg: { type: Number, default: 0.0 },
    environmentAvg: { type: Number, default: 0.0 },

    reviewCount: { type: Number, default: 0 },

    isPrivate: { type: Boolean, default: false },
    allowVisit: { type: Boolean, default: false },
    allowTransfer: { type: Boolean, default: false },
    // Overrides dates if specified
    isAcceptingApplications: { type: Boolean, default: false },

    // Range of allowed application period. Can be overridden by `isAcceptingApplications`
    applicationOpenDate: { type: Date, required: false },
    applicationCloseDate: { type: Date, required: false },

    verifiedAt: Date,

    description: { type: String, required: true },
    media: [
      {
        // Local source type is used for ones that are uploaded to the object store
        // while external source type is used for ones that are via URL.
        sourceType: { type: String, enum: ['local', 'external'], required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
