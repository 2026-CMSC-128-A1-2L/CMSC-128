import type { RequestHandler } from 'express';
import {
  CreateFacilityRequestBodySchema,
  type GetFacilityResponseBodySchema,
  ObjectIdSchema,
  UpdateFacilityRequestBodySchema,
  UpdateManagerPermissionsRequestBodySchema,
  FacilityFilterSchema,
} from 'shared';
import type z from 'zod';
import {
  getFacilities,
  createFacility,
  getFacilityById,
  updateFacility,
  deleteFacility,
  removeManagerFromFacility,
  updateManagerPermissions,
  approveFacility,
  rejectFacility,
  searchFacilities,
  getMonthlyIncomeByLandlord,
  getOverdueTenantsByLandlord,
  getTenantsByLandlord,
} from './facility.service.js';

import { getListings } from '../listing/listing.service.js';
import assert from 'node:assert';
import { Unit } from '../unit/unit.model.js';
import { Listing } from '../listing/listing.model.js';
import { Review } from '../review/review.model.js';
import type mongoose from 'mongoose';

const fallbackRoomTypeLabel = (roomType: string) =>
  `${roomType[0].toUpperCase()}${roomType.slice(1)}`;

const getFacilityListingSummaries = async (facilityIds: mongoose.Types.ObjectId[]) => {
  const listings = await Listing.find({ facilityId: { $in: facilityIds } });
  const units = await Unit.find({
    listingId: { $in: listings.map((listing) => listing._id) },
  }).lean();

  const unitsByListingId = new Map<string, typeof units>();
  for (const unit of units) {
    const key = unit.listingId.toString();
    const existing = unitsByListingId.get(key) ?? [];
    existing.push(unit);
    unitsByListingId.set(key, existing);
  }

  const summariesByFacilityId = new Map<
    string,
    {
      id: unknown;
      name: string;
      roomType: string;
      rent: number;
      unitCount: number;
      availableUnitCount: number;
    }[]
  >();

  for (const listing of listings) {
    const tags =
      listing.tags instanceof Map ? Object.fromEntries(listing.tags) : (listing.tags ?? {});
    const listingUnits = unitsByListingId.get(listing._id.toString()) ?? [];
    const availableUnits = listingUnits.filter((unit) => unit.isAvailable);
    const unitPrices = listingUnits.map((unit) => unit.price).filter((price) => price > 0);
    const rent = unitPrices.length > 0 ? Math.min(...unitPrices) : 0;
    const facilityId = listing.facilityId.toString();
    const summaries = summariesByFacilityId.get(facilityId) ?? [];

    summaries.push({
      id: listing._id,
      name:
        typeof tags.roomLabel === 'string'
          ? tags.roomLabel
          : fallbackRoomTypeLabel(listing.roomType),
      roomType: listing.roomType,
      rent,
      unitCount: listingUnits.length,
      availableUnitCount: availableUnits.length,
    });
    summariesByFacilityId.set(facilityId, summaries);
  }

  return summariesByFacilityId;
};

const getFacilityReviewRatings = async (facilityIds: mongoose.Types.ObjectId[]) => {
  const reviews = await Review.find({
    facilityId: { $in: facilityIds },
    status: 'approved',
  })
    .select('facilityId ratings')
    .lean();

  const ratingsByFacilityId = new Map<string, number[]>();
  for (const review of reviews) {
    if (!review.ratings) continue;

    const ratingValues = [
      review.ratings.quality,
      review.ratings.comfort,
      review.ratings.environment,
    ].filter((rating): rating is number => typeof rating === 'number' && Number.isFinite(rating));

    if (ratingValues.length === 0) continue;

    const facilityId = review.facilityId.toString();
    const ratings = ratingsByFacilityId.get(facilityId) ?? [];
    ratings.push(ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length);
    ratingsByFacilityId.set(facilityId, ratings);
  }

  return ratingsByFacilityId;
};

