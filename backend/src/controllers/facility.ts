import { RequestHandler } from 'express';
import { createFacility, CreateFacilityArguments } from '../services/facility.js';
import z from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const routeGetFacilities: RequestHandler = async (req, res, next) => {};

export const routeCreateFacility: RequestHandler = async (req, res, next) => {
  // auth check should be done in middleware before this, so should include user id already
  const userId = req.user!._id;

  // zod schema for
  const ParamsSchema = z.object({
    landlordID: objectIdSchema,
    managerID: objectIdSchema.optional(),

    name: z.string(),
    type: z.enum(['on-campus', 'off-campus', 'partner housing']),
    location: z.string(),

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

export const routeGetFacilityById: RequestHandler = async (req, res, next) => {};
export const routeUpdateFacility: RequestHandler = async (req, res, next) => {};
export const routeDeleteFacility: RequestHandler = async (req, res, next) => {};

export const routeGetListingsByFacility: RequestHandler = async (req, res, next) => {};
