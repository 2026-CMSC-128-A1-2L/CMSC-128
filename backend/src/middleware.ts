import type { RequestHandler } from 'express';
import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from './error';
import { ObjectIdSchema } from 'shared';
import { HousingFacility, type HousingFacilityType } from './features/facility/facility.model';
import { Listing } from './features/listing/listing.model';
import { Rental } from './features/rental/rental.model';
import { isVerified, UserType } from './features/user/user.model';
import type { UnitType } from './features/unit/unit.model';

export type ManagerPermission = 'manageBillings' | 'manageApplications' | 'manageListings';

// Adds filters for private/public listings for unverified/verified users. Used for read actions on listings.
export const listingViewFilter: RequestHandler = (req, res, next) => {
  if (!req.user || !isVerified(req.user.status)) {
    res.locals.filters = { isPrivate: false };
  } else {
    res.locals.filters = {};
  }

  next();
};

export function combineFilters<T>(
  oldFilter: QueryFilter<T> | undefined,
  newFilter: QueryFilter<T>,
) {
  const baseFilters = oldFilter?.$and ?? (oldFilter ? [oldFilter] : []);

  return {
    $and: [...baseFilters, newFilter],
  } as QueryFilter<T>;
}

type ManagerEntry = {
  userId: mongoose.Types.ObjectId;
  permissions: {
    manageBillings: boolean;
    manageApplications: boolean;
    manageListings: boolean;
  };
};

// Used for queries on documents which have the managers array, which are `HousingFacility` and `Listing`.
export const managerFilter = (
  filterType: 'direct' | 'facility' | 'listing' | 'facility-direct' | 'listing-direct',
  permission: ManagerPermission | null,
  includeSelf: boolean = false,
): RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown> & { filters?: QueryFilter<unknown> }
> => {
  return async (req, res, next) => {
    if (!req.user) {
      next(new AppError(401, 'Unauthenticated'));
      return;
    }

    const userId = req.user._id;

    if (req.user.userType === 'Student') {
      if (includeSelf) {
        // ignores filterType as it is for the manager
        res.locals.filters = combineFilters(res.locals.filters, { userId });
        next();
        return;
      } else {
        // not a manager, return a 403
        next(new AppError(403, 'Forbidden'));
        return;
      }
    }

    let newFilter: QueryFilter<{
      managers: ManagerEntry[];
    }>;
    if (permission) {
      const innerFilter: QueryFilter<ManagerEntry> = { userId };
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
    } else {
      res.locals.filters = combineFilters(res.locals.filters, {
        facilityId: { $in: await HousingFacility.find(newFilter).distinct('_id') },
      });
    }

    next();
  };
};

export const currentTenantManagerFilter: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown> & { filters: QueryFilter<UnitType> }
> = async (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  const userId = req.user._id;

  if (req.user.userType === 'Student') {
    const currentRental = await Rental.findOne({ userId: req.user._id, status: 'active' });
    if (!currentRental) {
      throw new AppError(422, 'Student is not currently renting.');
    }
    res.locals.filters = combineFilters(res.locals.filters, { unitId: currentRental.unitId });
    next();
    return;
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

export const correctLandlordFilter: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown> & { filters: QueryFilter<HousingFacilityType> }
> = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  res.locals.filters = combineFilters<HousingFacilityType>(res.locals.filters, {
    landlordId: req.user._id,
  });

  next();
};

export const selfFilter: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown> & QueryFilter<{ userId: mongoose.Types.ObjectId }>
> = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  res.locals.filters = combineFilters(res.locals.filters, { userId: req.user._id });

  next();
};

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  next();
};

export const isLandlord: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  if (!(req.user.userType === 'Landlord' || req.user.userType === 'Admin')) {
    next(new AppError(403, 'Forbidden'));
    return;
  }

  next();
};

export const isSuperAdmin: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  if (req.user.userType !== 'Admin') {
    next(new AppError(403, 'Forbidden'));
    return;
  }

  next();
};

export const isVerifiedStudent: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  if (req.user.userType !== 'Student' || req.user.status !== 'verified') {
    next(new AppError(403, 'Forbidden'));
    return;
  }

  next();
};

export const isSelfOrSuperAdmin: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  if (req.user.userType === 'Admin') {
    next();
    return;
  }

  res.locals.filters = combineFilters(res.locals.filters, { _id: req.user._id });
  next();
};

export const isDevelopment: RequestHandler = (req, res, next) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    next();
    return;
  }

  res.status(401).send();
};

export const getUserId: RequestHandler = (req, res, next) => {
  res.locals.id = ObjectIdSchema.parse(req.params.userId);
  next();
  return;
};

export const getBillingId: RequestHandler = (req, res, next) => {
  res.locals.id = ObjectIdSchema.parse(req.params.billingId);
  next();
  return;
};

export const isVerifiedCheck: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  if (req.user.status !== 'verified') {
    next(new AppError(403, 'Forbidden'));
    return;
  }

  next();
};

export const setUserId: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  assert.ok(req.user);
  req.params['userId'] = req.user._id.toString();
  next();
};
