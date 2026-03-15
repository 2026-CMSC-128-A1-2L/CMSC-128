import mongoose from 'mongoose';
import { ROOM_TYPES } from '../../constants';

const applicationFormSchema = new mongoose.Schema(
  {
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    preferredRoomType: { type: String, enum: ROOM_TYPES, required: false },
    status: {
      type: String,
      enum: [
        'pending',
        'manager-approved',
        'manager-rejected',
        'manager-waitlisted',
        'landlord-rejected',
        'landlord-approved',
        'landlord-waitlisted',
      ],
      default: 'pending',
    },

    // TODO: change to Files
    //
    // Other supporting documents uploaded by student
    documentUrls: [String],

    // Room the student is assigned to
    unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  },
  { timestamps: true },
);

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
