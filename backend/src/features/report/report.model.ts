import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    flags: { type: [String], required: true },
    evidence: { type: [String], required: true },
    status: {
      type: String,
      enum: ['pending', 'resolved', 'dismissed'],
      default: 'pending',
      required: true,
    },
  },
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
