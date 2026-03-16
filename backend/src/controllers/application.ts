import { RequestHandler } from 'express';
import z from 'zod';
import { getApplicationById, getApplicationsByListing, getApplicationsByStudent } from '../services/application';
import { ObjectIdSchema } from './schema/common.js';

export const routeGetApplicationById: RequestHandler = async (req, res, next) => {
  const applicationID = ObjectIdSchema.parse(req.params.applicationId);

  const application = await getApplicationById(applicationID);

  res.status(200).json({
    data: application,
  });
};

export const routeGetApplicationsByListing: RequestHandler = async (req, res, next) => {
  const listingID = ObjectIdSchema.parse(req.params.listingId);

  const applications = await getApplicationsByListing(listingID);

  res.status(200).json({
    data: applications,
  });
};

export const routeGetApplicationsByStudent: RequestHandler = async (req, res, next) => {
  const studentID = ObjectIdSchema.parse(req.params.studentId);

  const applications = await getApplicationsByStudent(studentID);

  res.status(200).json({
    data: applications,
  });
};