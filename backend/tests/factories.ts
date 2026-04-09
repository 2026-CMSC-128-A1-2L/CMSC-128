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
import { HousingFacility, HousingFacilityType } from '../src/models/housing/HousingFacility.js';

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

export type HousingFacilityParams = Omit<HousingFacilityType, '_id' | 'createdAt' | 'updatedAt'>;

export const buildHousingFacility = Factory.define<HousingFacilityParams>(({ sequence }) => ({
  name: `Test Facility ${sequence}`,
  landlord: new mongoose.Types.ObjectId(),
  managers: [],
  location: {
    coordinates: { lat: 14.0, long: 121.0 },
    text: 'Test Location',
  },
  type: 'on-campus',
  capacity: 100,
  documents: [],
  isAcceptingApplications: false,
})).onCreate(async (data) => {
  return await new HousingFacility(data).save() as HousingFacilityType
});
