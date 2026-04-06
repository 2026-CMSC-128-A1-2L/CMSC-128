import mongoose from 'mongoose';

const applicationFormSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    // TODO: check what preferred room type should do
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
        'contract-signed',
      ],
      default: 'pending',
    },

    // TODO: change to Files
    //
    // Other supporting documents uploaded by student
    documentUrls: [
      {
        file: { type: String, ref: 'File', required: true },
        isVerified: { type: Boolean, default: false },
      },
    ],

    // Room the student is assigned to
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  },
  { timestamps: true },
);

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
