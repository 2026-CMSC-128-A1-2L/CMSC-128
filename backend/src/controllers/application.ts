import { RequestHandler } from 'express';

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
import { sendNotification } from '../services/notifications.js';
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

export const routeGetApplication: RequestHandler = async (req, res, next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);

  const application = await getApplicationById(applicationId);

  res.status(200).json({
    data: application,
  });
};

export const routeGetApplicationsByListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);

  const applications = await getApplicationsByListing(listingId);

  res.status(200).json({
    data: applications,
  });
};

export const routeGetApplicationsByStudent: RequestHandler = async (req, res, next) => {
  const studentId = ObjectIdSchema.parse(req.params.studentId);

  const applications = await getApplicationsByStudent(studentId);

  res.status(200).json({
    data: applications,
  });
};

export const routeUpdateApplication: RequestHandler = async (req, res, next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const params = UpdateApplicationBodySchema.parse(req.body);

  const updatedApplication = await updateApplication(applicationId, params, res.locals.filters);

  res.status(200).json({ data: updatedApplication });
};

export const routeDeleteApplication: RequestHandler = async (req, res, next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);

  await deleteApplication(applicationId, res.locals.filters);

  res.status(204).send();
};

export const routeUpdateApplicationStatus: RequestHandler = async (req, res, next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const params = UpdateApplicationBodySchema.parse(req.body);

  const updatedApplication = await updateApplicationStatus(
    applicationId,
    params,
    res.locals.filters,
  );

  const statusMessages: Record<string, { subject: string; content: string }> = {
    'manager-approved': { subject: 'Application Approved', content: 'Your application has been approved by the manager.' },
    'manager-rejected': { subject: 'Application Rejected', content: 'Your application has been rejected by the manager.' },
    'manager-waitlisted': { subject: 'Application Waitlisted', content: 'Your application has been waitlisted by the manager.' },
    'landlord-approved': { subject: 'Application Approved', content: 'Your application has been approved by the landlord.' },
    'landlord-rejected': { subject: 'Application Rejected', content: 'Your application has been rejected by the landlord.' },
    'landlord-waitlisted': { subject: 'Application Waitlisted', content: 'Your application has been waitlisted by the landlord.' },
  };

  if (params.status && statusMessages[params.status]) {
    await sendNotification(updatedApplication.studentId, statusMessages[params.status].subject, statusMessages[params.status].content);
  }

  res.status(200).json({ data: updatedApplication });
};

export const routeAssignApplicationUnit: RequestHandler = async (req, res, next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const params = UpdateApplicationBodySchema.parse(req.body);

  const updatedApplication = await assignApplicationUnit(applicationId, params, res.locals.filters);

  res.status(200).json({ data: updatedApplication });
};
