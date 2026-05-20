import type { RequestHandler } from 'express';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { HousingFacility, type ManagerPermissionType } from '../facility/facility.model.js';
import { Listing } from '../listing/listing.model.js';
import { Rental, type RentalType } from '../rental/rental.model.js';
import type { UnitType } from './unit.model.js';

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
      $elemMatch: { userId, 'permissions.manageBuildings': true },
    },
  };
  const listingFilter = { listingId: { $in: await Listing.find(newFilter).distinct('_id') } };
  res.locals.filters = combineFilters(res.locals.filters, listingFilter);

  next();
};

export const currentTenantManagerRentalFilter: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown> & { filters: QueryFilter<RentalType> }
> = async (req, res, next) => {
  if (!req.user) {
    next(new AppError(401, 'Unauthenticated'));
    return;
  }

  if (req.user.userType === 'Student') {
    const currentRental = await Rental.findOne({ userId: req.user._id, status: 'active' });
    if (!currentRental) {
      throw new AppError(422, 'Student is not currently renting.');
    }

    res.locals.filters = combineFilters(res.locals.filters, { unitId: currentRental.unitId });
    next();
    return;
  }

  const managerCriteria: QueryFilter<{
    userId: typeof req.user._id;
    permissions: ManagerPermissionType;
  }> = { userId: req.user._id, 'permissions.manageBuildings': true };

  const facilityFilter =
    req.user.userType === 'Landlord'
      ? {
          $or: [{ landlordId: req.user._id }, { managers: { $elemMatch: managerCriteria } }],
        }
      : { managers: { $elemMatch: managerCriteria } };

  const facilityIds = await HousingFacility.find(facilityFilter).distinct('_id');
  res.locals.filters = combineFilters(res.locals.filters, { facilityId: { $in: facilityIds } });

  next();
};
