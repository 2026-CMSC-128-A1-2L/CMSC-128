import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

    // Reason for bookmarking, optional
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

bookmarkSchema.index({ userId: 1, listingId: 1 }, { unique: true });

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
