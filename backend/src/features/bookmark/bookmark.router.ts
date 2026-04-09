import { Router } from 'express';
import {
  routeGetBookmarkedUnits,
  routeAddBookmark,
  routeDeleteBookmark,
} from './bookmark.controller';
import { isVerifiedStudent } from '../../middleware';

const router = Router();

// Bookmarks
// GET /api/bookmarks
router.get('/bookmarks', isVerifiedStudent, routeGetBookmarkedUnits);
// POST /api/bookmarks/:listingId
router.post('/bookmarks/:listingId', isVerifiedStudent, routeAddBookmark);
// DELETE /api/bookmarks/:listingId
router.delete('/bookmarks/:listingId', isVerifiedStudent, routeDeleteBookmark);

export default router;
