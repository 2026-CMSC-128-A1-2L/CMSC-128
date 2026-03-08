import mongoose from 'mongoose';

//Creates an object model for Sample
const applicationFormSchema = new mongoose.Schema(
  {
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Interaction point: CREATES relationship
    listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }, // Interaction point: HAS relationship (application targets a listing)
    preferredRoomType: { type: String, enum: ['single', 'double', 'shared'], required: false }, // Spec: indicate preferred dormitory and room type
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
    }, // Spec: view application status (pending, approved, rejected, waitlisted)
    documentUrls: [String], // Other supporting documents uploaded by student
    unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }, // Spec: Admin assigns student to a specific room upon final approval
    accommodationNoticeUrl: { type: String, required: false }, // Spec: Admin generates accommodation notice upon final approval
  },
  { timestamps: true },
);

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
