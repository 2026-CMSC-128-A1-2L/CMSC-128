import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

    ratings: {
      quality: { type: Number, required: true, min: 1, max: 5 },
      comfort: { type: Number, required: true, min: 1, max: 5 },
      environment: { type: Number, required: true, min: 1, max: 5 },
    },

    description: { type: String },
  },

  { timestamps: true },
);

export const Review = mongoose.model('Review', reviewSchema);
