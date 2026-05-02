import type { RequestHandler } from 'express';
import { ObjectIdSchema, GetBookmarksQuerySchema } from 'shared';
import { getBookmarksByUser, createBookmark, deleteBookmark } from './bookmark.service.js';

export const routeGetBookmarkedUnits: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const { sortBy, order } = GetBookmarksQuerySchema.parse(req.query);
  const result = await getBookmarksByUser(userId, sortBy, order);
  res.status(200).json(result);
};

export const routeAddBookmark: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const userId = req.user!._id;
  const result = await createBookmark(userId, listingId);
  res.status(201).json(result);
};

export const routeDeleteBookmark: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const userId = req.user!._id;
  const result = await deleteBookmark(userId, listingId);
  res.status(200).json(result);
};
