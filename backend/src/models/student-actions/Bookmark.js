import mongoose from 'mongoose';

//Creates an object model for Sample
const bookmarkSchema = new mongoose.Schema({
  Id: { type: mongoose.Schema.Types.ObjectId, unique: true },
  StudentEmail: { type: String, ref: 'Student' },
  HousingID: { type: String, ref: 'Housing' },
  BookmarkedAt: { type: Date, default: Date.now },
  Notes: { type: String }, 
});

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
