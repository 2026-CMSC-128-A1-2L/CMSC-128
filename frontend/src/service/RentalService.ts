import type z from 'zod';
import type { GetRentalsQuerySchema } from 'shared';
import type {
  GetRentalsQuery,
  MoveInBody,
  MoveOutBody,
  UpdateRentalBody,
} from '../interface/rental';
import { api } from './axiosInstance';

export const RentalService = {
  async getRentalByUnit(unitId: string) {
    try {
      const response = await api.get(`/api/units/${unitId}/rentals`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rental:', error);
      throw error;
    }
  },

  async getRentalByListing(listingId: string) {
    try {
      const response = await api.get(`/api/listings/${listingId}/rentals`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rental:', error);
      throw error;
    }
  },

  async getRentals(params: z.infer<typeof GetRentalsQuerySchema>): Promise<GetRentalsQuery> {
    try {
      const response = await api.get<GetRentalsQuery>('/api/rentals', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching rentals: ', error);
      throw error;
    }
  },

  async getRental(rentalId: string) {
    try {
      const response = await api.get(`/api/rentals/${rentalId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rental:', error);
      throw error;
    }
  },

  async updateRental(rentalId: string, body: UpdateRentalBody) {
    try {
      const response = await api.patch(`/api/rentals/${rentalId}`, body);
      return response.data;
    } catch (error) {
      console.error('Error updating rental:', error);
      throw error;
    }
  },

  async moveIn(rentalId: string, body: MoveInBody) {
    try {
      const response = await api.post(`/api/rentals/${rentalId}/move-in`, body);
      return response.data;
    } catch (error) {
      console.error('Error moving in:', error);
      throw error;
    }
  },

  async moveOut(rentalId: string, body: MoveOutBody) {
    try {
      const response = await api.post(`/api/rentals/${rentalId}/move-out`, body);
      return response.data;
    } catch (error) {
      console.error('Error moving out:', error);
      throw error;
    }
  },
};
