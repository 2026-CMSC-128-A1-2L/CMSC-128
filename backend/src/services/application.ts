import mongoose, { QueryFilter } from 'mongoose';
import { ApplicationForm } from '../models/student-actions/ApplicationForm.js';
import { combineFilters } from '../controllers/middleware.js';
import { AppError } from '../controllers/error.js';

// Service functions for application forms, which are the main way students apply to listings
export const getApplicationById = async (applicationID: mongoose.Types.ObjectId) => {
  const application = await ApplicationForm.findById(applicationID);

  if (!application) {
    throw new AppError(404, 'Application not found.');
  }

  return application;
};

// no error because it can be empty, just return empty array
// A listing and student can just not have an application yet
export const getApplicationsByListing = async (listingID: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ listingID });
};

export const getApplicationsByStudent = async (studentID: mongoose.Types.ObjectId) => {
  return await ApplicationForm.find({ studentID });
};