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
router.get('/', isVerifiedStudent, routeGetBookmarkedUnits);
// POST /api/bookmarks/:listingId
router.post('/:listingId', isVerifiedStudent, routeAddBookmark);
// DELETE /api/bookmarks/:listingId
router.delete('/:listingId', isVerifiedStudent, routeDeleteBookmark);

export default router;
