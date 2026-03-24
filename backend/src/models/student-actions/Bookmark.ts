import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },

  // Sort field
  bookmarkedAt: { type: Date, default: Date.now },

  // Reason for bookmarking, optional
  notes: { type: String },
});

bookmarkSchema.index({ studentID: 1, listingID: 1 }, { unique: true });

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
