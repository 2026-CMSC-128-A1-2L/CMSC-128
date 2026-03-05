import mongoose from 'mongoose';

//Creates an object model for Sample
const applicationFormSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Interaction point: CREATES relationship
  listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }, // Interaction point: HAS relationship (application targets a listing)
  preferredRoomType: { type: String, enum: ['single', 'double', 'shared'], required: false }, // Spec: indicate preferred dormitory and room type
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'waitlisted'],
    default: 'pending',
  }, // Spec: view application status (pending, approved, rejected, waitlisted)
  managerStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }, // Spec: Dormitory Manager provides initial approval or rejection
  landlordStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    // Spec: Landlord grants final approval
  },
  documentUrls: [String], // Other supporting documents uploaded by student
  submittedAt: { type: Date, default: Date.now }, // Spec: application must be submitted within the allowed application period
  unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }, // Spec: Admin assigns student to a specific room upon final approval
  accommodationNoticeUrl: { type: String, required: false }, // Spec: Admin generates accommodation notice upon final approval
});

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
