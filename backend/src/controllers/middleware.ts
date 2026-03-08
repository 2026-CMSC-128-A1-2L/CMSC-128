import { RequestHandler } from 'express';
import { AppError } from './error';
import { getFacilityById } from '../services/facility';
import { objectIdSchema } from '../controllers/facility';

// Adds filters for private/public listings for unverified/verified users. Used for read actions on listings.
export const listingViewFilter: RequestHandler = async (req, res, next) => {
  if (!req.user || !req.user.isVerified) {
    res.locals.filters = { isPrivate: false };
  } else {
    res.locals.filters = {};
  }

  next();
};

export const combineFilters = (oldFilter: any, newFilter: any) => ({
  $and: [...(oldFilter?.$and ?? (oldFilter ? [oldFilter] : [])), newFilter],
});

export const correctManagerOrLandlordFilter: RequestHandler = async (req, res, next) => {
  res.locals.filters = combineFilters(res.locals.filters, {
    $or: [{ manager: req.user!._id }, { landlord: req.user!._id }],
  });

  next();
};

export const correctLandlordFilter: RequestHandler = async (req, res, next) => {
  res.locals.filters = combineFilters(res.locals.filters, { landlord: req.user!._id });

  next();
};

export const isManager: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (
    !(
      req.user.userType == 'Manager' ||
      req.user.userType == 'Landlord' ||
      req.user.userType == 'Admin'
    )
  ) {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};

export const isSuperAdmin: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (req.user.userType != 'Admin') {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};
