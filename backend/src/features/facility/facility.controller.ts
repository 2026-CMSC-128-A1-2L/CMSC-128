import type { RequestHandler } from 'express';
import {
  CreateFacilityRequestBodySchema,
  type GetFacilityResponseBodySchema,
  ObjectIdSchema,
  UpdateFacilityRequestBodySchema,
  UpdateManagerPermissionsRequestBodySchema,
  FacilityFilterSchema,
} from 'shared';
import type z from 'zod';
import {
  getFacilities,
  createFacility,
  getFacilityById,
  updateFacility,
  deleteFacility,
  removeManagerFromFacility,
  updateManagerPermissions,
  approveFacility,
  rejectFacility,
  searchFacilities,
  getMonthlyIncomeByLandlord,
  getOverdueTenantsByLandlord,
} from './facility.service.js';
import assert from 'node:assert';

// GET /facilities: routeGetFacilities
//
// Fix 1: Added { data: ... } wrapper to match FacilityService type expectation.
// Fix 2: Strips _id and exposes id to match GetFacilitiesResponseBodySchema.
export const routeGetFacilities: RequestHandler = async (_req, res) => {
  try {
    const facilities = await getFacilities();
    console.log('facilities count:', facilities.length);
    res.status(200).json({
      data: facilities.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
      })),
    });
  } catch (err) {
    console.error('routeGetFacilities error:', err);
    throw err;
  }
};// POST /facilities/search: routeSearchFacilities
//
// Fix 3: Added { data: ... } wrapper to be consistent with all other routes.
export const routeSearchFacilities: RequestHandler = async (req, res, _next) => {
  const query = FacilityFilterSchema.parse(req.body);
  res.status(200).json({ data: await searchFacilities(query) });
};

// POST /facilities: routeCreateFacility
export const routeCreateFacility: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const userId = req.user._id;
  const params = CreateFacilityRequestBodySchema.parse(req.body);
  const newFacility = await createFacility(userId, params);
  res.status(201).json({ data: newFacility });
};

// GET /facilities/:facilityId: routeGetFacility
export const routeGetFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const facility = await getFacilityById(facilityId);

  const facilityResponse: z.infer<typeof GetFacilityResponseBodySchema> = {
    id: facility._id,
    name: facility.name,
    location: facility.location,
    description: facility.description,
    verifiedAt: facility.verifiedAt,
    media: facility.media,
    landlord: {
      id: facility.landlordId._id,
      profilePicture: facility.landlordId.profilePicture,
      firstName: facility.landlordId.firstName,
      middleName: facility.landlordId.middleName,
      lastName: facility.landlordId.lastName,
      contact: facility.landlordId.contact,
      // TODO: fetch actual number of units
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
    type: facility.type,
    isAcceptingApplications: facility.isAcceptingApplications,
    applicationOpenDate: facility.applicationOpenDate,
    applicationCloseDate: facility.applicationCloseDate,
    allowVisit: facility.allowVisit,
    allowTransfer: facility.allowTransfer,
    listings: [],
  };

  res.status(200).json({ data: facilityResponse });
};

// PATCH /facilities/:facilityId: routeUpdateFacility
export const routeUpdateFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const updateData = UpdateFacilityRequestBodySchema.parse(req.body);
  res.status(200).json({ data: await updateFacility(facilityId, updateData, res.locals.filters) });
};

// DELETE /facilities/:facilityId: routeDeleteFacility
export const routeDeleteFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  await deleteFacility(facilityId);
  res.sendStatus(204);
};

// DELETE /facilities/:facilityId/managers/:managerId: routeRemoveManager
export const routeRemoveManager: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const managerId = ObjectIdSchema.parse(req.params.managerId);
  await removeManagerFromFacility(facilityId, managerId);
  res.sendStatus(204);
};

// PATCH /facilities/:facilityId/managers/:managerId: routeUpdateManagerPermissions
export const routeUpdateManagerPermissions: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const managerId = ObjectIdSchema.parse(req.params.managerId);
  const body = UpdateManagerPermissionsRequestBodySchema.parse(req.body);
  await updateManagerPermissions(facilityId, managerId, body);
  res.sendStatus(204);
};

// POST /facilities/:facilityId/approve: routeApproveFacility
export const routeApproveFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const approvedFacility = await approveFacility(facilityId, res.locals.filters ?? {});
  res.status(200).json({ data: approvedFacility });
};

// POST /facilities/:facilityId/reject: routeRejectFacility
//
// Fix 4: Was incorrectly calling approveFacility — now correctly calls rejectFacility.
// Fix 5: Renamed result variable from approvedFacility to rejectedFacility.
export const routeRejectFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const rejectedFacility = await rejectFacility(facilityId, res.locals.filters ?? {});
  res.status(200).json({ data: rejectedFacility });
};

// GET /api/facilities/landlord/monthly-income
//
// Returns the expected monthly income for the authenticated landlord.
// Sums the unit price of every active rental across all owned facilities.
export const routeGetMonthlyIncomeByLandlord: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const data = await getMonthlyIncomeByLandlord(req.user._id);
  res.status(200).json({ data });
};

// GET /api/facilities/landlord/overdue-tenants
//
// Returns all active tenants whose most recent billing is overdue,
// across all facilities owned by the authenticated landlord.
export const routeGetOverdueTenantsByLandlord: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const data = await getOverdueTenantsByLandlord(req.user._id);
  res.status(200).json({ data });
};
