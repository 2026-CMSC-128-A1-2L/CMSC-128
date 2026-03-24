import { RequestHandler } from 'express';

import z from 'zod';
import {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByListing,
  getApplicationsByStudent,
  updateApplication,
  deleteApplication,
  updateApplicationStatus,
  assignApplicationUnit,
} from '../services/application';
import { ObjectIdSchema } from './schema/common.js';
import {
  ApplicationFilterSchema,
  CreateApplicationBodySchema,
  GetApplicationsQuerySchema,
  UpdateApplicationBodySchema,
} from './schema/application.js';

export const routeCreateApplication: RequestHandler = async (req, res, next) => {
  const params = CreateApplicationBodySchema.parse(req.body);
  const newApplication = await createApplication(params);

  res.status(201).json({ id: newApplication.id });
};

export const routeGetApplications: RequestHandler = async (req, res, next) => {
  const params = GetApplicationsQuerySchema.parse(req.query);
  const q = ApplicationFilterSchema.parse(params.q);
  const applications = await getApplications(q, res.locals.filters);

  res.status(200).json({ data: applications });
};

export const routeGetApplicationByID: RequestHandler = async (req, res, next) => {
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

export const routeUpdateApplication: RequestHandler = async (req, res, next) => {
  const applicationID = ObjectIdSchema.parse(req.params.applicationId);
  const params = UpdateApplicationBodySchema.parse(req.body);

  const updatedApplication = await updateApplication(applicationID, params, res.locals.filters);

  res.status(200).json({ data: updatedApplication });
};

export const routeDeleteApplication: RequestHandler = async (req, res, next) => {
  const applicationID = ObjectIdSchema.parse(req.params.applicationId);

  await deleteApplication(applicationID, res.locals.filters);

  res.status(204).send();
};

export const routeUpdateApplicationStatus: RequestHandler = async (req, res, next) => {
  const applicationID = ObjectIdSchema.parse(req.params.applicationId);
  const params = UpdateApplicationBodySchema.parse(req.body);

  const updatedApplication = await updateApplicationStatus(applicationID, params, res.locals.filters);
  
  res.status(200).json({ data: updatedApplication });
};

export const routeAssignApplicationUnit: RequestHandler = async (req, res, next) => {
  const applicationID = ObjectIdSchema.parse(req.params.applicationId);
  const params = UpdateApplicationBodySchema.parse(req.body);
  
  const updatedApplication = await assignApplicationUnit(applicationID, params, res.locals.filters);

  res.status(200).json({ data: updatedApplication });
};
