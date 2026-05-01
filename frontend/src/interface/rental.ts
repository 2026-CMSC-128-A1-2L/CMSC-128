import { UpdateRentalBodySchema, RentalFilterSchema, GetRentalsQuerySchema, RentalParamsSchema, MoveInBodySchema, MoveOutBodySchema } from 'shared';
import type z from 'zod';

export type UpdateRentalBody = z.infer<typeof UpdateRentalBodySchema>;
export type RentalFilter = z.infer<typeof RentalFilterSchema>;
export type GetRentalsQuery = z.infer<typeof GetRentalsQuerySchema>;
export type RentalParams = z.infer<typeof RentalParamsSchema>;
export type MoveInBody = z.infer<typeof MoveInBodySchema>;
export type MoveOutBody = z.infer<typeof MoveOutBodySchema>;
