import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportDescription: { type: String, required: true },
    reportFlags: { type: [String], required: true },
    reportEvidence: { type: [String], required: true },
    status: {
      type: String,
      enum: ['pending', 'resolved', 'dismissed'],
      default: 'pending',
      required: true
    },
  } ,
  { timestamps: true },
);

export const Report = mongoose.model('Report', reportSchema);

export const ListingReport = Report.discriminator(
  'ListingReport',
  new mongoose.Schema({
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  }),
);

export const UserReport = Report.discriminator(
  'UserReport',
  new mongoose.Schema({
    userReported: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }),
);
