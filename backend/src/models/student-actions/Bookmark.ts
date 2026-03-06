import mongoose from 'mongoose';

//Creates an object model for Sample
const bookmarkSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Interaction point: student saves listing
  listingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }, // Interaction point: listing being bookmarked
  bookmarkedAt: { type: Date, default: Date.now }, // sort field
  // reason for bookmarking, optional
  notes: { type: String },
});

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
