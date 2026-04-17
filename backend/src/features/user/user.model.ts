import mongoose from 'mongoose';
import { documentSchema, DocumentType } from '../document/document.model';

type UserType = {
  _id: mongoose.Types.ObjectId,
  emails: string[],

  firstName: string,
  middleName?: string | null,
  lastName: string,

  profilePicture?: string | null,
  address?: string,
  contact?: string,

  auth: {
    google: string[]
  },
  status: 'unverified' | 'verified' | 'inactive' | 'disabled',
  userType: 'Admin' | 'Landlord' | 'Manager' | 'Student',

  documents: DocumentType[],
  verificationStatus: 'pending' | 'submitted' | 'rejected' | 'approved',
  verifiedAt?: Date | null,

  updatedAt: Date
  createdAt: Date
};

export type ManagerType = UserType & {
  userType: 'Landlord' | 'Manager',
};

const userSchema = new mongoose.Schema<UserType>(
  {
    // Obtained through Google automatically after login with a Google email address.
    emails: { type: [String], required: true, default: [] },
    profilePicture: String,

    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },

    address: { type: String, required: true },
    contact: { type: String, required: true },

    auth: {
      type: {
        // Google account Id
        //
        // An account's email can change over time while this does not.
        google: { type: [String], required: true, default: [] },
      },
      required: true,
    },

    // `unverified` - never verified. Can only see public listings.
    // `verified` - verified for the semester. Can see all listings and access
    //   own data.
    // `inactive` - did not verify for at least one semester. Can still access
    //    own data, but otherwise has the same permission as unverified
    //    accounts.
    // `disabled` - similar permissions as `inactive` accounts, but cannot
    //   verify again.
    status: {
      type: String,
      enum: ['unverified', 'verified', 'inactive', 'disabled'],
      default: 'unverified',
      required: true,
    },

    // Used to discriminate between different user types. This can be filled automatically by using
    // the discriminated models like:
    //
    // ```
    // new Admin({ ... }).save();
    // ```
    //
    // or manually created by setting it manually and using:
    //
    // ```
    // new User({ userType: 'Admin', ... }).save();
    // ```
    //
    // Make sure to fill up fields for the user type.
    userType: {
      type: String,
      enum: ['Admin', 'Landlord', 'Manager', 'Student'],
      required: true,
    },
    documents: { type: [documentSchema], required: true, default: [] },
    verificationStatus: {
      type: String,
      enum: ['pending', 'submitted', 'rejected', 'approved'],
      required: true,
      default: 'pending',
    },
    verifiedAt: Date,
  },
  { timestamps: true, discriminatorKey: 'userType' },
);

export const User = mongoose.model('User', userSchema);

export const Admin = User.discriminator('Admin', new mongoose.Schema());
export const Landlord = User.discriminator('Landlord', new mongoose.Schema());
export const Manager = User.discriminator('Manager', new mongoose.Schema());
export const Student = User.discriminator('Student',
  new mongoose.Schema({
    studentNumber: { type: String, required: true },
    degreeProgram: String,
  }),
);

export const isVerified = (status: string) => status == 'verified';
