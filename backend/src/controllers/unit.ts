import { RequestHandler } from 'express';
import {
  createUnit,
  CreateUnitArguments,
  getUnitById,
  GetUnitArguments,
  getUnits,
  getUnitByListing,
  updateUnit,
  deleteUnit,
  UpdateUnitArguments,
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
    roomNumber: z.number(),
    capacity: z.number(),
    currentOccupancy: z.number(),
    price: z.number(),
    floorNumber: z.number(),
    status: z.enum(['available', 'unavailable']),
    listingID: objectIdSchema,
    landlordID: objectIdSchema,
    managerID: objectIdSchema
  });

  const params = ParamsSchema.parse(req.params);

  const args: GetUnitArguments = {
    roomNumber: params.roomNumber,
    capacity: params.capacity,
    currentOccupancy: params.currentOccupancy,
    price: params.price,
    floorNumber: params.floorNumber,
    status: params.status,
    listingID: params.listingID,
    landlordID: params.landlordID,
    managerID: params.managerID
  };
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
    floorNumber: z.number(),
    status: z.enum(['available', 'unavailable']),
    listingID: objectIdSchema,
    landlordID: objectIdSchema,
    managerID: objectIdSchema
  });
  const params = ParamsSchema.parse(req.params);

  const args: CreateUnitArguments = {
    roomNumber: params.roomNumber,
    capacity: params.capacity,
    currentOccupancy: params.currentOccupancy,
    price: params.price,
    floorNumber: params.floorNumber,
    status: params.status,
    listingID: params.listingID,
    landlordID: params.landlordID,
    managerID: params.managerID
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
export const routeUpdateUnit: RequestHandler = async (req, res, next) => {
  try {
    const unitId = ObjectIdSchema.parse(req.params.unitId);
    const updateData = UpdateUnitBodySchema.parse(req.body);

    const updatedUnit = await updateUnit(unitId, updateData, res.locals.filters ?? {});
    res.status(200).json({ data: updatedUnit });
  } catch (err) {
    next(err);
  }
};
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

