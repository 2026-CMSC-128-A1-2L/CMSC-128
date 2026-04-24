import type { RequestHandler } from 'express';
import type { ManagerPermission } from '../../middleware';
import { HousingFacility, type ManagerPermissionType } from '../facility/facility.model';
import { AppError } from '../../error';
import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';

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
export const managerFilter = facilityManagerFilter(null);
