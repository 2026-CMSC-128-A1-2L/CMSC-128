import { RequestHandler } from 'express';
import {
  CreateFacilityRequestBodySchema,
  GetFacilityResponseBodySchema,
  GetFacilitiesRequestQuerySchema,
  ObjectIdSchema,
  UpdateFacilityRequestBodySchema,
  UpdateManagerPermissionsRequestBodySchema,
} from 'shared';
import z from 'zod';
import {
  getFacilities,
  createFacility,
  getFacilityById,
  updateFacility,
  deleteFacility,
  removeManagerFromFacility,
  updateManagerPermissions,
  approveFacility,
} from './facility.service';

// GET /facilities: routeGetFacilities
export const routeGetFacilities: RequestHandler = async (req, res, next) => {
  const query = GetFacilitiesRequestQuerySchema.parse(req.query);
  return await getFacilities(query);
};

// POST /facilities/search: routeSearchFacilities
export const routeSearchFacilities: RequestHandler = async (req, res, next) => { };

// POST /facilities: routeCreateFacility
export const routeCreateFacility: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;
  const params = CreateFacilityRequestBodySchema.parse(req.body);

  const newFacility = await createFacility(userId, params);

  res.status(201).json({ data: newFacility });
};

// GET /facilities/:facilityId: routeGetFacility
export const routeGetFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const facility = await getFacilityById(facilityId);
  const facilityResponse: z.infer<typeof GetFacilityResponseBodySchema> = {
    id: facility._id,
    name: facility.name,
    landlordId: {
      id: facility.landlordId._id,
      profilePicture: facility.landlordId.profilePicture,
      firstName: facility.landlordId.firstName,
      middleName: facility.landlordId.middleName,
      lastName: facility.landlordId.lastName,

      // TODO:  fetch actual number of units
      numUnits: 0,
      createdAt: facility.landlordId.createdAt,
    },
    managers: facility.managers.map((x) => ({
      id: x._id,
      profilePicture: x.userId.profilePicture,
      firstName: x.userId.firstName,
      middleName: x.userId.middleName,
      lastName: x.userId.lastName,
    })),
    location: facility.location,
    type: facility.type,
    isAcceptingApplications: facility.isAcceptingApplications,
    applicationOpenDate: facility.applicationOpenDate,
    applicationCloseDate: facility.applicationCloseDate,
  };

  res.status(200).json({ data: facilityResponse });
};

// PATCH /facilities/:facilityId: routeUpdateFacility
export const routeUpdateFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const updateData = UpdateFacilityRequestBodySchema.parse(req.body);
  res.status(200).send({ data: await updateFacility(facilityId, updateData, res.locals.filters) });
};

// DELETE /facilities/:facilityId: routeDeleteFacility
export const routeDeleteFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);

  await deleteFacility(facilityId);

  // send back success
  res.sendStatus(204);
};

// DELETE /facilities/:facilityId/managers/:managerId: routeRemoveManager
export const routeRemoveManager: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const managerId = ObjectIdSchema.parse(req.params.managerId);

  await removeManagerFromFacility(facilityId, managerId);

  res.sendStatus(204);
};

// PATCH /facilities/:facilityId/managers/:managerId: routeUpdateManagerPermissions
export const routeUpdateManagerPermissions: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const managerId = ObjectIdSchema.parse(req.params.managerId);

  const body = UpdateManagerPermissionsRequestBodySchema.parse(req.body);

  await updateManagerPermissions(facilityId, managerId, body);

  res.sendStatus(204);
};

export const routeApproveFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);

  const approvedFacility = await approveFacility(facilityId, res.locals.filters ?? {});

  res.status(200).json({ data: approvedFacility });
};

export const routeRejectFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);

  const approvedFacility = await approveFacility(facilityId, res.locals.filters ?? {});

  res.status(200).json({ data: approvedFacility });
};
