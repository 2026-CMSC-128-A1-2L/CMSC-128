import { RequestHandler } from 'express';
import {
  createFacility,
  getFacilityById,
  updateFacility,
  deleteFacility,
  getFacilities,
} from '../services/facility.js';
import { getListingsByFacility } from '../services/listing.js';
import { CreateFacilityBodySchema, UpdateFacilityBodySchema } from './schema/facility.js';
import { ObjectIdSchema } from './schema/common.js';

// TODO: filtering
export const routeGetFacilities: RequestHandler = async (req, res, next) => {
  return await getFacilities();
};

export const routeCreateFacility: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;
  const params = CreateFacilityBodySchema.parse(req.body);

  const newFacility = await createFacility({ ...params, landlordId: userId });

  res.status(201).json({ id: newFacility.id });
};

export const routeGetFacilityById: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const facility = await getFacilityById(facilityId);

  res.status(200).json({ data: facility });
};

export const routeUpdateFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const updateData = UpdateFacilityBodySchema.parse(req.body);

  if (req.user!.userType === 'Manager') {
    if (updateData.managerId) {
      // should not be able to set manager
      return res.status(403).json({
        error: 'Only landlords can reassign facility managers.',
      });
    }
  }

  const updatedFacility = await updateFacility(facilityId, updateData, res.locals.filters ?? {});

  res.status(200).json({
    data: updatedFacility,
  });
};

export const routeDeleteFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);

  await deleteFacility(facilityId);

  // send back success
  res.status(200).json({ message: 'Facility deleted successfully.' });
};

export const routeGetListingsByFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const listings = await getListingsByFacility(facilityId, res.locals.filters);

  res.status(200).json({ data: listings });
};
