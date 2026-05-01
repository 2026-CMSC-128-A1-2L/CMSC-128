import axios from 'axios';
import type {
  CreateFacilityBody,
  UpdateFacilityBody,
  UpdateManagerPermissionsBody,
  SearchFacilitiesBody,
  GetFacilitiesResponse,
  GetFacilityResponse,
  SearchFacilitiesResponse,
} from '../interface/facility';
import { API_URL } from './constant';

export const FacilityService = {
  async getFacilities() {
    try {
      const response = await axios.get<{ data: GetFacilitiesResponse }>(
        `${API_URL}/api/facilities`,
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
      const response = await axios.post<{ data: SearchFacilitiesResponse }>(
        `${API_URL}/api/facilities/search`,
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
      const response = await axios.post(
        `${API_URL}/api/facilities`,
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
      const response = await axios.patch(
        `${API_URL}/api/facilities/${facilityId}`,
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
      await axios.delete(`${API_URL}/api/facilities/${facilityId}`, {
        // headers
      });
    } catch (error) {
      console.error('Failed to delete facility:', error);
      throw error;
    }
  },

  async getFacility(facilityId: string) {
    try {
      const response = await axios.get<{ data: GetFacilityResponse }>(
        `${API_URL}/api/facilities/${facilityId}`,
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
      const response = await axios.get<{ data: number }>(
        `${API_URL}/api/facilities/landlord/monthly-income`,
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
      const response = await axios.get<{ data: unknown }>(
        `${API_URL}/api/facilities/landlord/overdue-tenants`,
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
      const response = await axios.patch(
        `${API_URL}/api/facilities/${facilityId}/managers/${managerId}`,
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
      await axios.delete(`${API_URL}/api/facilities/${facilityId}/managers/${managerId}`, {
        // headers
      });
    } catch (error) {
      console.error('Failed to remove manager:', error);
      throw error;
    }
  },

  async approveFacility(facilityId: string) {
    try {
      await axios.post(`/api/facilities/${facilityId}/approve`, {
        // headers
      });
    } catch (error) {
      console.error('Failed to approve facility:', error);
      throw error;
    }
  },

  async rejectFacility(facilityId: string) {
    try {
      await axios.post(`/api/facilities/${facilityId}/reject`, {
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
};
