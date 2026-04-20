import { RequestHandler } from 'express';
import {
  CreateUnitBodySchema,
  GetUnitsRequestQuerySchema,
  ObjectIdSchema,
  UpdateUnitBodySchema,
} from 'shared';
import {
  getUnits,
  CreateUnitArguments,
  createUnit,
  getUnitById,
  updateUnit,
  deleteUnit,
} from './unit.service';

export const routeGetUnits: RequestHandler = async (req, res, next) => {
  const query = GetUnitsRequestQuerySchema.parse(req.query);
  res.status(200).json({ data: await getUnits(query, res.locals.filters) });
};

export const routeCreateUnit: RequestHandler = async (req, res, next) => {
  const params = CreateUnitBodySchema.parse(req.body);
  const args: CreateUnitArguments = {
    listingId: params.listingId,
    roomNumber: params.roomNumber,
    price: params.price,
    location: params.location ?? null,
    isAvailable: params.isAvailable,
  };

  const newUnit = await createUnit(args, res.locals.filters);
  res.status(201).json({ id: newUnit.id });
};

export const routeGetUnit: RequestHandler = async (req, res, next) => {
  const unitId = ObjectIdSchema.parse(req.params.unitId);
  res.status(200).json({ data: await getUnitById(unitId, res.locals.filters) });
};

export const routeUpdateUnit: RequestHandler = async (req, res, next) => {
  const unitId = ObjectIdSchema.parse(req.params.unitId);
  const updateData = UpdateUnitBodySchema.parse(req.body);

  const updatedUnit = await updateUnit(unitId, updateData, res.locals.filters);
  res.status(200).json({ data: updatedUnit });
};

export const routeDeleteUnit: RequestHandler = async (req, res, next) => {
  const unitId = ObjectIdSchema.parse(req.params.unitId);
  await deleteUnit(unitId, res.locals.filters);
  res.sendStatus(204);
};

export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  res.status(200).json({ data: await getUnits({ listingId }, res.locals.filters) });
};
