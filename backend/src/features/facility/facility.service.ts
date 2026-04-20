import type mongoose from 'mongoose';
import type { FacilityType, USER_TYPES } from 'shared';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { Listing } from '../listing/listing.model';
import { HousingFacility, type HousingFacilityType, type ManagerPermissionType } from './facility.model';
import { inviteManager } from '../invite/invite.service';

type FacilityFilters = {
  name?: string;
  landlordId?: mongoose.Types.ObjectId;
  location?: {
    coordinates?: {
      lat: {
        min: number;
        max: number;
      };
      long: {
        min: number;
        max: number;
      };
    };
    text?: string;
  };
  types?: FacilityType[];
  capacity?: {
    min?: number;
    max?: number;
  };
  isAcceptingApplications?: boolean;
  applicationOpenDate?: {
    min?: Date;
    max?: Date;
  };
  applicationCloseDate?: {
    min?: Date;
    max?: Date;
  };
};

function buildRangeQueryFilter(range: { min?: number; max?: number }): {
  $gte?: number;
  $lte?: number;
};
function buildRangeQueryFilter(range: { min?: Date; max?: Date }): { $gte?: Date; $lte?: Date };

function buildRangeQueryFilter(range: { min?: any; max?: any }) {
  const queryFilter: any = {};

  if (range.min != null) {
    queryFilter.$gte = range.min;
  }

  if (range.max != null) {
    queryFilter.$lte = range.max;
  }

  return queryFilter;
}

const buildFacilityFilterQuery = (
  filters: FacilityFilters,
): QueryFilter<typeof HousingFacility> => {
  const queryFilter: QueryFilter<typeof HousingFacility> = {};
  if (filters.name != null) {
    queryFilter.name = filters.name;
  }

  if (filters.landlordId != null) {
    queryFilter.landlord = filters.landlordId;
  }

  if (filters.location?.text) {
    queryFilter['location.text'] = { $regex: filters.location.text, $options: 'i' };
  }

  if (filters.location?.coordinates) {
    const { lat, long } = filters.location.coordinates;

    queryFilter['location.coordinates.lat'] = buildRangeQueryFilter(lat);
    queryFilter['location.coordinates.long'] = buildRangeQueryFilter(long);
  }

  if (filters.types && filters.types.length > 0) {
    queryFilter.type = { $in: filters.types };
  }

  if (filters.capacity !== null && filters.capacity !== undefined) {
    queryFilter.capacity = buildRangeQueryFilter(filters.capacity);
  }

  // Can't do falsy because false is an actual value.
  if (filters.isAcceptingApplications !== null && filters.isAcceptingApplications !== undefined) {
    const now = new Date();

    // TODO: implement slot limits autoclosing
    if (filters.isAcceptingApplications) {
      queryFilter.$or = [
        { isAcceptingApplications: true },
        {
          isAcceptingApplications: { $ne: false },
          applicationStartDate: { $lte: now },
          applicationEndDate: { $gte: now },
        },
      ];
    } else {
      queryFilter.$or = [
        { isAcceptingApplications: false },
        {
          isAcceptingApplications: { $ne: true },
          $or: [{ applicationStartDate: { $gt: now } }, { applicationEndDate: { $lt: now } }],
        },
      ];
    }
  }

  return queryFilter;
};

export const getFacilities = async (filters: FacilityFilters) => {
  const queryFilter = buildFacilityFilterQuery(filters);
  return await HousingFacility.find(queryFilter)
    .populate([
      {
        path: 'landlordId',
      },
      {
        path: 'managers.userId',
      },
    ])
    .lean();
};

export type CreateFacilityArguments = {
  managers?: {
    email: string;
    permissions: { manageBillings: boolean; manageApplications: boolean; manageListings: boolean };
  }[];

  name: string;
  type: string;
  location?: {
    coordinates?: {
      lat: number;
      long: number;
    } | null;
    text?: string | null;
  };
  applicationCloseDate?: Date | null;
  applicationOpenDate?: Date | null;
};

// NOTE: attributes to update are not yet finalized
export type UpdateFacilityArguments = {
  name?: string;
  type?: string;
  location?: {
    coordinates?: {
      lat: number;
      long: number;
    } | null;
    text?: string | null;
  };
  applicationCloseDate?: Date;
  applicationOpenDate?: Date;
};

