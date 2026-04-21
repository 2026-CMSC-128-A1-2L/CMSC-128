import type { RequestHandler } from 'express';
import { ObjectIdSchema } from 'shared';
import { getBookmarksByUser, createBookmark, deleteBookmark } from './bookmark.service';

export const routeGetBookmarkedUnits: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const result = await getBookmarksByUser(userId);
  res.status(200).json(result);
};

export const routeAddBookmark: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const userId = req.user!._id;
  const result = await createBookmark(userId, listingId);
  res.status(201).json(result);
};

export const routeDeleteBookmark: RequestHandler = async (req, res, next) => {
  const bookmarkId = ObjectIdSchema.parse(req.params.bookmarkId);
  const userId = req.user!._id;
  const result = await deleteBookmark(userId, bookmarkId);
  res.status(200).json(result);
};
