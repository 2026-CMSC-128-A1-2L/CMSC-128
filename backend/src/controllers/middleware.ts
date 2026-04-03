import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { AppError } from './error';
import { isVerified } from '../models/user/User';
import { HousingFacility } from '../models/housing/HousingFacility';
import { Listing } from '../models/housing/Listing';
import { Unit } from '../models/housing/Unit';
import { ApplicationForm } from '../models/student-actions/ApplicationForm';
import { Billing } from '../models/student-actions/Billing';
import { Rental } from '../models/student-actions/Rents';
import { VisitBooking } from '../models/student-actions/VisitBooking';
import { TransferRequest } from '../models/student-actions/TransferRequest';

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

const toId = (val: string | string[]): mongoose.Types.ObjectId =>
  new mongoose.Types.ObjectId(Array.isArray(val) ? val[0] : val);

// Helper: check if user is landlord of the facility
const isLandlordOf = (facility: any, userId: mongoose.Types.ObjectId): boolean =>
  facility.landlordId.toString() === userId.toString();

// Helper: check if user is a manager of the facility with the given permission
const isManagerOfWithPermission = (
  facility: any,
  userId: mongoose.Types.ObjectId,
  permission: ManagerPermission,
): boolean => {
  return (facility.managers ?? []).some(
    (m: any) =>
      m.managerId.toString() === userId.toString() && m.permissions?.[permission] === true,
  );
};

// Helper: check if user is landlord or manager with permission on a facility
const checkFacilityPermission = async (
  userId: mongoose.Types.ObjectId,
  facilityId: mongoose.Types.ObjectId,
  permission: ManagerPermission,
): Promise<boolean> => {
  const facility = await HousingFacility.findById(facilityId);
  if (!facility) return false;
  return isLandlordOf(facility, userId) || isManagerOfWithPermission(facility, userId, permission);
};

// Helper: get listing and check permission via its managers array
const checkListingPermission = async (
  userId: mongoose.Types.ObjectId,
  listingId: mongoose.Types.ObjectId,
  permission: ManagerPermission,
): Promise<boolean> => {
  const listing = await Listing.findById(listingId);
  if (!listing) return false;
  if (listing.landlordId.toString() === userId.toString()) return true;
  return (listing.managers ?? []).some(
    (m: any) =>
      m.managerId.toString() === userId.toString() && m.permissions?.[permission] === true,
  );
};

// Parameterized middleware: checks if user is landlord or manager with the given permission
export const correctManagerOrLandlordFilter = (permission: ManagerPermission): RequestHandler => {
  return async (req, res, next) => {
    if (!req.user) {
      return next(new AppError(401, 'Unauthenticated'));
    }

    const userId = req.user._id as mongoose.Types.ObjectId;

    // Determine the resource and its parent facility/listing to check permissions
    let hasPermission = false;

    // Facility routes
    if (req.params.facilityId) {
      hasPermission = await checkFacilityPermission(userId, toId(req.params.facilityId), permission);
    }
    // Listing routes
    else if (req.params.listingId) {
      hasPermission = await checkListingPermission(userId, toId(req.params.listingId), permission);
    }
    // Unit routes — traverse unit → listing
    else if (req.params.unitId) {
      const unit = await Unit.findById(req.params.unitId).select('listingId landlordId');
      if (!unit) return next(new AppError(404, 'Unit not found.'));
      if (unit.landlordId.toString() === userId.toString()) {
        hasPermission = true;
      } else {
        hasPermission = await checkListingPermission(userId, unit.listingId, permission);
      }
    }
    // Application routes — traverse application → listing
    else if (req.params.applicationId) {
      const app = await ApplicationForm.findById(req.params.applicationId).select('listingId');
      if (!app) return next(new AppError(404, 'Application not found.'));
      hasPermission = await checkListingPermission(userId, app.listingId, permission);
    }
    // Billing routes — check via facilityId on the billing
    else if (req.params.billingId) {
      const billing = await Billing.findById(req.params.billingId).select('facilityId');
      if (!billing) return next(new AppError(404, 'Billing not found.'));
      hasPermission = await checkFacilityPermission(userId, billing.facilityId, permission);
    }
    // Rental routes — traverse rental → unit → listing
    else if (req.params.rentalId) {
      const rental = await Rental.findById(req.params.rentalId).select('unitId');
      if (!rental) return next(new AppError(404, 'Rental not found.'));
      const unit = await Unit.findById(rental.unitId).select('listingId landlordId');
      if (!unit) return next(new AppError(404, 'Unit not found.'));
      if (unit.landlordId.toString() === userId.toString()) {
        hasPermission = true;
      } else {
        hasPermission = await checkListingPermission(userId, unit.listingId, permission);
      }
    }
    // Transfer routes — traverse transfer → unit → listing
    else if (req.params.transferId) {
      const transfer = await TransferRequest.findById(req.params.transferId).select('unitId');
      if (!transfer) return next(new AppError(404, 'Transfer not found.'));
      const unit = await Unit.findById(transfer.unitId).select('listingId landlordId');
      if (!unit) return next(new AppError(404, 'Unit not found.'));
      if (unit.landlordId.toString() === userId.toString()) {
        hasPermission = true;
      } else {
        hasPermission = await checkListingPermission(userId, unit.listingId, permission);
      }
    }
    // Booking routes (by listing) — traverse booking → facility
    else if (req.params.bookingId && req.route?.path?.includes('bookings')) {
      const booking = await VisitBooking.findById(req.params.bookingId).select('housingId');
      if (!booking) return next(new AppError(404, 'Booking not found.'));
      hasPermission = await checkFacilityPermission(userId, booking.housingId, permission);
    }

    if (!hasPermission) {
      return next(new AppError(403, 'Forbidden'));
    }

    // For list endpoints, inject a filter so queries are scoped
    if (req.params.facilityId) {
      res.locals.filters = combineFilters(res.locals.filters, {
        $or: [
          { 'managers.managerId': userId },
          { landlordId: userId },
        ],
      });
    } else if (req.params.listingId) {
      res.locals.filters = combineFilters(res.locals.filters, {
        $or: [
          { 'managers.managerId': userId },
          { landlordId: userId },
        ],
      });
    }

    next();
  };
};

