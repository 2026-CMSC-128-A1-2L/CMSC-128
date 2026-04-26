import mongoose from 'mongoose';
import { documentSchema, type DocumentType } from '../document/document.model';
import { APPLICATION_STATUS } from 'shared';

export type ApplicationStatusType = (typeof APPLICATION_STATUS)[number];

export type ApplicationType = {
  _id: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;

  preferredMoveInDate: Date;
  status: ApplicationStatusType;
  leaseDuration: '6-months' | '12-months';
  moveInDate: Date;
  message?: string | null;
  documents: DocumentType[];
  unitId?: mongoose.Types.ObjectId | null;
};

const applicationFormSchema = new mongoose.Schema<ApplicationType>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

    preferredMoveInDate: { type: Date, required: true },
    status: {
      type: String,
      enum: APPLICATION_STATUS,
      default: 'pending',
    },
    leaseDuration: { type: String, enum: ['6-months', '12-months'], required: true },
    moveInDate: { type: Date, required: true },
    message: String,

    // Other supporting documents uploaded by student
    documents: { type: [documentSchema], required: true, default: [] },

    // Room the student is assigned to
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  },
  { timestamps: true },
);

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