// GET /facilities: routeGetFacilities
//
// Fix 1: Added { data: ... } wrapper to match FacilityService type expectation.
// Fix 2: Strips _id and exposes id to match GetFacilitiesResponseBodySchema.
export const routeGetFacilities: RequestHandler = async (_req, res) => {
  try {
    const facilities = await getFacilities();
    const listingSummariesByFacilityId = await getFacilityListingSummaries(
      facilities.map((facility) => facility._id),
    );
    const reviewRatingsByFacilityId = await getFacilityReviewRatings(
      facilities.map((facility) => facility._id),
    );

    res.status(200).json({
      data: facilities.map(({ _id, qualityAvg, comfortAvg, environmentAvg, media, ...rest }) => {
        const listingSummaries = listingSummariesByFacilityId.get(_id.toString()) ?? [];
        const reviewRatings = reviewRatingsByFacilityId.get(_id.toString()) ?? [];
        const prices = listingSummaries.map((listing) => listing.rent).filter((price) => price > 0);
        const firstImage = media?.[0]?.value;
        const facilityRatingValues = [qualityAvg, comfortAvg, environmentAvg].filter(
          (rating): rating is number => typeof rating === 'number' && Number.isFinite(rating),
        );
        const ratingValues = reviewRatings.length > 0 ? reviewRatings : facilityRatingValues;

        return {
          ...rest,
          id: _id.toString(),
          averageRating:
            ratingValues.length > 0
              ? ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length
              : 0,
          image: firstImage,
          media,
          price: {
            min: prices.length > 0 ? Math.min(...prices) : 0,
            max: prices.length > 0 ? Math.max(...prices) : 0,
          },
          listings: listingSummaries.map((listing) => ({
            id: listing.id,
            name: listing.name,
            price: {
              min: listing.rent,
              max: listing.rent,
            },
            unitCount: listing.unitCount,
            availableUnitCount: listing.availableUnitCount,
          })),
        };
      }),
    });
  } catch (err) {
    console.error('routeGetFacilities error:', err);
    throw err;
  }
}; // POST /facilities/search: routeSearchFacilities
//
// Fix 3: Added { data: ... } wrapper to be consistent with all other routes.
export const routeSearchFacilities: RequestHandler = async (req, res, _next) => {
  const query = FacilityFilterSchema.parse(req.body);
  res.status(200).json({ data: await searchFacilities(query) });
};

// POST /facilities: routeCreateFacility
export const routeCreateFacility: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const userId = req.user._id;
  const params = CreateFacilityRequestBodySchema.parse(req.body);
  const newFacility = await createFacility(userId, params);
  res.status(201).json({ data: newFacility });
};

// GET /facilities/:facilityId: routeGetFacility
export const routeGetFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const facility = await getFacilityById(facilityId);
  const listings = await getListings({ facilityId }, {});
  const units = await Unit.find({
    listingId: { $in: listings.map((listing) => listing._id) },
  }).lean();

  const unitsByListingId = new Map<string, typeof units>();
  for (const unit of units) {
    const key = unit.listingId.toString();
    const existing = unitsByListingId.get(key) ?? [];
    existing.push(unit);
    unitsByListingId.set(key, existing);
  }

  const landlord = facility.landlordId;

  const facilityResponse: z.infer<typeof GetFacilityResponseBodySchema> = {
    id: facility._id,
    name: facility.name,
    // Fix 1: coordinates fallback since it's optional on the Mongoose doc
    location: {
      coordinates: facility.location.coordinates ?? { lat: 0, long: 0 },
      text: facility.location.text,
    },
    description: facility.description,
    verifiedAt: facility.verifiedAt,
    media: facility.media,
    landlord: {
      id: landlord?._id ?? facility._id,
      profilePicture: landlord?.profilePicture,
      firstName: landlord?.firstName ?? 'Dorm',
      middleName: landlord?.middleName,
      lastName: landlord?.lastName ?? 'Landlord',
      contact: landlord?.contact ?? '',
      numUnits: listings.length, // use actual listing count
      createdAt: landlord?.createdAt ?? facility.createdAt,
    },
    managers: facility.managers.flatMap((x) =>
      x.userId
        ? [
            {
              id: x._id,
              profilePicture: x.userId.profilePicture,
              firstName: x.userId.firstName,
              middleName: x.userId.middleName,
              lastName: x.userId.lastName,
            },
          ]
        : [],
    ),
    type: facility.type,
    isAcceptingApplications: facility.isAcceptingApplications,
    applicationOpenDate: facility.applicationOpenDate,
    applicationCloseDate: facility.applicationCloseDate,
    allowVisit: facility.allowVisit,
    allowTransfer: facility.allowTransfer,
    listings: listings.map((listing) => {
      const tags =
        listing.tags instanceof Map ? Object.fromEntries(listing.tags) : (listing.tags ?? {});
      const listingUnits = unitsByListingId.get(listing._id.toString()) ?? [];
      const availableUnits = listingUnits.filter((unit) => unit.isAvailable);
      const unitPrices = listingUnits.map((unit) => unit.price).filter((price) => price > 0);
      const taggedPrice =
        typeof tags.monthly_price === 'number'
          ? tags.monthly_price
          : typeof tags.monthly_price === 'string'
            ? Number.parseFloat(tags.monthly_price)
            : 0;
      const rent = unitPrices.length > 0 ? Math.min(...unitPrices) : taggedPrice || 0;

      return {
        id: listing._id,
        name:
          typeof tags.roomLabel === 'string'
            ? tags.roomLabel
            : `${listing.roomType[0].toUpperCase()}${listing.roomType.slice(1)}`,
        roomType: listing.roomType,
        capacity: listing.capacity,
        description: listing.description ?? '',
        tags,
        cost: {
          rent,
          estimatedUtilities: rent > 0 ? Math.round(rent * 0.15) : 0,
          securityDeposit: rent > 0 ? rent * 2 : 0,
        },
        unitCount: listingUnits.length,
        availableUnitCount: availableUnits.length,
        media: listing.media ?? [],
      };
    }),
  };

  res.status(200).json({ data: facilityResponse });
};

