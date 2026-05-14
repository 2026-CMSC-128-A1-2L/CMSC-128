import type z from 'zod';
import type { GetUnitsRequestQuerySchema } from 'shared';
import type { CreateUnitBody, GetUnitsRequestQuery, UpdateUnitBody } from '../interface/unit';
import { api } from './axiosInstance';

export const UnitService = {
  async createUnit(listingId: string, body: CreateUnitBody) {
    try {
      const response = await api.post(`/api/listings/${listingId}/units`, body);
      return response.data;
    } catch (error) {
      console.error('Error creating unit:', error);
      throw error;
    }
  },

  async getUnits(
    params: z.infer<typeof GetUnitsRequestQuerySchema>,
  ): Promise<GetUnitsRequestQuery> {
    try {
      const response = await api.get<GetUnitsRequestQuery>('/api/units', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch units: ', error);
      throw error;
    }
  },

  async getUnit(unitId: string) {
    try {
      const response = await api.get(`/api/units/${unitId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch unit: ', error);
      throw error;
    }
  },

  async updateUnit(unitId: string, body: UpdateUnitBody) {
    try {
      const response = await api.patch(`/api/units/${unitId}`, body);
      return response.data;
    } catch (error) {
      console.error('Failed to update unit: ', error);
      throw error;
    }
  },

  async deleteUnit(unitId: string) {
    try {
      const response = await api.delete(`/api/units/${unitId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete unit: ', error);
      throw error;
    }
  },

  async getUnitsByListing(listingId: string) {
    try {
      const response = await api.get(`/api/listings/${listingId}/units`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch listing units: ', error);
      throw error;
    }
  },

  async getUnitRentals(unitId: string) {
    try {
      const response = await api.get(`/api/units/${unitId}/rentals`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch unit rentals: ', error);
      throw error;
    }
  },

  async getUnitBillings(unitId: string) {
    try {
      const response = await api.get(`/api/units/${unitId}/billings`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch unit billings: ', error);
      throw error;
    }
  },
};
