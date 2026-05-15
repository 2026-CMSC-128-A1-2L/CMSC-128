import { api } from './axiosInstance';
import type {
  CreateFacilityBody,
  UpdateFacilityBody,
  UpdateManagerPermissionsBody,
  SearchFacilitiesBody,
  GetFacilitiesResponse,
  GetFacilityResponse,
  SearchFacilitiesResponse,
} from '../interface/facility';

export const FacilityService = {
  async getFacilities() {
    try {
      const response = await api.get<{ data: GetFacilitiesResponse }>(
        `/api/facilities`,
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch facilities:', error);
      throw error;
    }
  },

  async searchFacilities(body: SearchFacilitiesBody) {
    try {
      const response = await api.post<{ data: SearchFacilitiesResponse }>(
        `/api/facilities/search`,
        {
          ...body,
        },
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to search facilities:', error);
      throw error;
    }
  },

  async createFacility(body: CreateFacilityBody) {
    try {
      const response = await api.post(
        `/api/facilities`,
        {
          ...body,
        },
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create facility:', error);
      throw error;
    }
  },

  async updateFacility(facilityId: string, body: UpdateFacilityBody) {
    try {
      const response = await api.patch(
        `/api/facilities/${facilityId}`,
        {
          ...body,
        },
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update facility:', error);
      throw error;
    }
  },

  async deleteFacility(facilityId: string) {
    try {
      await api.delete(`/api/facilities/${facilityId}`, {
        // headers
      });
    } catch (error) {
      console.error('Failed to delete facility:', error);
      throw error;
    }
  },

  async getFacility(facilityId: string) {
    try {
      const response = await api.get<{ data: GetFacilityResponse }>(
        `/api/facilities/${facilityId}`,
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch facility:', error);
      throw error;
    }
  },

  async getMonthlyIncome() {
    try {
      const response = await api.get<{ data: number }>(
        `/api/facilities/landlord/monthly-income`,
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch monthly income:', error);
      throw error;
    }
  },

  async getOverdueTenants() {
    try {
      const response = await api.get<{ data: unknown }>(
        `/api/facilities/landlord/overdue-tenants`,
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch overdue tenants:', error);
      throw error;
    }
  },

  async updateManagerPermissions(
    facilityId: string,
    managerId: string,
    body: UpdateManagerPermissionsBody,
  ) {
    try {
      const response = await api.patch(
        `/api/facilities/${facilityId}/managers/${managerId}`,
        {
          ...body,
        },
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update manager permissions:', error);
      throw error;
    }
  },

  async removeManager(facilityId: string, managerId: string) {
    try {
      await api.delete(`/api/facilities/${facilityId}/managers/${managerId}`, {
        // headers
      });
    } catch (error) {
      console.error('Failed to remove manager:', error);
      throw error;
    }
  },

  async approveFacility(facilityId: string) {
    try {
      await api.post(`/api/facilities/${facilityId}/approve`, {
        // headers
      });
    } catch (error) {
      console.error('Failed to approve facility:', error);
      throw error;
    }
  },

  async rejectFacility(facilityId: string) {
    try {
      await api.post(`/api/facilities/${facilityId}/reject`, {
        // headers
      });
    } catch (error) {
      console.error('Failed to reject facility:', error);
      throw error;
    }
  },

  //CREATE LISTING -> ListingService.ts
  //GET REVIEWS -> ReviewService.ts
  //GET RATINGS -> RatingService.ts
  async getFacilityBookings(facilityId: string) {
    try {
      const response = await api.get(`/api/facilities/${facilityId}/bookings`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch facility bookings:', error);
      throw error;
    }
  },
};
