import { RequestHandler } from 'express';
import { createBookmark, deleteBookmark, getBookmarksByUser } from '../services/bookmarks';
import { CreateBookmarkBodySchema, DeleteBookmarkBodySchema } from './schema/bookmark';

export const routeGetBookmarkedUnits: RequestHandler = async (req, res, next) => {
  const userID = req.user!._id;
  const result = await getBookmarksByUser(userID);
  res.status(200).json(result);
};

export const routeAddBookmark: RequestHandler = async (req, res, next) => {
  const params = CreateBookmarkBodySchema.parse(req.params);
  const userID = req.user!._id;
  const result = await createBookmark(userID, params.listingID);
  res.status(201).json(result);
};

export const routeDeleteBookmark: RequestHandler = async (req, res, next) => {
  const params = DeleteBookmarkBodySchema.parse(req.params);
  const userID = req.user!._id;
  const result = await deleteBookmark(userID, params.listingID);
  res.status(200).json(result);
};
