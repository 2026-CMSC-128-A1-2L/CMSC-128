import { RequestHandler } from 'express';
import { createBookmark, deleteBookmark, getBookmarksByUser } from '../services/bookmarks';
import { CreateBookmarkBodySchema } from './schema/bookmark';
import { ObjectIdSchema } from './schema/common';

export const routeGetBookmarkedUnits: RequestHandler = async (req, res, next) => {
  const userID = req.user!._id;
  const result = await getBookmarksByUser(userID);
  res.status(200).json(result);
};

export const routeAddBookmark: RequestHandler = async (req, res, next) => {
  const params = CreateBookmarkBodySchema.parse(req.body);
  const userID = req.user!._id;
  const result = await createBookmark(userID, params.listingID);
  res.status(201).json(result);
};

export const routeDeleteBookmark: RequestHandler = async (req, res, next) => {
  const bookmarkId = ObjectIdSchema.parse(req.params.bookmarkId);
  const userID = req.user!._id;
  const result = await deleteBookmark(userID, bookmarkId);
  res.status(200).json(result);
};
