import { RequestHandler } from 'express';
import {
  createUnit,
  CreateUnitArguments,
  getUnitById,
  getUnits,
  getUnitByListing,
} from '../services/unit.js';
import z from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const routeGetUnits: RequestHandler = async (req, res, next) => {
  const ParamsSchema = z.object({
    roomNumber: z.number().optional(),
    capacity: z.number().optional(),
    currentOccupancy: z.number().optional(),
    price: z.number().optional(),
    location: z.string().optional(),
    isAvailable: z.boolean().optional(),
    listingID: objectIdSchema.optional(),
    landlordID: objectIdSchema.optional(),
    managerID: objectIdSchema.optional(),
  });

  const args = ParamsSchema.parse(req.params);
  const unit = await getUnits(args);
  res.status(200).json(unit); // sends a json of requested
};

export const routeCreateUnit: RequestHandler = async (req, res, next) => {
  //zod schema
  const ParamsSchema = z.object({
    roomNumber: z.number(),
    capacity: z.number(),
    currentOccupancy: z.number(),
    price: z.number(),
    location: z.string(),
    isAvailable: z.boolean(),
    listingID: objectIdSchema,
    landlordID: objectIdSchema,
    managerID: objectIdSchema,
  });
  const params = ParamsSchema.parse(req.params);

  const args: CreateUnitArguments = {
    roomNumber: params.roomNumber,
    capacity: params.capacity,
    currentOccupancy: params.currentOccupancy,
    price: params.price,
    location: params.location,
    isAvailable: params.isAvailable,
    listingID: params.listingID,
    landlordID: params.landlordID,
    managerID: params.managerID,
  };

  const newListing = await createUnit(args, res.locals.filters);
  res.status(201).json({
    id: newListing.id,
  });
};

export const routeGetUnitById: RequestHandler = async (req, res, next) => {
  //zod schema
  const ParamsSchema = z.object({
    unitID: objectIdSchema,
  });

  const params = ParamsSchema.parse(req.params);
  const unit = await getUnitById(params.unitID);
  res.status(200).json(unit); // sends a json of requested
};
export const routeUpdateUnit: RequestHandler = async (req, res, next) => {};
export const routeDeleteUnit: RequestHandler = async (req, res, next) => {};
export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {
  //zod schema
  const ParamsSchema = z.object({
    listingID: objectIdSchema,
  });

  const params = ParamsSchema.parse(req.params);
  const unit = await getUnitByListing(params.listingID);
  res.status(200).json(unit); // sends a json of requested
};
