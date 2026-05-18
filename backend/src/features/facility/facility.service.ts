import type { FacilityType, USER_TYPES } from 'shared';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { Listing } from '../listing/listing.model.js';
import {
  HousingFacility,
  type HousingFacilityType,
  type ManagerPermissionType,
} from './facility.model.js';
import { inviteManager } from '../invite/invite.service.js';
import type mongoose from 'mongoose';
import { getAllRentals } from '../rental/rental.service.js';
import { getUnits } from '../unit/unit.service.js';
import { getBillings } from '../billing/billing.service.js';
import { User } from '../user/user.model.js';

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

function buildRangeQueryFilter(range: { min?: unknown; max?: unknown }) {
  const queryFilter: QueryFilter<unknown> = {};

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
    queryFilter.landlordId = filters.landlordId;
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

export const getFacilities = async () => {
  return await HousingFacility.find()
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

export const searchFacilities = async (filters: FacilityFilters) => {
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
    permissions: ManagerPermissionType;
  }[];

  name: string;
  description: string;
  type: string;
  location?: {
    coordinates?: {
      lat: number;
      long: number;
    } | null;
    text?: string | null;
  };
  isPrivate?: boolean;
  allowVisit?: boolean;
  allowTransfer?: boolean;
  documents?: {
    docId: string;
    name: string;
    status?: string;
    message?: string;
    files: string[];
  }[];
  mediaUrls?: string[];
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
    description: data.description,
    type: data.type,
    status: 'submitted',
    location: data.location,
    isPrivate: data.isPrivate,
    allowVisit: data.allowVisit,
    allowTransfer: data.allowTransfer,
    documents: data.documents,
    media: data.mediaUrls?.map((value) => ({
      sourceType: 'local',
      value,
    })),

    applicationCloseDate: data.applicationCloseDate,
    applicationOpenDate: data.applicationOpenDate,

    capacity: 0,
  });

  const newFacilitySaved = await newFacility.save();

  const invitePromises = Promise.all(
    (data.managers ?? []).map((manager) =>
      inviteManager(landlordId, newFacilitySaved._id, manager.email, manager.permissions),
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
  filters: QueryFilter<HousingFacilityType>,
) => {
  const facility = await HousingFacility.findOne(
    combineFilters<HousingFacilityType>(filters, { _id: facilityId }),
  );
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
  await Listing.updateMany({ facilityId: facilityId }, { $set: { managers: { userId } } });
};

export const approveFacility = async (
  facilityId: mongoose.Types.ObjectId,
  filters: QueryFilter<HousingFacilityType> | undefined,
) => {
  const facility = await HousingFacility.findOne(
    combineFilters<HousingFacilityType>(filters, { _id: facilityId }),
  );
  if (!facility) throw new AppError(404, 'Facility not found.');

  // TODO: check document status first

  facility.status = 'approved';
  return await facility.save();
};

export const rejectFacility = async (
  facilityId: mongoose.Types.ObjectId,
  filters: QueryFilter<HousingFacilityType> | undefined,
) => {
  const facility = await HousingFacility.findOne(
    combineFilters<HousingFacilityType>(filters, { _id: facilityId }),
  );
  if (!facility) throw new AppError(404, 'Facility not found.');

  // TODO: check document status first

  facility.status = 'rejected';
  return await facility.save();
};

export const getManagedFacilities = async (
  userId: mongoose.Types.ObjectId,
): Promise<mongoose.Types.ObjectId[]> => {
  return await HousingFacility.find({ 'managers.userId': userId }).distinct('_id');
};

// Returns all facilities owned by a landlord (full documents, not just IDs).
export const getFacilitiesByLandlord = async (landlordId: mongoose.Types.ObjectId) => {
  return await HousingFacility.find({ landlordId }).lean();
};

// Returns the expected monthly income for a landlord.
//
// Chain: Landlord → Facilities → active Rentals → Units (price)
//
// For each active rental under the landlord's facilities, we look up the
// unit's price. Summing those prices gives the expected monthly income —
// i.e. what the landlord should collect if every active tenant pays in full.
//
// Returns:
//   total          – grand total across all facilities
//   totalTenants   – total number of active tenants
//   byFacility     – per-facility breakdown ({ facilityId, facilityName, expectedMonthlyIncome, tenantCount })
export const getMonthlyIncomeByLandlord = async (landlordId: mongoose.Types.ObjectId) => {
  const facilities = await getFacilitiesByLandlord(landlordId);
  const facilityIds = facilities.map((f) => f._id);

  // getAllRentals accepts a plain Mongoose filter object.
  const activeRentals = await getAllRentals({ facilityId: { $in: facilityIds }, status: 'active' });

  // Collect unique unitIds from the rentals, then fetch those units via getUnits.
  const uniqueUnitIds = [
    ...new Map(activeRentals.map((r) => [r.unitId.toString(), r.unitId])).values(),
  ];
  const units = await getUnits({}, { _id: { $in: uniqueUnitIds } });

  const unitPriceMap = new Map(units.map((u) => [u._id.toString(), u.price]));

  // Aggregate per facility.
  const byFacility = facilities.map((facility) => {
    const facilityRentals = activeRentals.filter(
      (r) => r.facilityId.toString() === facility._id.toString(),
    );

    const expectedMonthlyIncome = facilityRentals.reduce((sum, rental) => {
      const price = unitPriceMap.get(rental.unitId.toString()) ?? 0;
      return sum + price;
    }, 0);

    return {
      facilityId: facility._id,
      facilityName: facility.name,
      expectedMonthlyIncome,
      tenantCount: facilityRentals.length,
    };
  });

  const total = byFacility.reduce((sum, f) => sum + f.expectedMonthlyIncome, 0);
  const totalTenants = byFacility.reduce((sum, f) => sum + f.tenantCount, 0);

  return { total, totalTenants, byFacility };
};

// Returns tenants (rentals) that have an overdue billing as their latest billing status.
//
// Chain: Landlord → Facilities → active Rentals → latest Billing per rental
//
// For each active rental, we find its most recently due billing. If that
// billing's paymentStatus is 'overdue', the tenant is considered overdue.
//
// Returns:
//   overdueTenants  – list of { rentalId, userId, facilityId, unitId, billing: { id, dueDate, totalAmount } }
//   overdueCount    – total number of overdue tenants
//   byFacility      – per-facility breakdown ({ facilityId, facilityName, overdueCount })
export const getOverdueTenantsByLandlord = async (landlordId: mongoose.Types.ObjectId) => {
  const facilities = await getFacilitiesByLandlord(landlordId);
  const facilityIds = facilities.map((f) => f._id);

  const activeRentals = await getAllRentals({ facilityId: { $in: facilityIds }, status: 'active' });

  if (activeRentals.length === 0) {
    return { overdueTenants: [], overdueCount: 0, byFacility: [] };
  }

  const rentalIds = activeRentals.map((r) => r._id);

  // getBillings accepts a query filter — fetch all billings for these rentals.
  // We then group by rentalId in JS to find the latest billing per rental.
  const allBillings = await getBillings({}, { rentalId: { $in: rentalIds } });

  // Group billings by rentalId and pick the one with the latest dueDate.
  const latestBillingByRentalId = new Map<string, (typeof allBillings)[number]>();
  for (const billing of allBillings) {
    const key = billing.rentalId.toString();
    const existing = latestBillingByRentalId.get(key);
    if (
      !existing ||
      (billing.dueDate && (!existing.dueDate || billing.dueDate > existing.dueDate))
    ) {
      latestBillingByRentalId.set(key, billing);
    }
  }

  const overdueTenants = activeRentals
    .filter((r) => latestBillingByRentalId.get(r._id.toString())?.paymentStatus === 'overdue')
    .map((r) => {
      const billing = latestBillingByRentalId.get(r._id.toString())!;
      return {
        rentalId: r._id,
        userId: r.userId,
        facilityId: r.facilityId,
        unitId: r.unitId,
        billing: {
          id: billing._id,
          dueDate: billing.dueDate,
          totalAmount: billing.totalAmount,
        },
      };
    });

  const byFacility = facilities.map((facility) => {
    const overdueCount = overdueTenants.filter(
      (t) => t.facilityId.toString() === facility._id.toString(),
    ).length;
    return {
      facilityId: facility._id,
      facilityName: facility.name,
      overdueCount,
    };
  });

  return {
    overdueTenants,
    overdueCount: overdueTenants.length,
    byFacility,
  };
};

// Returns all tenants (rentals) across all facilities owned by the landlord.
export const getTenantsByLandlord = async (landlordId: mongoose.Types.ObjectId) => {
  const facilities = await getFacilitiesByLandlord(landlordId);
  const facilityIds = facilities.map((f) => f._id);
  const facilityMap = new Map(facilities.map((f) => [f._id.toString(), f.name]));

  const activeRentals = await getAllRentals({ facilityId: { $in: facilityIds }, status: 'active' });

  if (activeRentals.length === 0) {
    return [];
  }

  const rentalIds = activeRentals.map((r) => r._id);
  const userIds = activeRentals.map((r) => r.userId);
  const unitIds = activeRentals.map((r) => r.unitId);

  const users = await User.find({ _id: { $in: userIds } }).lean();
  const userMap = new Map(users.map((u) => [u._id.toString(), u]));

  const units = await getUnits({}, { _id: { $in: unitIds } });
  const unitMap = new Map(units.map((u) => [u._id.toString(), u]));

  const allBillings = await getBillings({}, { rentalId: { $in: rentalIds } });
  const latestBillingByRentalId = new Map<string, (typeof allBillings)[number]>();
  for (const billing of allBillings) {
    const key = billing.rentalId.toString();
    const existing = latestBillingByRentalId.get(key);
    if (
      !existing ||
      (billing.dueDate && (!existing.dueDate || billing.dueDate > existing.dueDate))
    ) {
      latestBillingByRentalId.set(key, billing);
    }
  }

  const tenants = activeRentals.map((rental) => {
    const user = userMap.get(rental.userId.toString()) as any;
    const unit = unitMap.get(rental.unitId.toString());
    const facilityName = facilityMap.get(rental.facilityId.toString()) ?? 'Unknown Facility';
    const latestBilling = latestBillingByRentalId.get(rental._id.toString());

    return {
      id: rental._id,
      userId: user?._id,
      facilityId: rental.facilityId,
      fullName: user ? `${user.lastName}, ${user.firstName}`.toUpperCase() : 'UNKNOWN',
      displayName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
      email: user?.emails?.[0] ?? '',
      contactNumber: user?.contact ?? 'N/A',
      homeAddress: user?.address ?? 'N/A',
      photoUrl: user?.profilePicture,
      unit: unit?.roomNumber ?? 'Unknown Unit',
      dormName: facilityName,
      baseRentFee: unit?.price?.toString() ?? '0',
      contractDuration:
        rental.expectedMoveInDate && rental.expectedMoveOutDate
          ? `${rental.expectedMoveInDate.toLocaleDateString()} - ${rental.expectedMoveOutDate.toLocaleDateString()}`
          : 'N/A',
      monthlyDueDate: '5th of the Month', // placeholder since its not in db
      modeOfPayment: 'Cash', // placeholder
      billingStatus: latestBilling?.paymentStatus ?? 'pending',
      latestBillingItem: latestBilling
        ? `Billing for ${latestBilling.dueDate?.toLocaleDateString()}`
        : 'No billing',
      studentCategory: user?.userType ?? 'Student',
      documents: [], // Not populated for now
      rentalStatus: rental.status,
    };
  });

  return tenants;
};
