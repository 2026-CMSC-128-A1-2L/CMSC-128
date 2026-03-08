import { RequestHandler } from 'express';
import { createFacility, CreateFacilityArguments } from '../services/facility.js';
import z from 'zod';
import mongoose from 'mongoose';
import { getFacilityById, updateFacility } from '../services/facility.js';

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const routeGetFacilities: RequestHandler = async (req, res, next) => {};

const locationSchema = z.object({
  coordinates: z
    .array(z.number())
    .refine((x) => x.length === 2)
    .optional(),
  text: z.string().optional(),
});

export const routeCreateFacility: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;

  // zod schema for
  const ParamsSchema = z.object({
    managerID: objectIdSchema.optional(),

    name: z.string(),
    type: z.enum(['on-campus', 'off-campus', 'partner housing']),
    location: locationSchema.optional(),

    applicationCloseDate: z.iso.datetime().transform((date) => new Date(date)),
    applicationOpenDate: z.iso.datetime().transform((date) => new Date(date)),

    documentsUrl: z.string().optional(),
  });

  const params = ParamsSchema.parse(req.body);

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

  res.status(201).json({
    id: newFacility.id,
  });
};

export const routeGetFacilityById: RequestHandler = async (req, res, next) => {
  const facilityID = objectIdSchema.parse(req.params.facilityId);
  const facility = await getFacilityById(facilityID);

  res.status(200).json({
    data: facility,
  });
};

export const routeUpdateFacility: RequestHandler = async (req, res, next) => {
  const ParamsSchema = z.object({
    managerID: objectIdSchema.optional(),
    name: z.string().optional(),
    type: z.enum(['on-campus', 'off-campus', 'partner housing']).optional(),
    location: locationSchema.optional(),

    applicationCloseDate: z.coerce.date().optional(),
    applicationOpenDate: z.coerce.date().optional(),

    documentsUrl: z.string().optional(),
  });

  const facilityID = objectIdSchema.parse(req.params.facilityId);
  const updateData = ParamsSchema.parse(req.body);

  if (req.user!.userType === 'Manager') {
    if (updateData.managerID) {
      // should not be able to set manager
      return res.status(400).json({
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
