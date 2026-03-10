import { RequestHandler } from 'express';
import { createFacility, CreateFacilityArguments } from '../services/facility.js';
import { getFacilityById, updateFacility } from '../services/facility.js';
import { CreateFacilityBodySchema, UpdateFacilityBodySchema } from './schema/facility.js';
import { ObjectIdSchema } from './schema/common.js';

export const routeGetFacilities: RequestHandler = async (req, res, next) => {};
export const routeCreateFacility: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;

  const params = CreateFacilityBodySchema.parse(req.body);

  const args: CreateFacilityArguments = {
    landlordID: userId,
    managerID: params.managerID,

    name: params.name,
    type: params.type,
    location: params.location,

    applicationCloseDate: params.applicationCloseDate,
    applicationOpenDate: params.applicationOpenDate,

    documentUrls: params.documentsUrl,
  };

  const newFacility = await createFacility(args);

  res.status(201).json({ id: newFacility.id });
};

export const routeGetFacilityById: RequestHandler = async (req, res, next) => {
  const facilityID = ObjectIdSchema.parse(req.params.facilityId);
  const facility = await getFacilityById(facilityID);

  res.status(200).json({ data: facility });
};

export const routeUpdateFacility: RequestHandler = async (req, res, next) => {
  const facilityID = ObjectIdSchema.parse(req.params.facilityId);
  const updateData = UpdateFacilityBodySchema.parse(req.body);

  if (req.user!.userType === 'Manager') {
    if (updateData.managerID) {
      // should not be able to set manager
      return res.status(403).json({
        error: 'Only landlords can reassign facility managers.',
      });
    }
  }

  const updatedFacility = await updateFacility(facilityID, updateData, res.locals.filters ?? {});

  res.status(200).json({
    data: updatedFacility,
  });
};

export const routeDeleteFacility: RequestHandler = async (req, res, next) => {};

export const routeGetListingsByFacility: RequestHandler = async (req, res, next) => {};
