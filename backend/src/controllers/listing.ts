import { RequestHandler } from 'express';
import { createListing, CreateListingArguments, getListingById } from '../services/listing.js';
import z from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const routeGetListings: RequestHandler = async (req, res, next) => {};

export const routeCreateListing: RequestHandler = async (req, res, next) => {
  // auth check
  const userId = req.user!._id;

  //zod schema
  const ParamsSchema = z.object({
    housingID: objectIdSchema,
    tags: z.array(z.string()).optional(),
    roomType: z.string(),
    capacity: z.number(),
    isPrivate: z.boolean(),
    allowVisit: z.boolean(),
    allowTransfer: z.boolean(),
    description: z.string(),
    mediaUrls: z.array(z.string()).optional(),
    units: z.array(z.string()),
  });
  const params = ParamsSchema.parse(req.params);

  const args: CreateListingArguments = {
    housingID: params.housingID,

    tags: params.tags,

    roomType: params.roomType,
    capacity: params.capacity,

    isPrivate: params.isPrivate,
    allowVisit: params.allowVisit,
    allowTransfer: params.allowTransfer,

    description: params.description,
    mediaUrls: params.mediaUrls,

    units: params.units,
  };

  const newListing = await createListing(args);
  res.status(201).json({
    id: newListing.id,
  });
};

export const routeGetListingById: RequestHandler = async (req, res, next) => {
  // auth check
  const userId = req.user!._id;

  //zod schema
  const ParamsSchema = z.object({
    listingID: objectIdSchema,
  });

  const params = ParamsSchema.parse(req.params);
  const listing = await getListingById(params.listingID);
  res.status(200).json(listing); // sends a json of requested
};
export const routeGetListingReviewsById: RequestHandler = async (req, res, next) => {};
export const routeUpdateListing: RequestHandler = async (req, res, next) => {};
export const routeDeleteListing: RequestHandler = async (req, res, next) => {};

export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {};
