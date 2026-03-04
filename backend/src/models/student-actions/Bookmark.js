import mongoose from 'mongoose';

//Creates an object model for Sample
const bookmarkSchema = new mongoose.Schema({
  Id: { type: mongoose.Schema.Types.ObjectId, unique: true },
  StudentEmail: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  HousingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Housing' },
  BookmarkedAt: { type: Date, default: Date.now },
  // reason for bookmarking, optional
  Notes: { type: String }, 
});

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
