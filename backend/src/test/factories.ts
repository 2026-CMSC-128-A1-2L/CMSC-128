/* eslint-disable @typescript-eslint/no-unsafe-return */
import mongoose from 'mongoose';
import { Factory } from 'fishery';
import { HousingFacilityType, HousingFacility } from '../features/facility/facility.model';
import { Landlord, Manager, Student, Admin, UserType } from '../features/user/user.model';
import { DocumentType } from '../features/document/document.model';

type UserParams = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  emails: string[];
  status: 'unverified' | 'verified' | 'inactive' | 'disabled';
  userType: 'Admin' | 'Manager' | 'Landlord' | 'Student';
  profilePicture?: string | null;
  contact?: string;
  address?: string,
  studentNumber?: string;
  degreeProgram?: string;
  documents: DocumentType[];
  verificationStatus: 'pending' | 'submitted' | 'rejected' | 'approved';
  verifiedAt?: Date | null,
};

export const buildUser = Factory.define<UserParams, any, UserType>(({ sequence }) => ({
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  emails: [`user${sequence}@example.com`],
  auth: { google: [] },
  status: 'verified',
  verificationStatus: 'approved',
  userType: 'Student',
  profilePicture: null,
  documents: [],
})).onCreate(async (data) => {
  switch (data.userType) {
    case 'Admin':
      return (await new Admin(data).save()).toObject();
    case 'Landlord':
      return (await new Landlord({ ...data, contact: data.contact || '09991234567' }).save()).toObject();
    case 'Manager':
      return (await new Manager({ ...data, contact: data.contact || '09991234567' }).save()).toObject();
    case 'Student':
      return (await new Student({ ...data, studentNumber: data.studentNumber || '202300001', }).save()).toObject();
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
  userType: 'Landlord',
  contact: '09991234567',
  verificationStatus: 'pending',
  status: 'unverified',
});

export const buildUnverifiedManager = buildUser.params({
  userType: 'Manager',
  contact: '09991234567',
  verificationStatus: 'pending',
  status: 'unverified',
});

export const buildUnverifiedStudent = buildUser.params({
  userType: 'Student',
  verificationStatus: 'pending',
  status: 'unverified',
});

export type HousingFacilityParams = Omit<HousingFacilityType, '_id' | 'createdAt' | 'updatedAt'>;

export const buildHousingFacility = Factory.define<HousingFacilityParams>(({ sequence }) => ({
  name: `Test Facility ${sequence}`,
  landlordId: new mongoose.Types.ObjectId(),
  managers: [],
  location: {
    coordinates: { lat: 14.0, long: 121.0 },
    text: 'Test Location',
  },
  status: 'approved',
  type: 'on-campus',
  capacity: 100,
  documents: [],
  isAcceptingApplications: false,
})).onCreate(async (data) => {
  return (await new HousingFacility(data).save()) as HousingFacilityType;
});
