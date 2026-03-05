import { RequestHandler } from 'express';

/*
 * `listingViewFilter` and `listingUpdateFilter` adds filters to be passed to mongoose.
 */

// Adds filters for private/public listings for unverified/verified users. Used for read actions on listings.
export const listingViewFilter: RequestHandler = async (req, res, next) => {
  next();
};

// Adds filters for correct manager/landlord. Used for write actions on listings.
//
// ```
// mongoose.
// ```
export const listingUpdateFilter: RequestHandler = async (req, res, next) => {
  next();
};
