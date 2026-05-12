import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';

// GET /units
export const UnitFilterSchema = z.object({
  facilityId: ObjectIdSchema.optional(),
  listingId: ObjectIdSchema.optional(),
  roomNumber: z.string().optional(),
  price: z.number().optional(),
  location: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

export const GetUnitsRequestQuerySchema = QuerySchema(UnitFilterSchema);

// POST /units
export const CreateUnitBodySchema = z.object({
  roomNumber: z.string(),
  capacity: z.number().int().min(1),
  currentOccupancy: z.number().int().min(0).optional(),
  price: z.number().positive(),
  location: z.string().optional(),
  isAvailable: z.boolean(),
  listingId: ObjectIdSchema,
});

// PATCH /units/:unitId
export const UpdateUnitBodySchema = z.object({
  roomNumber: z.string().optional(),
  capacity: z.number().int().min(1).optional(),
  currentOccupancy: z.number().int().min(0).optional(),
  price: z.number().positive().optional(),
  location: z.string().optional(),
  isAvailable: z.boolean().optional(),
});
