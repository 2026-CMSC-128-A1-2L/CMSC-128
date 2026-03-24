import mongoose from 'mongoose';
import { Bookmark } from '../models/student-actions/Bookmark';

export const createBookmark = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
) => {
  const newBookmark = new Bookmark({ studentId: userId, listingId: listingId });
  return await newBookmark.save();
};

export const deleteBookmark = async (
  userId: mongoose.Types.ObjectId,
  bookmarkId: mongoose.Types.ObjectId,
) => {
  return await Bookmark.deleteOne({ _id: bookmarkId, studentId: userId });
};

export const getBookmarksByUser = async (userId: mongoose.Types.ObjectId) => {
  return await Bookmark.find({ studentId: userId }).populate('listingId');
};