export const createFacility = async (
  landlordId: mongoose.Types.ObjectId,
  data: CreateFacilityArguments,
) => {
  if (
    data.applicationCloseDate &&
    data.applicationOpenDate &&
    data.applicationCloseDate < data.applicationOpenDate
  ) {
    throw new AppError(422, 'Application close date should not be before application open date.');
  }

  const newFacility = new HousingFacility({
    landlordId,
    managers: [
      {
        userId: landlordId,
        permissions: {
          manageApplications: true,
          manageBillings: true,
          manageListings: true,
        },
      },
    ],

    name: data.name,
    type: data.type,
    location: data.location,

    applicationCloseDate: data.applicationCloseDate,
    applicationOpenDate: data.applicationOpenDate,

    capacity: 0,
  });

  const newFacilitySaved = await newFacility.save();

  const invitePromises = Promise.all(
    (data.managers ?? []).map((manager) =>
      inviteManager({
        facilityId: newFacilitySaved._id,
        landlordId,
        permissions: manager.permissions,
        email: manager.email,
      }),
    ),
  );

  await invitePromises;

  return newFacilitySaved;
};

type UserType = {
  _id: mongoose.Types.ObjectId;
  emails: string[];
  profilePicture?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  auth: {
    google: string;
    password: string;
  };
  userType: typeof USER_TYPES;
  createdAt: Date;
  updatedAt: Date;
};

type UserWithContactType = UserType & {
  contact: string;
};

type LandlordType = UserWithContactType;
type ManagerType = UserWithContactType;

type HousingFacilityWithManagersType = Omit<HousingFacilityType, 'landlord' | 'managers'> & {
  landlordId: LandlordType;
  managers: {
    _id: mongoose.Types.ObjectId;
    userId: Omit<ManagerType, '_id'>;
    permissions: ManagerPermissionType;
  }[];
};

export const getFacilityById = async (facilityId: mongoose.Types.ObjectId) => {
  const facility = (await HousingFacility.findById(facilityId)
    .populate('landlordId managers.userId')
    .lean()) as HousingFacilityWithManagersType | null;

  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  return facility;
};

export const updateFacility = async (
  facilityId: mongoose.Types.ObjectId,
  data: UpdateFacilityArguments,
  filters: QueryFilter<typeof HousingFacility>,
) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: facilityId }));
  if (!facility) {
    // Return 404 even if just forbidden
    throw new AppError(404, 'Facility not found.');
  }

  const applicationOpenDate = data.applicationOpenDate ?? facility.applicationOpenDate;
  const applicationCloseDate = data.applicationCloseDate ?? facility.applicationCloseDate;

  if (applicationOpenDate && applicationCloseDate && applicationCloseDate < applicationOpenDate) {
    throw new AppError(422, 'Application close date should not be before application open date.');
  }

  facility.set(data);

  return await facility.save();
};

export const deleteFacility = async (facilityId: mongoose.Types.ObjectId) => {
  const facility = await HousingFacility.findById(facilityId);

  // throw a 404 error
  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  // TODO: check listing count

  await HousingFacility.findByIdAndDelete(facilityId);
};

export const removeManagerFromFacility = async (
  facilityId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  const facility = await HousingFacility.findById(facilityId);
  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  facility.managers = facility.managers.filter((m) => m.userId.toString() !== userId.toString());
  await facility.save();

  // cascade removal to all listings under this facility
  await Listing.updateMany({ facilityId: facilityId }, { $pull: { managers: { userId } } });
};

export const updateManagerPermissions = async (
  facilityId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  newPermissions: ManagerPermissionType,
) => {
  const facility = await HousingFacility.findById(facilityId);
  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  facility.managers = facility.managers.map((m) => {
    if (m.userId.toString() !== userId.toString()) {
      return m;
    } else {
      return {
        userId: m.userId,
        permissions: newPermissions,
      };
    }
  });
  await facility.save();

  // cascade removal to all listings under this facility
  await Listing.updateMany({ facilityId: facilityId }, { $pull: { managers: { userId } } });
};

export const approveFacility = async (facilityId: mongoose.Types.ObjectId, filters: any) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: facilityId }));
  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  // TODO: use document status for approve

  facility.status = 'approved';
  return await facility.save();
};

export const rejectFacility = async (facilityId: mongoose.Types.ObjectId, filters: any) => {
  const facility = await HousingFacility.findOne(combineFilters(filters, { _id: facilityId }));
  if (!facility) {
    throw new AppError(404, 'Facility not found.');
  }

  // TODO: use document status for approve

  facility.status = 'rejected';
  return await facility.save();
};
