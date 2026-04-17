import { RequestHandler } from 'express';
import mongoose, { QueryFilter } from 'mongoose';
import { AppError } from './error';
import { ObjectIdSchema } from 'shared';
import { HousingFacility } from './features/facility/facility.model';
import { Listing } from './features/listing/listing.model';
import { Rental } from './features/rental/rental.model';
import { isVerified } from './features/user/user.model';

export type ManagerPermission = 'manageBillings' | 'manageApplications' | 'manageListings';

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

// Used for queries on documents which have the managers array, which are `HousingFacility` and `Listing`.
export const managerFilter = (
  filterType: 'direct' | 'facility' | 'listing' | 'facility-direct' | 'listing-direct',
  permission: ManagerPermission | null,
  includeSelf: boolean = false,
): RequestHandler => {
  return async (req, res, next) => {
    if (!req.user) {
      return next(new AppError(401, 'Unauthenticated'));
    }

    const userId = req.user._id;

    if (includeSelf && req.user.userType === 'Student') {
      // ignores filterType as it is for the manager
      res.locals.filters = combineFilters(res.locals.filters, { userId });
      return next();
    }

    let newFilter: QueryFilter<{
      managers: {
        user: mongoose.Types.ObjectId;
        permissions: {
          manageBillings: boolean;
          manageApplications: boolean;
          manageListings: boolean;
        };
      }[];
    }>;
    if (permission) {
      const innerFilter: any = { userId };
      innerFilter[`permissions.${permission}`] = true;
      newFilter = {
        managers: {
          $elemMatch: innerFilter,
        },
      };
    } else {
      newFilter = {
        'managers.userId': userId,
      };
    }

    if (filterType === 'direct') {
      res.locals.filters = combineFilters(res.locals.filters, newFilter);
    } else if (filterType === 'listing-direct') {
      res.locals.filters = combineFilters(res.locals.filters, {
        _id: { $in: await Listing.find(newFilter).distinct('_id') },
      });
    } else if (filterType === 'listing') {
      res.locals.filters = combineFilters(res.locals.filters, {
        listingId: { $in: await Listing.find(newFilter).distinct('_id') },
      });
    } else if (filterType === 'facility-direct') {
      res.locals.filters = combineFilters(res.locals.filters, {
        _id: { $in: await HousingFacility.find(newFilter).distinct('_id') },
      });
    } else if (filterType === 'facility') {
      res.locals.filters = combineFilters(res.locals.filters, {
        facilityId: { $in: await HousingFacility.find(newFilter).distinct('_id') },
      });
    }

    next();
  };
};

export const currentTenantManagerFilter: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  const userId = req.user._id;

  if (req.user.userType === 'Student') {
    const currentRental = await Rental.findOne({ userId: req.user._id, status: 'active' });
    if (!currentRental) {
      throw new AppError(422, 'Student is not currently renting.');
    }
    res.locals.filters = combineFilters(res.locals.filters, { unitId: currentRental.unitId });
    return next();
  }

  const newFilter = {
    managers: {
      $elemMatch: { userId, 'permissions.manageListings': true },
    },
  };
  const listingFilter = { listingId: { $in: await Listing.find(newFilter).distinct('_id') } };
  res.locals.filters = combineFilters(res.locals.filters, listingFilter);

  next();
};

export const correctLandlordFilter: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  res.locals.filters = combineFilters(res.locals.filters, { landlordId: req.user._id });

  next();
};

export const selfFilter =
  (direct: boolean): RequestHandler =>
    async (req, res, next) => {
      if (!req.user) {
        return next(new AppError(401, 'Unauthenticated'));
      }

      if (direct) {
        res.locals.filters = combineFilters(res.locals.filters, { _id: req.user._id });
      } else {
        res.locals.filters = combineFilters(res.locals.filters, { userId: req.user._id });
      }

      next();
    };

export const hasAccount: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
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

  if (req.user.userType !== 'Admin') {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};

export const isVerifiedStudent: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (req.user.userType !== 'Student' || req.user.status !== 'verified') {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};

export const isSelfOrSuperAdmin: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (req.user.userType === 'Admin') {
    return next();
  }

  res.locals.filters = combineFilters(res.locals.filters, { _id: req.user._id });
  next();
};

export const isDevelopment: RequestHandler = (req, res, next) => {
  if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    return next();
  }

  res.status(401).send();
};

export const getUserId: RequestHandler = (req, res, next) => {
  res.locals.id = ObjectIdSchema.parse(req.params.userId);
  return next();
};

export const isVerifiedCheck: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (req.user.status !== 'verified') {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};
