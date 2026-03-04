import mongoose from 'mongoose';

//Creates an object model for Sample
const applicationFormSchema = new mongoose.Schema({
  applicationFormID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  studentID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'VerifiedStudent', // Interaction point: CREATES relationship
    required: true
  },

  listingID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Listing',         // Interaction point: HAS relationship (application targets a listing)
    required: true
  },

  preferredRoomType: {
    type:     String,
    enum:     ['single', 'double', 'shared'],
    required: false
    // Spec: indicate preferred dormitory and room type
  },

  status: {
    type:    String,
    enum:    ['pending', 'approved', 'rejected', 'waitlisted'],
    default: 'pending'
    // Spec: view application status (pending, approved, rejected, waitlisted)
  },

  managerStatus: {
    type:    String,
    enum:    ['pending', 'approved', 'rejected'],
    default: 'pending'
    // Spec: Dormitory Manager provides initial approval or rejection
  },

  adminStatus: {
    type:    String,
    enum:    ['pending', 'approved', 'rejected'],
    default: 'pending'
    // Spec: Housing Administrator grants final approval
  },

  formDocumentsUrl: {
    type:     String,
    required: false     // Other supporting documents uploaded by student
  },

  submittedAt: {
    type:    Date,
    default: Date.now
    // Spec: application must be submitted within the allowed application period
  },

  assignedUnitId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Unit',
    required: false
    // Spec: Admin assigns student to a specific room upon final approval
  },

  accommodationNoticeUrl: {
    type:     String,
    required: false
    // Spec: Admin generates accommodation notice upon final approval
  }

});

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
