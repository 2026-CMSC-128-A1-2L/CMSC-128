import z from 'zod';
import { ObjectIdSchema } from './common.js';

// GET /units
export const GetUnitBodySchema = z.object({
  roomNumber: z.number().optional(),
  capacity: z.number().optional(),
  currentOccupancy: z.number().int().min(0).optional(),
  price: z.number().optional(),
  location: z.string().optional(),
  isAvailable: z.boolean().optional(),
  listingId: ObjectIdSchema.optional(),
  landlordId: ObjectIdSchema.optional(),
  managerId: ObjectIdSchema.optional(),
});

// POST /units
export const CreateUnitBodySchema = z.object({
  roomNumber: z.number(),
  capacity: z.number().int().min(1),
  currentOccupancy: z.number().int().min(0),
  price: z.number().positive(),
  location: z.string().optional(),
  isAvailable: z.boolean(),
  listingId: ObjectIdSchema,
  landlordId: ObjectIdSchema,
  managerId: ObjectIdSchema.optional(),
});

// GET /units/:unitId
export const GetUnitByIdSchema = z.object({
  unitID: ObjectIdSchema
});

// GET /units/listing/:listingId
export const GetUnitByListingSchema = z.object({
  listingId: ObjectIdSchema
});
