export const ROOM_TYPES = ['single', 'double', 'shared'] as const;
export const FACILITY_TYPES = ['on-campus', 'off-campus', 'partner housing'] as const;
export const USER_TYPES = [
  'Admin',
  'Landlord',
  'Manager',
  'Student',
  'UnverifiedLandlord',
  'UnverifiedManager',
  'UnverifiedStudent',
] as const;
export const DOCUMENT_STATUS = ['accepted', 'rejected', 'pending'] as const;

export type FacilityType = (typeof FACILITY_TYPES)[number];
export type DocumentStatusType = (typeof DOCUMENT_STATUS)[number];
