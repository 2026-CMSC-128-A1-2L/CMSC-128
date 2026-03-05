import mongoose from 'mongoose';

//Schema for user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ['student', 'manager', 'admin', 'landlord'],
    required: true,
  },

  birthDate: Date, //  Student, Manager, Land lord

  email: {
    type: String,
    required: true,
    unique: true,
  },

  auth: {
    google: String,
    password: String,
  },

  isActive: {
    type: Boolean,
    default: true,
    // Spec: CRUD for student users — para ma allow yung soft-disable of accounts
  },

  lastLogin: {
    type: Date,
    // Spec: user activity logs (for login tracking ito)
  },

  profilePicture: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.model('User', userSchema); // match name with mongo name
