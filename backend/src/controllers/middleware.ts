import { RequestHandler } from 'express';
import { AppError } from './error';
import { isVerified } from '../models/user/User';

// Adds filters for private/public listings for unverified/verified users. Used for read actions on listings.
export const listingViewFilter: RequestHandler = (req, res, next) => {
  if (!req.user || !isVerified(req.user.userType)) {
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
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  res.locals.filters = combineFilters(res.locals.filters, {
    $or: [{ managerID: req.user._id }, { landlordID: req.user._id }],
  });

  next();
};

export const correctLandlordFilter: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  res.locals.filters = combineFilters(res.locals.filters, { landlordID: req.user._id });

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

export const isLandlord: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (!(req.user.userType == 'Landlord' || req.user.userType == 'Admin')) {
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

export const isDevelopment: RequestHandler = (req, res, next) => {
  if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    return next();
  }

  res.status(401).send();
};

export const isSelfOrSuperAdmin: RequestHandler = async (req, res, next) => {};
export const isVerifiedStudent: RequestHandler = async (req, res, next) => {};
export const isSelfManagerOrSuperAdmin: RequestHandler = async (req, res, next) => {};
export const isSelf: RequestHandler = async (req, res, next) => {};
export const isSelfOrManager: RequestHandler = async (req, res, next) => {};
export const isTenantManagerOrLandlord: RequestHandler = async (req, res, next) => {};