export const routeUpdateFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const updateData = UpdateFacilityRequestBodySchema.parse(req.body);
  res.status(200).json({ data: await updateFacility(facilityId, updateData, res.locals.filters) });
};

// DELETE /facilities/:facilityId: routeDeleteFacility
export const routeDeleteFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  await deleteFacility(facilityId);
  res.sendStatus(204);
};

// DELETE /facilities/:facilityId/managers/:managerId: routeRemoveManager
export const routeRemoveManager: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const managerId = ObjectIdSchema.parse(req.params.managerId);
  await removeManagerFromFacility(facilityId, managerId);
  res.sendStatus(204);
};

// PATCH /facilities/:facilityId/managers/:managerId: routeUpdateManagerPermissions
export const routeUpdateManagerPermissions: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const managerId = ObjectIdSchema.parse(req.params.managerId);
  const body = UpdateManagerPermissionsRequestBodySchema.parse(req.body);
  await updateManagerPermissions(facilityId, managerId, body);
  res.sendStatus(204);
};

// POST /facilities/:facilityId/approve: routeApproveFacility
export const routeApproveFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const approvedFacility = await approveFacility(facilityId, res.locals.filters ?? {});
  res.status(200).json({ data: approvedFacility });
};

// POST /facilities/:facilityId/reject: routeRejectFacility
//
// Fix 4: Was incorrectly calling approveFacility — now correctly calls rejectFacility.
// Fix 5: Renamed result variable from approvedFacility to rejectedFacility.
export const routeRejectFacility: RequestHandler = async (req, res, _next) => {
  const facilityId = ObjectIdSchema.parse(req.params.facilityId);
  const rejectedFacility = await rejectFacility(facilityId, res.locals.filters ?? {});
  res.status(200).json({ data: rejectedFacility });
};

// GET /api/facilities/landlord/monthly-income
//
// Returns the expected monthly income for the authenticated landlord.
// Sums the unit price of every active rental across all owned facilities.
export const routeGetMonthlyIncomeByLandlord: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const data = await getMonthlyIncomeByLandlord(req.user._id);
  res.status(200).json({ data });
};

// GET /api/facilities/landlord/overdue-tenants
//
// Returns all active tenants whose most recent billing is overdue,
// across all facilities owned by the authenticated landlord.
export const routeGetOverdueTenantsByLandlord: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const data = await getOverdueTenantsByLandlord(req.user._id);
  res.status(200).json({ data });
};

// GET /api/facilities/landlord/tenants
// Returns all tenants across all facilities owned by the landlord.
export const routeGetTenantsByLandlord: RequestHandler = async (req, res, _next) => {
  assert.ok(req.user);
  const data = await getTenantsByLandlord(req.user._id);
  res.status(200).json({ data });
};
