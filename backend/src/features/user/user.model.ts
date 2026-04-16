import mongoose from 'mongoose';
import { documentSchema } from '../document/document.model';

const userSchema = new mongoose.Schema(
  {
    // Obtained through Google automatically after login with a Google email address.
    emails: { type: [String], required: true, default: [] },
    profilePicture: String,
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },

    // Manually filled up
    birthDate: Date,

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

    // Currently, there are two sources of truth in verification,
    // status being 'approved', and the userType being ones that are verified
    // based on the isVerified function.
    //
    // TODO: use one source for verification status
    verificationStatus: {
      type: String,
      enum: ['pending', 'submitted', 'rejected', 'approved'],
      required: 'true',
      default: 'pending',
    },
  },
  { timestamps: true, discriminatorKey: 'userType' },
);

export const User = mongoose.model('User', userSchema);
export const Admin = User.discriminator('Admin', new mongoose.Schema());
export const Landlord = User.discriminator(
  'Landlord',
  new mongoose.Schema({ contact: { type: String, required: true } }),
);
export const Manager = User.discriminator(
  'Manager',
  new mongoose.Schema({ contact: { type: String, required: true } }),
);
export const Student = User.discriminator(
  'Student',
  new mongoose.Schema({
    studentNumber: { type: String, required: true },
    degreeProgram: String,
  }),
);

export const isVerified = (status: string) => status == 'verified';
