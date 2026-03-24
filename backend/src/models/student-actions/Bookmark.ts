import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },

  // Sort field
  bookmarkedAt: { type: Date, default: Date.now },

  // Reason for bookmarking, optional
  notes: { type: String },
});

bookmarkSchema.index({ studentId: 1, listingId: 1 }, { unique: true });

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
