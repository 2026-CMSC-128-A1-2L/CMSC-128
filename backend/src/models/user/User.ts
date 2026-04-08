import mongoose from 'mongoose';
import { documentSchema } from '../Document';

const userSchema = new mongoose.Schema(
  {
    // Obtained through Google automatically after login with a Google email address.
    // TODO: change email check flow
    emails: [String],
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
        google: String,

        // Currently unused
        //
        // TODO: remove if not needed
        password: String,
      },
      required: true,
    },

    // Allow soft deletion of accounts.
    //
    // A disabled account has the same access level as an unverified account, but cannot verify
    // again as they are technically verified already.
    isActive: { type: Boolean, default: true, required: true },

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
      enum: [
        'Admin',
        'Landlord',
        'Manager',
        'Student',
        'UnverifiedLandlord',
        'UnverifiedManager',
        'UnverifiedStudent',
      ],
      required: true,
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

    // TODO: verify if this should really be optional
    degreeProgram: String,
  }),
);

const verificationSchema = new mongoose.Schema({
  verification: {
    documents: [documentSchema],
    status: {
      type: String,
      enum: ['pending', 'submitted', 'rejected', 'approved'],
      default: 'pending',
    },
  },
});

export const UnverifiedLandlord = User.discriminator('UnverifiedLandlord', verificationSchema);

// No verification is needed by managers. Being invited by a landlord as a manager and accepting it
// will turn them the account verified.
export const UnverifiedManager = User.discriminator('UnverifiedManager', new mongoose.Schema({}));
export const UnverifiedStudent = User.discriminator('UnverifiedStudent', verificationSchema);

export const isVerified = (userType: string) =>
  userType == 'Admin' || userType == 'Landlord' || userType == 'Manager' || userType == 'Student';
