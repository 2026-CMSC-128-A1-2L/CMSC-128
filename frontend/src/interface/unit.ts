import type z from 'zod';
import {
  UnitFilterSchema,
  GetUnitsRequestQuerySchema,
  CreateUnitBodySchema,
  UpdateUnitBodySchema,
} from 'shared';

export type UnitFilter = z.infer<typeof UnitFilterSchema>;
export type GetUnitsRequestQuery = z.infer<typeof GetUnitsRequestQuerySchema>;
export type CreateUnitBody = z.infer<typeof CreateUnitBodySchema>;
export type UpdateUnitBody = z.infer<typeof UpdateUnitBodySchema>;
