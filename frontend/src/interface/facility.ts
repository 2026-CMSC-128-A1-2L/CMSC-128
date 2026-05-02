import type z from 'zod';
import type {
  CreateFacilityRequestBodySchema,
  UpdateFacilityRequestBodySchema,
  UpdateManagerPermissionsRequestBodySchema,
  FacilityFilterSchema,
  SearchFacilitiesRequestBodySchema,
  GetFacilitiesResponseBodySchema,
  GetFacilityResponseBodySchema,
  CreateFacilityResponseBodySchema,
  SearchFacilitiesResponseBodySchema,
} from 'shared';


export type CreateFacilityBody = z.infer<typeof CreateFacilityRequestBodySchema>;
export type UpdateFacilityBody = z.infer<typeof UpdateFacilityRequestBodySchema>;
export type UpdateManagerPermissionsBody = z.infer<typeof UpdateManagerPermissionsRequestBodySchema>;
export type FacilityFilter = z.infer<typeof FacilityFilterSchema>;
export type SearchFacilitiesBody = z.infer<typeof SearchFacilitiesRequestBodySchema>;
export type GetFacilitiesResponse = z.infer<typeof GetFacilitiesResponseBodySchema>;
export type GetFacilityResponse = z.infer<typeof GetFacilityResponseBodySchema>;
export type CreateFacilityResponse = z.infer<typeof CreateFacilityResponseBodySchema>;
export type SearchFacilitiesResponse = z.infer<typeof SearchFacilitiesResponseBodySchema>;
