import { RequestHandler } from 'express';
import {
  CreateUnit,
  GetUnitById,
  GetUnits,
  GetUnitByListing,
} from '../services/unit.js';
import { GetUnitBodySchema, CreateUnitBodySchema, GetUnitByIdSchema, GetUnitByListingSchema } from './schema/unit.js';

export const routeGetUnits: RequestHandler = async (req, res, next) => {
  const args = GetUnitBodySchema.parse(req.body);
  const unit = await GetUnits(args, res.locals.filters ?? {});
  res.status(200).json(unit);
};

export const routeCreateUnit: RequestHandler = async (req, res, next) => {
  const userId = req.user!._id;
  const params = CreateUnitBodySchema.parse(req.body);
  const newUnit = await CreateUnit(params, res.locals.filters ?? {});
  res.status(201).json({ id: newUnit.id });
};

export const routeGetUnitById: RequestHandler = async (req, res, next) => {
  const params = GetUnitByIdSchema.parse(req.params);
  const unit = await GetUnitById(params.unitID);
  res.status(200).json(unit);
};

export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {
  const params = GetUnitByListingSchema.parse(req.params);
  const unit = await GetUnitByListing(params.listingId, res.locals.filters ?? {});
  res.status(200).json(unit);
};
