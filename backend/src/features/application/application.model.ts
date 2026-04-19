import mongoose from 'mongoose';
import { documentSchema, type DocumentType } from '../document/document.model';

const APPLICATION_STATUS = [
  'pending',
  'manager-approved',
  'manager-rejected',
  'manager-waitlisted',
  'landlord-rejected',
  'landlord-approved',
  'landlord-waitlisted',
  'contract-signed',
] as const;

export type ApplicationStatusType = (typeof APPLICATION_STATUS)[number];

export type ApplicationType = {
  userId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
  status: ApplicationStatusType;
  documents: DocumentType[];
  unitId?: mongoose.Types.ObjectId | null;
};

const applicationFormSchema = new mongoose.Schema<ApplicationType>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    // TODO: check what preferred room type should do
    status: {
      type: String,
      enum: APPLICATION_STATUS,
      default: 'pending',
    },

    // Other supporting documents uploaded by student
    documents: { type: [documentSchema], required: true, default: [] },

    // Room the student is assigned to
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  },
  { timestamps: true },
);

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
