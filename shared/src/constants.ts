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
export const USER_STATUS = ['setup', 'unverified', 'verified', 'disabled'] as const;
export const USER_TYPE = ['Admin', 'Manager', 'Landlord', 'Student'] as const;

export type FacilityType = (typeof FACILITY_TYPES)[number];
export type DocumentStatusType = (typeof DOCUMENT_STATUS)[number];
export type BookingStatusType = (typeof BOOKING_STATUS)[number];
export type ManagerPermission = (typeof MANAGER_PERMISSIONS)[number];
export type UserStatus = (typeof USER_STATUS)[number];
export type UserTypeType = (typeof USER_TYPE)[number];
