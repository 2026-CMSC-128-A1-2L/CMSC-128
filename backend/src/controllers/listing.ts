import { RequestHandler } from 'express';
import { createListing, getListingById, getListings } from '../services/listing.js';
import z from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const routeGetListings: RequestHandler = async (req, res, next) => {
  const QuerySchema = z.object({
    q: z.string().transform((x) => JSON.parse(x)),
  });

  const searchQuery = QuerySchema.parse(req.query);

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

  const SearchQuerySchema = z.object({
    housingID: objectIdSchema.optional(),
    tags: z.array(TagSchema).optional(),
    capacity: z
      .object({ min: z.number().min(0).default(0), max: z.number().optional() })
      .optional(),
    isPrivate: z.boolean().optional(),
    allowVisit: z.boolean().optional(),
    allowTransfer: z.boolean().optional(),
  });

  const params = SearchQuerySchema.parse(searchQuery.q);
  const listings = await getListings(params);

  res.status(200).json({ data: listings }); // sends a json of requested
};

export const routeCreateListing: RequestHandler = async (req, res, next) => {
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
  });
  const params = ParamsSchema.parse(req.body);
  const newListing = await createListing(params, res.locals.filters);

  res.status(201).json({ id: newListing.id });
};

export const routeGetListingById: RequestHandler = async (req, res, next) => {
  const ParamsSchema = z.object({ listingID: objectIdSchema });

  const params = ParamsSchema.parse(req.params);
  const listing = await getListingById(params.listingID, res.locals.filters);

  res.status(200).json({ data: listing }); // sends a json of requested
};

export const routeGetListingReviewsById: RequestHandler = async (req, res, next) => {};
export const routeUpdateListing: RequestHandler = async (req, res, next) => {};
export const routeDeleteListing: RequestHandler = async (req, res, next) => {};

export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {};
