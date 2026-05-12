export const ROOM_TYPES = ['single', 'double', 'shared'] as const;
export const FACILITY_TYPES = ['on-campus', 'off-campus', 'partner housing'] as const;
export const USER_TYPES = ['Admin', 'Landlord', 'Manager', 'Student'] as const;
export const DOCUMENT_STATUS = ['accepted', 'rejected', 'pending'] as const;
export const BOOKING_STATUS = ['finished', 'pending', 'cancelled'] as const;
export const APPLICATION_STATUS = [
  'pending',
  'rejected',
  'waitlisted',
  'approved',
  'finalized',
] as const;
export const MANAGER_PERMISSIONS = [
  'deleteListings',
  'manageListings',
  'manageBillings',
  'manageBookings',
  'manageApplications',
  'reportUsers',
] as const;
export const USER_STATUS = [
  'setup',
  'unverified',
  'verified',
  'inactive',
  'disabled',
  'legacy',
] as const;
export const VERIFICATION_STATUS = ['pending', 'submitted', 'rejected', 'approved'] as const;
export const USER_TYPE = ['Admin', 'Manager', 'Landlord', 'Student'] as const;

export type FacilityType = (typeof FACILITY_TYPES)[number];
export type DocumentStatusType = (typeof DOCUMENT_STATUS)[number];
export type BookingStatusType = (typeof BOOKING_STATUS)[number];
export type ManagerPermission = (typeof MANAGER_PERMISSIONS)[number];
export type UserStatus = (typeof USER_STATUS)[number];
export type UserTypeType = (typeof USER_TYPE)[number];

export const UTILITY_PREFERENCES = [
  'electricity_included',
  'free_wifi',
  'water_included',
  'shower',
  'home_cleaning',
  'backup_generator',
  'service',
] as const;

export const AMENITY_PREFERENCES = [
  'bed_mattress',
  'security_guard',
  'essential_appliances',
  'with_ac',
  'study_lounge',
  'shared_kitchen',
] as const;

export const NEIGHBORHOOD_FEATURES = [
  'food_establishments',
  'study_cafes',
  'laundry_services',
  'main_road',
  'stores',
] as const;

export const GENDER_POLICIES = ['female_only', 'male_only'] as const;

export type UtilityPreference = (typeof UTILITY_PREFERENCES)[number];
export type AmenityPreference = (typeof AMENITY_PREFERENCES)[number];
export type NeighborhoodFeature = (typeof NEIGHBORHOOD_FEATURES)[number];
export type GenderPolicy = (typeof GENDER_POLICIES)[number];