export const correctLandlordFilter: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  res.locals.filters = combineFilters(res.locals.filters, { landlordId: req.user._id });

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

export const isSelfOrSuperAdmin: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (req.user.userType === 'Admin') {
    return next();
  }

  if (req.user._id.toString() !== req.params.userId) {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};

export const isVerifiedStudent: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (req.user.userType !== 'Student') {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};

// Parameterized: checks self OR admin OR manager of the resource's facility with the given permission
export const isSelfManagerOrSuperAdmin = (permission: ManagerPermission): RequestHandler => {
  return async (req, res, next) => {
    if (!req.user) {
      return next(new AppError(401, 'Unauthenticated'));
    }

    const userId = req.user._id as mongoose.Types.ObjectId;

    if (req.user.userType === 'Admin') {
      return next();
    }

    if (req.user._id.toString() === req.params.userId) {
      return next();
    }

    if (req.user.userType === 'Landlord') {
      return next();
    }

    // Check if user is a manager of the resource's facility with the given permission
    let hasPermission = false;

    if (req.params.applicationId) {
      const app = await ApplicationForm.findById(req.params.applicationId).select('listingId');
      if (app) {
        const listing = await Listing.findById(app.listingId).select('housingId');
        if (listing) {
          hasPermission = await checkFacilityPermission(userId, listing.housingId, permission);
        }
      }
    } else if (req.params.listingId) {
      hasPermission = await checkListingPermission(userId, toId(req.params.listingId), permission);
    } else if (req.params.facilityId) {
      hasPermission = await checkFacilityPermission(userId, toId(req.params.facilityId), permission);
    }

    if (!hasPermission) {
      return next(new AppError(403, 'Forbidden'));
    }

    next();
  };
};

export const isSelf: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (req.user._id.toString() !== req.params.userId) {
    return next(new AppError(403, 'Forbidden'));
  }

  next();
};

// Parameterized: checks self OR manager/landlord/admin with the given permission on the resource
export const isSelfOrManager = (permission: ManagerPermission): RequestHandler => {
  return async (req, res, next) => {
    if (!req.user) {
      return next(new AppError(401, 'Unauthenticated'));
    }

    const userId = req.user._id as mongoose.Types.ObjectId;

    if (req.user._id.toString() === req.params.userId) {
      return next();
    }

    if (req.user.userType === 'Admin' || req.user.userType === 'Landlord') {
      return next();
    }

    // Check if user is a manager of the resource with the given permission
    let hasPermission = false;

    if (req.params.bookingId) {
      const booking = await VisitBooking.findById(req.params.bookingId).select('housingId');
      if (booking) {
        hasPermission = await checkFacilityPermission(userId, booking.housingId, permission);
      }
    } else if (req.params.listingId) {
      hasPermission = await checkListingPermission(userId, toId(req.params.listingId), permission);
    } else if (req.params.facilityId) {
      hasPermission = await checkFacilityPermission(userId, toId(req.params.facilityId), permission);
    }

    if (!hasPermission) {
      return next(new AppError(403, 'Forbidden'));
    }

    next();
  };
};

// TODO: implement proper unit-level tenancy check
export const isTenantManagerOrLandlord: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(401, 'Unauthenticated'));
  }

  if (
    req.user.userType === 'Manager' ||
    req.user.userType === 'Landlord' ||
    req.user.userType === 'Admin'
  ) {
    return next();
  }

  next();
};
