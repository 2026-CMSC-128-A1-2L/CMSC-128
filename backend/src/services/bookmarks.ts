import mongoose from 'mongoose';
import { Bookmark } from '../models/student-actions/Bookmark';

export const createBookmark = async (
  userID: mongoose.Types.ObjectId,
  listingID: mongoose.Types.ObjectId,
) => {
  const newBookmark = new Bookmark({ studentID: userID, listingID: listingID });
  return await newBookmark.save();
};

export const deleteBookmark = async (
  userID: mongoose.Types.ObjectId,
  bookmarkId: mongoose.Types.ObjectId,
) => {
  return await Bookmark.deleteOne({ _id: bookmarkId, studentID: userID });
};

export const getBookmarksByUser = async (userID: mongoose.Types.ObjectId) => {
  return await Bookmark.find({ studentID: userID }).populate('listingID');
};
