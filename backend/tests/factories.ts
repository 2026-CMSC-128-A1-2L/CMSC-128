/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Factory } from 'fishery';
import {
  User,
  Admin,
  Landlord,
  Manager,
  Student,
  UnverifiedLandlord,
  UnverifiedManager,
  UnverifiedStudent,
} from '../src/models/user/User.js';
import { HousingFacility } from '../src/models/housing/HousingFacility.js';
import { Listing } from '../src/models/housing/Listing.js';
import { Unit } from '../src/models/housing/Unit.js';
import { Tag } from '../src/models/housing/Tag.js';

type UserParams = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  birthDate?: Date;
  email: string;
  auth: { google?: string | null; password?: string };
  isActive: boolean;
  userType: string;
  profilePicture?: string | null;
  activities: mongoose.Types.ObjectId[];
  contact?: string;
  studentNumber?: string;
  degreeProgram?: string;
  verification?: {
    documentUrls: string[];
    status: 'pending' | 'submitted' | 'rejected' | 'approved';
  };
};

export const buildUser = Factory.define<UserParams>(({ sequence }) => ({
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  birthDate: new Date('2000-01-01'),
  email: `user${sequence}@example.com`,
  auth: { google: null, password: 'hashedpassword' },
  isActive: true,
  userType: 'Student',
  profilePicture: null,
  activities: [],
})).onCreate((data) => {
  switch (data.userType) {
    case 'Admin':
      return new Admin(data).save() as any;
    case 'Landlord':
      return new Landlord({ ...data, contact: data.contact || '09991234567' }).save() as any;
    case 'Manager':
      return new Manager({ ...data, contact: data.contact || '09991234567' }).save() as any;
    case 'Student':
      return new Student({
        ...data,
        studentNumber: data.studentNumber || '2023-00001',
      }).save() as any;
    case 'UnverifiedLandlord':
      return new UnverifiedLandlord({
        ...data,
        contact: data.contact || '09991234567',
        verification: data.verification || { documentUrls: [], status: 'pending' },
      }).save() as any;
    case 'UnverifiedManager':
      return new UnverifiedManager(data).save() as any;
    case 'UnverifiedStudent':
      return new UnverifiedStudent({
        ...data,
        verification: data.verification || { documentUrls: [], status: 'pending' },
      }).save() as any;
    default:
      return new User(data).save() as any;
  }
});

export const buildAdmin = buildUser.params({
  userType: 'Admin',
});

export const buildLandlord = buildUser.params({
  userType: 'Landlord',
  contact: '09991234567',
});

export const buildManager = buildUser.params({
  userType: 'Manager',
  contact: '09991234567',
});

export const buildStudent = buildUser.params({
  userType: 'Student',
  studentNumber: '2023-00001',
  degreeProgram: 'BS Computer Science',
});

export const buildUnverifiedLandlord = buildUser.params({
  userType: 'UnverifiedLandlord',
  contact: '09991234567',
  verification: {
    documentUrls: [],
    status: 'pending',
  },
});

export const buildUnverifiedManager = buildUser.params({
  userType: 'UnverifiedManager',
});

export const buildUnverifiedStudent = buildUser.params({
  userType: 'UnverifiedStudent',
  verification: {
    documentUrls: [],
    status: 'pending',
  },
});

export type HousingFacilityParams = {
  name: string;
  landlordID: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId | null;
  location?: {
    coordinates?: number[];
    text?: string;
  };
  type: 'on-campus' | 'off-campus' | 'partner housing';
  capacity: number;
  documentUrls: string[];
  isAcceptingApplications: boolean;
  applicationOpenDate?: string | null;
  applicationCloseDate?: string | null;
  listings: mongoose.Types.ObjectId[];
};

export const buildHousingFacility = Factory.define<HousingFacilityParams>(({ sequence }) => ({
  name: `Test Facility ${sequence}`,
  landlordID: new mongoose.Types.ObjectId(),
  managerID: null,
  location: {
    coordinates: [14.0, 121.0],
    text: 'Test Location',
  },
  type: 'on-campus',
  capacity: 100,
  documentUrls: [],
  isAcceptingApplications: false,
  applicationOpenDate: null,
  applicationCloseDate: null,
  listings: [],
})).onCreate((data) => new HousingFacility(data).save() as any);

type ListingParams = {
  housingID: mongoose.Types.ObjectId;
  landlordID: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId | null;
  tags: Array<{ tagId: string; value?: unknown }>;
  roomType: string;
  capacity: number;
  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  description?: string | null;
  mediaUrls: string[];
  units: string[];
};

export const buildListing = Factory.define<ListingParams>(({ sequence }) => ({
  housingID: new mongoose.Types.ObjectId(),
  landlordID: new mongoose.Types.ObjectId(),
  managerID: null,
  tags: [],
  roomType: 'single',
  capacity: 1,
  isPrivate: false,
  allowVisit: false,
  allowTransfer: false,
  description: `Test listing ${sequence}`,
  mediaUrls: [],
  units: [],
})).onCreate((data) => new Listing(data).save() as any);

type TagParams = {
  dataType:
    | { name: 'enum'; values?: string[] }
    | { name: 'numeric'; min?: number; max?: number }
    | { name: 'boolean' };
  name: string;
  displayName: string;
  isRequired: boolean;
};

export const buildTag = Factory.define<TagParams>(({ sequence }) => ({
  dataType: { name: 'boolean' },
  name: `tag${sequence}`,
  displayName: `Tag ${sequence}`,
  isRequired: false,
})).onCreate((data) => new Tag(data).save() as any);

export const buildEnumTag = buildTag.params({
  dataType: { name: 'enum', values: ['No WiFi', 'Has WiFi', 'WiFi on Lobby'] },
  name: 'wifi-status',
  displayName: 'WiFi Status',
});

export const buildNumericTag = buildTag.params({
  dataType: { name: 'numeric', min: 0, max: 100 },
  name: 'distance',
  displayName: 'Distance from campus (km)',
});

export const buildBooleanTag = buildTag.params({
  dataType: { name: 'boolean' },
  name: 'pets_allowed',
  displayName: 'Pets Allowed',
});

type UnitParams = {
  roomNumber: number;
  capacity: number;
  currentOccupancy: number;
  price: number;
  floorNumber?: number | null;
  status: 'available' | 'unavailable';
  listingID: mongoose.Types.ObjectId;
  landlordID: mongoose.Types.ObjectId;
  managerID? : mongoose.Types.ObjectId | null;
};

export const buildUnit = Factory.define<UnitParams>(({ sequence }) => ({
  roomNumber: sequence,
  capacity: 1,
  currentOccupancy: 0,
  price: 3000,
  floorNumber: 1,
  status: 'available',
  listingID: new mongoose.Types.ObjectId(),
  landlordID: new mongoose.Types.ObjectId(),
  managerID: null
})).onCreate((data) => new Unit(data).save() as any);