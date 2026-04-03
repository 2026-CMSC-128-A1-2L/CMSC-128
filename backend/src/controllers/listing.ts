import { RequestHandler } from 'express';
import {
  createListing,
  getListingById,
  getListings,
  // getListingReviewsById,
  updateListing,
  deleteListing,
  updateListingTags,
} from '../services/listing.js';
import z from 'zod';
import { ObjectIdSchema } from './schema/common.js';
import {
  GetListingsQuerySchema,
  CreateListingBodySchema,
  UpdateListingBodySchema,
  SearchQuerySchema,
  TagSchema,
  ListingFilterSchema,
} from './schema/listing.js';
import { Listing } from '../models/housing/Listing.js';
import { QueryFilter } from 'mongoose';

export const routeGetListings: RequestHandler = async (req, res, next) => {
  const searchQuery = GetListingsQuerySchema.parse(req.query);

  const params = ListingFilterSchema.parse(searchQuery.q);
  const listings = await getListings(params, res.locals.filters);

  res.status(200).json({ data: listings });
};

export const routeCreateListing: RequestHandler = async (req, res, next) => {
  const housingId = req.params.facilityId
    ? ObjectIdSchema.parse(req.params.facilityId)
    : ObjectIdSchema.parse(req.body.housingId);
  const params = CreateListingBodySchema.parse(req.body);
  const newListing = await createListing({ ...params, housingId }, res.locals.filters);

  res.status(201).json({ id: newListing.id });
};

export const routeGetListing: RequestHandler = async (req, res, next) => {
  const GetListingByIdParamsSchema = z.object({ listingId: ObjectIdSchema });

  const params = GetListingByIdParamsSchema.parse(req.params);
  const listing = await getListingById(
    params.listingId,
    res.locals.filters as QueryFilter<typeof Listing>,
  );

  res.status(200).json({ data: listing });
};

// export const routeGetListingReviews: RequestHandler = async (req, res, next) => {
//   const listingId = ObjectIdSchema.parse(req.params.listingId);
//   const reviews = await getListingReviewsById(listingId);

//   res.status(200).json({ data: reviews });
// };

export const routeUpdateListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const updateData = UpdateListingBodySchema.parse(req.body);

  const updatedListing = await updateListing(listingId, updateData, res.locals.filters ?? {});

  res.status(200).json({ data: updatedListing });
};

export const routeDeleteListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);

  await deleteListing(listingId, res.locals.filters ?? {});

  res.status(200).json({ message: 'Listing deleted successfully.' });
};

export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {};
export const routeGetApplicationsByListing: RequestHandler = async (req, res, next) => {};
export const routeGetVisitBookingsByListing: RequestHandler = async (req, res, next) => {};
export const routeUpdateListingTags: RequestHandler = async (req, res, next) => {
  const listingID = ObjectIdSchema.parse(req.params.listingId);
  
  const updateData = z.object({
    tags: z.array(TagSchema)
  }).parse(req.body);

  const updatedListing = await updateListingTags(listingID, updateData, res.locals.filters ?? {});

  res.status(200).json({ data: updatedListing });
};
export const routeApproveListing: RequestHandler = async (req, res, next) => {};
