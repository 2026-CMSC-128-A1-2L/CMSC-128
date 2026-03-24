import z from 'zod';
import { ObjectIdSchema, QuerySchema } from './common.js';

// GET /units
export const GetUnitsQuerySchema = QuerySchema;

export const UnitFilterSchema = z.object({
  roomNumber: z.number().optional(),
  capacity: z.number().optional(),
  currentOccupancy: z.number().optional(),
  price: z.number().optional(),
  location: z.string().optional(),
  isAvailable: z.boolean().optional(),
  listingID: ObjectIdSchema.optional(),
  landlordID: ObjectIdSchema.optional(),
  managerID: ObjectIdSchema.optional(),
});

// POST /units
export const CreateUnitBodySchema = z.object({
  roomNumber: z.number(),
  capacity: z.number().int().min(1),
  currentOccupancy: z.number().int().min(0).optional(),
  price: z.number().positive(),
  location: z.string().optional(),
  isAvailable: z.boolean(),
  listingID: ObjectIdSchema,
});

// PATCH /units/:unitId
export const UpdateUnitBodySchema = z.object({
  roomNumber: z.number().optional(),
  capacity: z.number().int().min(1).optional(),
  currentOccupancy: z.number().int().min(0).optional(),
  price: z.number().positive().optional(),
  location: z.string().optional(),
  isAvailable: z.boolean().optional(),
});
