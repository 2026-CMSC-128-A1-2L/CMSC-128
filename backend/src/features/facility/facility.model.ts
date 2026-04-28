import mongoose from 'mongoose';
import {
  ManagerPermission,
  ManagerPermissionSchema,
  MANAGER_PERMISSIONS,
  type FacilityType,
} from 'shared';
import { documentSchema, type DocumentType } from '../document/document.model';
import z from 'zod';

export type ManagerPermissionType = z.infer<typeof ManagerPermissionSchema>;

const permissionDefinition = MANAGER_PERMISSIONS.reduce(
  (acc, permission) => {
    acc[permission] = { type: Boolean, default: false };
    return acc;
  },
  {} as Record<ManagerPermission, { type: BooleanConstructor; default: boolean }>,
);

export const managerPermissionSchema = new mongoose.Schema<ManagerPermissionType>(
  permissionDefinition,
);

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
  landmarkDistances: {
    landmark: string;
    linearDistance: number;
    walkingDistance: number;
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

    // Distance form landmarks
    landmarkDistances: {
      type: [
        {
          landmark: { type: String, required: true },
          linearDistance: { type: Number, default: 0 },
          walkingDistance: { type: Number, default: 0 },
        },
      ],
      default: [
        { landmark: 'cem', linearDistance: 0, walkingDistance: 0 },
        { landmark: 'fpark', linearDistance: 0, walkingDistance: 0 },
        { landmark: 'upHc', linearDistance: 0, walkingDistance: 0 },
        { landmark: 'upGate', linearDistance: 0, walkingDistance: 0 },
      ],
    },
  },
  { timestamps: true },
);

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
