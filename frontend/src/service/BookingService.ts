import axios from 'axios';
import z from 'zod';
import type { GetBookingsQuery } from '../interface/booking'
import { GetBookingsQuerySchema } from 'shared';
import { API_URL } from './constant';


export const BookingService = {
  async createBooking(facilityId: string, startDate: Date, endDate: Date, message: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/bookings/`,
        {
          facilityId, startDate, endDate, message
        },
        {
          //headers
        }
      );
      return response.data();
    } catch (error) {
      console.error("Error creating booking", error);
      throw (error);

    }
  },

  async getBooking(params: z.infer<typeof GetBookingsQuerySchema>): Promise<GetBookingsQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();

      const response = await axios.get<GetBookingsQuery>(
        `${API_URL}/api/bookings?q=${kv}`,
        {

        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      throw error;
    }
  },

  async updateBooking(bookingId: string) {
    try {
      const response = await axios.patch(
        `${API_URL}/bookings/${bookingId}`,
        {

        },
        {
          //headers
        }

      );

      return response.data()
    } catch (error) {
      console.error("Failed to update booking:", error);
      throw error
    }
  },

  async cancelBooking(bookingId: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/bookings/${bookingId}`,

        {
          //headers
        }

      );

      return response.data()
    } catch (error) {
      console.error("Failed to delete booking:", error);
      throw error
    }
  },




}
