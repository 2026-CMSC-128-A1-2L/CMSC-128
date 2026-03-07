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


export const isFacilityLandlord: RequestHandler = async (req, res, next) => {
  if(!req.user){
    return next(new AppError(401, 'Unauthenticated'));
  }

  const facilityID = objectIdSchema.parse(req.params._id); // route must have id param
  const facility = await getFacilityById(facilityID);

  if(facility.landlordID.toString() !== req.user._id.toString()){
    return next(new AppError(403, 'Forbidden: You are not the landlord of this facility'));
  }

  res.locals.facility = facility;
  next();
};
