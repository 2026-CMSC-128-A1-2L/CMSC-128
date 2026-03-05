import mongoose from 'mongoose';

//Creates an object model for Sample
const bookmarkSchema = new mongoose.Schema({
  bookmarkID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Interaction point: student saves listing
    required: true,
  },

  listingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing', // Interaction point: listing being bookmarked
    required: true,
  },

  BookmarkedAt: { type: Date, default: Date.now },
  // reason for bookmarking, optional
  Notes: { type: String },
});

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
