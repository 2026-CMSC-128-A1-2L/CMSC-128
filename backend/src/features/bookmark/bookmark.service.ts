import type mongoose from 'mongoose';
import { Bookmark } from './bookmark.model';

export const createBookmark = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
) => {
  const newBookmark = new Bookmark({ userId: userId, listingId: listingId });
  return await newBookmark.save();
};

export const deleteBookmark = async (
  userId: mongoose.Types.ObjectId,
  bookmarkId: mongoose.Types.ObjectId,
) => {
  return await Bookmark.deleteOne({ _id: bookmarkId, userId: userId });
};

export const getBookmarksByUser = async (userId: mongoose.Types.ObjectId) => {
  return await Bookmark.find({ userId: userId }).populate('listingId');
};
