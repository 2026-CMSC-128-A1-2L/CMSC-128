import type { RequestHandler } from 'express';
import {
  ApplicationFilterSchema,
  CreateApplicationBodySchema,
  GetApplicationsQuerySchema,
  ObjectIdSchema,
  QuerySchema,
  UpdateApplicationBodySchema as AssignApplicationRequestBodySchema,
} from 'shared';
import {
  createApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
  assignApplicationUnit,
  approveApplication,
  rejectApplication,
} from './application.service';
import type { QueryFilter } from 'mongoose';
import type { ApplicationType } from './application.model';
import { AppError } from '../../error';

export const routeCreateApplication: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const params = CreateApplicationBodySchema.parse(req.body);
  const newApplication = await createApplication(req.user._id, params.listingId);

  res.status(201).json({ id: newApplication.id });
};

type LocalHandler<T> = RequestHandler<
  Record<string, unknown>,
  unknown,
  unknown,
  unknown,
  Record<string, unknown> & T
>;

type ApplicationHandler = LocalHandler<{ filters: QueryFilter<ApplicationType> }>;

export const routeGetApplications: ApplicationHandler = async (req, res, _next) => {
  const query = GetApplicationsQuerySchema.parse(req.query);
  const applications = await getApplications(query, res.locals.filters);
  res.status(200).json({ data: applications });
};

export const routeGetApplication: ApplicationHandler = async (req, res, _next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const application = await getApplicationById(applicationId, res.locals.filters);
  if (!application) throw new AppError(404, 'Application not found.');
  res.status(200).json({ data: application });
};

export const routeGetApplicationsByListing: ApplicationHandler = async (req, res, _next) => {
  const query = QuerySchema(ApplicationFilterSchema.omit({ listingId: true })).parse(req.query);
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const applications = await getApplications({ ...query, listingId }, res.locals.filters);
  res.status(200).json({ data: applications });
};

export const routeGetApplicationsByStudent: ApplicationHandler = async (req, res, _next) => {
  const query = QuerySchema(ApplicationFilterSchema.omit({ userId: true })).parse(req.query);
  const userId = ObjectIdSchema.parse(req.params.userId);
  const applications = await getApplications({ ...query, userId }, res.locals.filters);
  res.status(200).json({ data: applications });
};

// export const routeUpdateApplication: RequestHandler = async (req, res, next) => {
//   const applicationId = ObjectIdSchema.parse(req.params.applicationId);
//   const params = UpdateApplicationBodySchema.parse(req.body);
//   const updatedApplication = await updateApplication(applicationId, params, res.locals.filters);
//   res.status(200).json({ data: updatedApplication });
// };

export const routeDeleteApplication: RequestHandler = async (req, res, _next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);

  await deleteApplication(applicationId, res.locals.filters);

  res.sendStatus(204);
};

export const routeApproveApplication: ApplicationHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const isFinal = req.user.userType === 'Landlord';
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const updatedApplication = await approveApplication(isFinal, applicationId, res.locals.filters);
  if (!updatedApplication) throw new AppError(404, 'Application not found.');
  return updatedApplication;
};

export const routeRejectApplication: ApplicationHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const isFinal = req.user.userType === 'Landlord';
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const updatedApplication = await rejectApplication(isFinal, applicationId, res.locals.filters);
  if (!updatedApplication) throw new AppError(404, 'Application not found.');
  return updatedApplication;
};

export const routeAssignApplicationUnit: RequestHandler = async (req, res, _next) => {
  const applicationId = ObjectIdSchema.parse(req.params.applicationId);
  const params = AssignApplicationRequestBodySchema.parse(req.body);
  const updatedApplication = await assignApplicationUnit(
    applicationId,
    params.unitId,
    res.locals.filters,
  );

  res.status(200).json({ data: updatedApplication });
};
