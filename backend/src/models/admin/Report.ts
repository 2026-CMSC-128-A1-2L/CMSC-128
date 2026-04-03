import mongoose from 'mongoose';

// Base Report Schema
const reportSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportDescription: { type: String, required: true },
  reportEvidence: { type: [String], required: true },
  dateCreated: { type: Date, required: true },
  dateResolved: { type: Date, required: true },
});

const Report = mongoose.model('Report', reportSchema);

export const ListingReport = mongoose.model(
  'ListingReport',
  new mongoose.Schema({
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  }),
);

export const UserReport = Report.discriminator(
  'UserReport',
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }),
);
