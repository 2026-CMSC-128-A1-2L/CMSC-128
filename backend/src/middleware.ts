import type { RequestHandler } from 'express';
import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from './error';
import { ObjectIdSchema } from 'shared';
import {
  HousingFacility,
  ManagerPermissionType,
  type HousingFacilityType,
} from './features/facility/facility.model';
import { Listing } from './features/listing/listing.model';
import { Rental } from './features/rental/rental.model';
import { isVerified } from './features/user/user.model';
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

export const includeSelf: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  // if there is no filter, doing an OR with it results still in no filter.
  if (!res.locals.filters) {
    next();
    return;
  }

  res.locals.filters = {
    $or: [res.locals.filters, { userId: req.user._id }],
  };
};

type ManagerEntry = {
  userId: mongoose.Types.ObjectId;
  permissions: ManagerPermissionType;
};

export const directManagerFilter =
  (permission: ManagerPermission | null): RequestHandler =>
  async (req, res, _next) => {
    if (!req.user) throw new AppError(401, 'Unauthenticated');

    const userId = req.user._id;

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

    res.locals.filters = combineFilters(res.locals.filters, newFilter);
  };

// Used when the object has a `facilityId`.
//
// Adding this filter ensures that the query will only return
// listings such that the manager has the correct permission.
// Passing null means that any manager of that listing should
// be able to pass.
const facilityManagerFilter =
  (permission: ManagerPermission | null): RequestHandler =>
  async (req, res, _next) => {
    assert.ok(req.user);
    if (req.user.userType !== 'Manager' && req.user.userType !== 'Landlord')
      throw new AppError(403, 'Forbidden.');

    const managerCriteria: QueryFilter<{
      userId: mongoose.Types.ObjectId;
      permissions: ManagerPermissionType;
    }> = { userId: req.user._id };
    if (permission) {
      managerCriteria[`permissions.${permission}`] = true;
    }
    const facilityIds = await HousingFacility.find({
      managers: { $elemMatch: managerCriteria },
    }).distinct('_id');

    res.locals.filters = {
      facilityId: { $in: facilityIds },
    };
  };

export const manageListingsFilter = facilityManagerFilter('manageListings');
export const manageApplicationsFilter = facilityManagerFilter('manageApplications');
export const manageBillingsFilter = facilityManagerFilter('manageBillings');
export const managerFilter = facilityManagerFilter(null);

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
