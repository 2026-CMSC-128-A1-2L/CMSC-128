import axios from 'axios';
import z from 'zod';
import { UpdateRentalBody, RentalFilter, GetRentalsQuery, RentalParams, MoveInBody, MoveOutBody } from '../interface/rental';
import { GetRentalsQuerySchema } from 'shared';
import { API_URL } from './constant'

export const RentalService = {

  //FOREIGN -> Unit Router
  async getRentalByUnit(unitId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/units/${unitId}/rentals`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching rental:', error);
      throw error;
    }
  },

  //FOREIGN -> Lisitng Router
  async getRentalByListing(listingId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/listings/${listingId}/rentals`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching rental:', error);
      throw error;
    }
  },

  //FOREIGN -> User Router
  //GET RENTALS BY USER IS IN USER SERVICE




  async getRentals(params: z.infer<typeof GetRentalsQuerySchema>): Promise<GetRentalsQuery> {

    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params))
      }).toString();

      const response = await axios.get(
        `${API_URL}/api/rentals?q=${kv}`,
        {

        }
      );

      return response.data;

    } catch (error) {
      console.error("Error fetching rentals: ", error);
      throw error;
    }
  },

  async getRental(rentalId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/rentals/${rentalId}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching rental:', error);
      throw error;
    }
  },

  async updateRental(rentalId: string, body: UpdateRentalBody) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/rentals/${rentalId}`,
        {
          ...body
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating rental:', error);
      throw error;
    }
  },

  async moveIn(rentalId: string, body: MoveInBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/rentals/${rentalId}/move-in`,
        {
          ...body
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error moving in:', error);
      throw error;
    }
  },

  async moveOut(rentalId: string, body: MoveOutBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/rentals/${rentalId}/move-out`,
        {
          ...body
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error moving out:', error);
      throw error;
    }
  },



}

