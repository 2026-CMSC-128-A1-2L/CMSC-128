import { RequestHandler } from 'express';
import { QueryFilter } from 'mongoose';
import {
  GetListingsQuerySchema,
  ObjectIdSchema,
  CreateListingBodySchema,
  UpdateListingBodySchema,
  UpdateListingTagsResponseBodySchema,
} from 'shared';
import { Listing } from './listing.model';
import {
  getListings,
  createListing,
  getListingById,
  getListingsByFacility,
  updateListing,
  deleteListing,
  updateListingTags,
} from './listing.service';
import { AppError } from '../../error';

export const routeGetListings: RequestHandler = async (req, res, next) => {
  const params = GetListingsQuerySchema.parse(req.query);
  const listings = await getListings(params, res.locals.filters);
  res.status(200).json({ data: listings });
};

export const routeCreateListing: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const params = CreateListingBodySchema.parse(req.body);
  const newListing = await createListing({ ...params, facilityId }, res.locals.filters);
  res.status(201).json({ id: newListing.id });
};

export const routeGetListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const listing = await getListingById(
    listingId,
    res.locals.filters as QueryFilter<typeof Listing>,
  );
  if (!listing) return next(new AppError(404, 'Listing not found.'));
  res.status(200).json({ data: listing });
};

export const routeGetListingsByFacility: RequestHandler = async (req, res, next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const listings = await getListingsByFacility(facilityId, res.locals.filters);
  res.status(200).json({ data: listings });
};

export const routeUpdateListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const updateData = UpdateListingBodySchema.parse(req.body);
  const updatedListing = await updateListing(listingId, updateData, res.locals.filters);
  if (!updatedListing) return next(new AppError(404, 'Listing not found.'));
  res.status(200).json({ data: updatedListing });
};

export const routeDeleteListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  await deleteListing(listingId, res.locals.filters);
  res.sendStatus(204);
};

export const routeUpdateListingTags: RequestHandler = async (req, res, next) => {
  const listingID = ObjectIdSchema.parse(req.params.listingId);
  const updateData = UpdateListingTagsResponseBodySchema.parse(req.body);
  const updatedListing = await updateListingTags(listingID, updateData, res.locals.filters ?? {});
  if (!updatedListing) return next(new AppError(404, 'Listing not found.'));
  res.status(200).json({ data: updatedListing });
};
