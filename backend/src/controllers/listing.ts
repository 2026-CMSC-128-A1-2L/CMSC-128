import { RequestHandler } from 'express';
import {
  createListing,
  CreateListingArguments,
  getListingById,
  GetListingArguments,
  getListings,
  getListingReviewsById,
  updateListing,
  UpdateListingArguments,
  deleteListing,
} from '../services/listing.js';
import z from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const routeGetListings: RequestHandler = async (req, res, next) => {
  const TagSchema = z.object({
    name: z.string(),
    value: z.discriminatedUnion('type', [
      z.object({
        type: z.literal('enum'),
        value: z.string(),
      }),
      z.object({
        type: z.literal('boolean'),
        value: z.boolean(),
      }),
      z.object({
        type: z.literal('number'),
        value: z.object({
          min: z.number().min(0).default(0),
          max: z.number().optional(),
        }),
      }),
    ]),
  });

  const ParamsSchema = z.object({
    housingID: objectIdSchema,
    tags: z.array(TagSchema).optional(),
    capacity: z.object({ min: z.number().min(0).default(0), max: z.number().optional() }),
    isPrivate: z.boolean(),
    allowVisit: z.boolean(),
    allowTransfer: z.boolean(),
  });

  const params = ParamsSchema.parse(req.params);

  const args: GetListingArguments = {
    housingID: params.housingID,
    tags: params.tags,
    capacity: params.capacity,
    isPrivate: params.isPrivate,
    allowVisit: params.allowVisit,
    allowTransfer: params.allowTransfer,
  };
  const listing = await getListings(args);
  res.status(200).json(listing); // sends a json of requested
};

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

  const newListing = await createListing(args, res.locals.filters);
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

export const routeGetListingReviewsById: RequestHandler = async (req, res, next) => {
  const listingID = objectIdSchema.parse(req.params.listingId);
  const reviews = await getListingReviewsById(listingID);

  res.status(200).json({
    data: reviews
  });
};

export const routeUpdateListing: RequestHandler = async (req, res, next) => {
  const ParamsSchema = z.object({
    tags: z.array(z.string()).optional(),
    roomType: z.string().optional(),
    capacity: z.number().optional(),
    isPrivate: z.boolean().optional(),
    allowVisit: z.boolean().optional(),
    allowTransfer: z.boolean().optional(),
    description: z.string().optional(),
    mediaUrls: z.array(z.string()).optional(),
    units: z.array(z.string()).optional(),
  });

  const listingID = objectIdSchema.parse(req.params.listingId);
  const updateData = ParamsSchema.parse(req.body);

  const updatedListing = await updateListing(listingID, updateData, res.locals.filters ?? {});

  res.status(200).json({
    data: updatedListing,
  });
};

export const routeDeleteListing: RequestHandler = async (req, res, next) => {
  const listingID = objectIdSchema.parse(req.params.listingId);
  
  await deleteListing(listingID, res.locals.filters ?? {});

  res.status(200).json({
    message: 'Listing deleted successfully.',
  });
};

export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {};
