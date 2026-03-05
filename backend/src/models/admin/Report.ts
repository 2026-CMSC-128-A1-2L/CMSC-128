import mongoose from 'mongoose';

// Base Report Schema
const reportSchema = new mongoose.Schema({
  reporterID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportDescription: { type: String, required: true },
  reportEvidence: { type: [String], required: true },
  dateCreated: { type: Date, required: true },
  dateResolved: { type: Date, required: true },
});

const Report = mongoose.model('Report', reportSchema);

export const ListingReport = mongoose.model(
  'ListingReport',
  new mongoose.Schema({
    facilityID: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: false }, // Spec: many reports are scoped to a specific dormitory/facility
    listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  }),
);
export const UserReport = Report.discriminator(
  'UserReport',
  new mongoose.Schema({
    // user to be reported
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }),
);
