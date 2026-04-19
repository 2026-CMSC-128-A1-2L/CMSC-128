import type { RequestHandler } from 'express';
import {
  CreateApplicationBodySchema,
  GetApplicationsQuerySchema,
  ObjectIdSchema,
  UpdateApplicationBodySchema,
} from 'shared';
import { sendNotification } from '../notification/notification.service';
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
} from './application.service';

export const routeCreateApplication: RequestHandler = async (req, res, next) => {
  const params = CreateApplicationBodySchema.parse(req.body);
  const newApplication = await createApplication(params);

  res.status(201).json({ id: newApplication.id });
};

export const routeGetApplications: RequestHandler = async (req, res, next) => {
  const query = GetApplicationsQuerySchema.parse(req.query);
  const applications = await getApplications(query, res.locals.filters);

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
  const userId = ObjectIdSchema.parse(req.params.userId);

  const applications = await getApplicationsByStudent(userId);

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
    'manager-approved': {
      subject: 'Application Approved',
      content: 'Your application has been approved by the manager.',
    },
    'manager-rejected': {
      subject: 'Application Rejected',
      content: 'Your application has been rejected by the manager.',
    },
    'manager-waitlisted': {
      subject: 'Application Waitlisted',
      content: 'Your application has been waitlisted by the manager.',
    },
    'landlord-approved': {
      subject: 'Application Approved',
      content: 'Your application has been approved by the landlord.',
    },
    'landlord-rejected': {
      subject: 'Application Rejected',
      content: 'Your application has been rejected by the landlord.',
    },
    'landlord-waitlisted': {
      subject: 'Application Waitlisted',
      content: 'Your application has been waitlisted by the landlord.',
    },
  };

  if (params.status && statusMessages[params.status]) {
    await sendNotification(
      updatedApplication.userId,
      statusMessages[params.status].subject,
      statusMessages[params.status].content,
    );
  }

  res.status(200).json({ data: updatedApplication });
};

export const routeAssignApplicationUnit: RequestHandler = async (req, res, next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const params = UpdateApplicationBodySchema.parse(req.body);

  const updatedApplication = await assignApplicationUnit(applicationId, params, res.locals.filters);

  res.status(200).json({ data: updatedApplication });
};
