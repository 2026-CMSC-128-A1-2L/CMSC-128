import { RequestHandler } from 'express';
import { createBookmark, deleteBookmark, getBookmarksByUser } from '../services/bookmarks';
import { CreateBookmarkBodySchema } from './schema/bookmark';
import { ObjectIdSchema } from './schema/common';

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
