import mongoose from 'mongoose';

//Schema for user
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    birthDate: Date, //  Student, Manager, Land lord
    email: { type: String, required: true, unique: true },
    auth: { google: String, password: String },
    isActive: { type: Boolean, default: true }, // Spec: CRUD for student users — para ma allow yung soft-disable of accounts
    lastLogin: { type: Date }, // Spec: user activity logs (for login tracking ito)
    profilePicture: String,
  },
  { timestamps: true, discriminatorKey: 'userType' },
);

export const User = mongoose.model('User', userSchema); // match name with mongo name

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
    studentNumber: { type: String, required: true }, // Spec: identifies the student within the university system
    degreeProgram: String, // Degree program the student is enrolled in
  }),
);

const verificationSchema = new mongoose.Schema({
  verification: {
    documentUrls: new mongoose.Schema({
      metadata: {
        type: Map,
        of: [String],
      },
    }),
    status: {
      type: String,
      enum: ['pending', 'submitted', 'rejected', 'approved'],
      default: 'pending',
    },
  },
});

export const UnverifiedLandlord = User.discriminator('UnverifiedLandlord', verificationSchema);
export const UnverifiedManager = User.discriminator('UnverifiedManager', verificationSchema);
export const UnverifiedStudent = User.discriminator('UnverifiedStudent', verificationSchema);

export const isVerified = (userType: string) =>
  userType == 'Admin' || userType == 'Landlord' || userType == 'Manager' || userType == 'Student';
