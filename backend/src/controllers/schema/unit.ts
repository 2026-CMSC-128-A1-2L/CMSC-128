import z from 'zod';
import { ObjectIdSchema } from './common.js';

export const GetUnitsQuerySchema = z.object({
  roomNumber: z.coerce.number().optional(), // coerce because query strings are always text
  capacity: z.coerce.number().optional(),
  currentOccupancy: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  floorNumber: z.coerce.number().optional(),
  status: z.enum(['available', 'unavailable']).optional(),
  listingID: ObjectIdSchema.optional(),
  landlordID: ObjectIdSchema.optional(),
  managerID: ObjectIdSchema.optional(),
});

export const CreateUnitBodySchema = z.object({
  roomNumber: z.number(),
  capacity: z.number().int().min(1),
  currentOccupancy: z.number().int().min(0).optional(),
  price: z.number().positive(),
  floorNumber: z.number().optional(),
  status: z.enum(['available', 'unavailable']),
  listingID: ObjectIdSchema,
  // landlordID and managerID nde kasama rito — set from req.user in the controller
});

export const UpdateUnitBodySchema = z.object({
  roomNumber: z.number().optional(),
  capacity: z.number().int().min(1).optional(),
  currentOccupancy: z.number().int().min(0).optional(),
  price: z.number().positive().optional(),
  floorNumber: z.number().optional(),
  status: z.enum(['available', 'unavailable']).optional(),
});