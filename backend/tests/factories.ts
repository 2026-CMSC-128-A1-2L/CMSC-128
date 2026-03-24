/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { ApplicationForm } from '../src/models/student-actions/ApplicationForm.js';
import { Rental } from '../src/models/student-actions/Rents.js';
import { Billing } from '../src/models/student-actions/Billing.js';
import { Bookmark } from '../src/models/student-actions/Bookmark.js';
import { Review } from '../src/models/reviews/Review.js';
import { VisitBooking } from '../src/models/student-actions/VisitBooking.js';
import { TransferRequest } from '../src/models/student-actions/TransferRequest.js';

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
  landlordId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId | null;
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
  landlordId: new mongoose.Types.ObjectId(),
  managerId: null,
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
  housingId: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  managerId?: mongoose.Types.ObjectId | null;
  tags: { name: string; value?: unknown }[];
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
  housingId: new mongoose.Types.ObjectId(),
  landlordId: new mongoose.Types.ObjectId(),
  managerId: null,
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
  roomNumber: string;
  capacity: number;
  currentOccupancy: number;
  price: number;
  location?: string;
  isAvailable: boolean;
  listingID: mongoose.Types.ObjectId;
  landlordID: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId | null;
};

export const buildUnit = Factory.define<UnitParams>(({ sequence }) => ({
  roomNumber: `${sequence}`,
  capacity: 1,
  currentOccupancy: 0,
  price: 3000,
  location: 'Floor 1',
  isAvailable: true,
  listingID: new mongoose.Types.ObjectId(),
  landlordID: new mongoose.Types.ObjectId(),
  managerID: null,
})).onCreate((data) => new Unit(data).save() as any);

type ApplicationParams = {
  studentID: mongoose.Types.ObjectId;
  listingID: mongoose.Types.ObjectId;
  preferredRoomType?: 'single' | 'double' | 'shared';
  status:
  | 'pending'
  | 'manager-approved'
  | 'manager-rejected'
  | 'manager-waitlisted'
  | 'landlord-rejected'
  | 'landlord-approved'
  | 'landlord-waitlisted'
  | 'contract-signed';
  documentUrls: string[];
  unitID?: mongoose.Types.ObjectId;
};

export const buildApplication = Factory.define<ApplicationParams>(({ sequence }) => ({
  studentID: new mongoose.Types.ObjectId(),
  listingID: new mongoose.Types.ObjectId(),
  preferredRoomType: 'single',
  status: 'pending',
  documentUrls: [],
})).onCreate((data) => new ApplicationForm(data).save() as any);

type RentalParams = {
  studentID: mongoose.Types.ObjectId;
  unitID: mongoose.Types.ObjectId;
  applicationID?: mongoose.Types.ObjectId;
  status: 'active' | 'ended' | 'on_waitlist' | 'inactive';
  expectedMoveInDate?: Date;
  expectedMoveOutDate?: Date;
  actualMoveInDate?: Date;
  actualMoveOutDate?: Date;
};

export const buildRental = Factory.define<RentalParams>(({ sequence }) => ({
  studentID: new mongoose.Types.ObjectId(),
  unitID: new mongoose.Types.ObjectId(),
  status: 'inactive',
})).onCreate((data) => new Rental(data).save() as any);

type BillingParams = {
  studentID: mongoose.Types.ObjectId;
  unitID: mongoose.Types.ObjectId;
  managerID?: mongoose.Types.ObjectId;
  billingPeriodStart?: Date;
  billingPeriodEnd?: Date;
  dueDate?: Date;
  paymentDate?: Date;
  paidAmount?: number;
  amount?: number;
  paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  proofOfPayment?: string;
  paymentType?: string;
};

export const buildBilling = Factory.define<BillingParams>(({ sequence }) => ({
  studentID: new mongoose.Types.ObjectId(),
  unitID: new mongoose.Types.ObjectId(),
  paymentStatus: 'unpaid',
  amount: 5000,
})).onCreate((data) => new Billing(data).save() as any);

type BookmarkParams = {
  studentID: mongoose.Types.ObjectId;
  listingID: mongoose.Types.ObjectId;
  bookmarkedAt: Date;
  notes?: string;
};

export const buildBookmark = Factory.define<BookmarkParams>(({ sequence }) => ({
  studentID: new mongoose.Types.ObjectId(),
  listingID: new mongoose.Types.ObjectId(),
  bookmarkedAt: new Date(),
})).onCreate((data) => new Bookmark(data).save() as any);

type ReviewParams = {
  studentID: mongoose.Types.ObjectId;
  listingID: mongoose.Types.ObjectId;
  rating: number;
  description?: string;
};

export const buildReview = Factory.define<ReviewParams>(({ sequence }) => ({
  studentID: new mongoose.Types.ObjectId(),
  listingID: new mongoose.Types.ObjectId(),
  rating: 4,
  description: `Test review ${sequence}`,
})).onCreate((data) => new Review(data).save() as any);

type VisitBookingParams = {
  studentID: mongoose.Types.ObjectId;
  housingID: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  startDate: Date;
  endDate: Date;
  message?: string;
};

export const buildVisitBooking = Factory.define<VisitBookingParams>(({ sequence }) => ({
  studentID: new mongoose.Types.ObjectId(),
  housingID: new mongoose.Types.ObjectId(),
  status: 'pending',
  startDate: new Date('2026-04-01'),
  endDate: new Date('2026-04-01'),
})).onCreate((data) => new VisitBooking(data).save() as any);

type TransferRequestParams = {
  studentID: mongoose.Types.ObjectId;
  unitID: mongoose.Types.ObjectId;
  description?: string;
};

export const buildTransferRequest = Factory.define<TransferRequestParams>(({ sequence }) => ({
  studentID: new mongoose.Types.ObjectId(),
  unitID: new mongoose.Types.ObjectId(),
  description: `Transfer request ${sequence}`,
})).onCreate((data) => new TransferRequest(data).save() as any);
