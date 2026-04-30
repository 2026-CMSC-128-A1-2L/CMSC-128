import { RequestHandler } from 'express';
import { QueryFilter } from 'mongoose';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { Listing } from '../listing/listing.model.js';
import { Rental } from '../rental/rental.model.js';
import { UnitType } from './unit.model.js';

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
