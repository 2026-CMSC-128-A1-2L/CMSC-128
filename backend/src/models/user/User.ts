import mongoose from 'mongoose';

//Schema for user
const userSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, unique: true },
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
    enum: ['student', 'manager', 'admin', 'guest'],
    required: true,
  },

  birthDate: {
    type: Date,
    required: true,
  }, //  Student, Manager, Land lord

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  dateCreated: { type: Date, required: true },
  dateUpdated: { type: Date, required: true },

  isActive: {
    type: Boolean,
    default: true,
    // Spec: CRUD for student users — para ma allow yung soft-disable of accounts
  },

  lastLogin: {
    type: Date,
    // Spec: user activity logs (for login tracking ito)
  },

  profilePicture: { type: String, required: true }, // Should be a url
});

export const User = mongoose.model('User', userSchema); // match name with mongo name
