import { RequestHandler } from 'express';
import {
  createUnit,
  CreateUnitArguments,
  getUnitById,
  getUnits,
  getUnitByListing,
  updateUnit,
  deleteUnit,
  UpdateUnitArguments,
} from '../services/unit.js';
import z from 'zod';
import mongoose from 'mongoose';
import { GetUnitsQuerySchema, CreateUnitBodySchema, UpdateUnitBodySchema } from './schema/unit.js';

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
    listingId: objectIdSchema.optional(),
    landlordId: objectIdSchema.optional(),
    managerId: objectIdSchema.optional(),
  });

  const args = ParamsSchema.parse(req.params);
  const unit = await getUnits(args);
  res.status(200).json(unit); // sends a json of requested
};

export const routeCreateUnit: RequestHandler = async (req, res, next) => {
  const params = CreateUnitBodySchema.parse(req.body);
  const user = req.user!;

  const args: CreateUnitArguments = {
    roomNumber: params.roomNumber,
    capacity: params.capacity,
    currentOccupancy: params.currentOccupancy ?? 0,
    price: params.price,
    location: params.location ?? null,
    isAvailable: params.isAvailable,
    listingId: params.listingId,
    landlordId: user.userType === 'Landlord' ? user._id : user._id,
    managerId: user.userType === 'Manager' ? user._id : null,
  };

  const newUnit = await createUnit(args, res.locals.filters);
  res.status(201).json({
    id: newUnit.id,
  });
};

export const routeGetUnit: RequestHandler = async (req, res, next) => {
  //zod schema
  const ParamsSchema = z.object({
    unitId: objectIdSchema,
  });

  const params = ParamsSchema.parse(req.params);
  const unit = await getUnitById(params.unitId);
  res.status(200).json(unit); // sends a json of requested
};
export const routeUpdateUnit: RequestHandler = async (req, res, next) => {
  try {
    const unitId = objectIdSchema.parse(req.params.unitId);
    const updateData = UpdateUnitBodySchema.parse(req.body);

    const updatedUnit = await updateUnit(unitId, updateData, res.locals.filters ?? {});
    res.status(200).json({ data: updatedUnit });
  } catch (err) {
    next(err);
  }
};
export const routeDeleteUnit: RequestHandler = async (req, res, next) => {
  try {
    const unitId = objectIdSchema.parse(req.params.unitId);

    await deleteUnit(unitId, res.locals.filters ?? {});
    res.status(200).json({ message: 'Unit deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {
  //zod schema
  const ParamsSchema = z.object({
    listingId: objectIdSchema,
  });

  const params = ParamsSchema.parse(req.params);
  const unit = await getUnitByListing(params.listingId);
  res.status(200).json(unit); // sends a json of requested
};
