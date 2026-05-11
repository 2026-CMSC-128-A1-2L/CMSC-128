import type z from 'zod';
import type { GetBookingsQuerySchema } from 'shared';
import type {
  CreateBookingBody,
  GetBookingsQuery,
  UpdateBookingStatusBody,
} from '../interface/booking';
import { api } from './axiosInstance';

export const BookingService = {
  async createBooking(body: CreateBookingBody) {
    try {
      const response = await api.post('/api/bookings', body);
      return response.data;
    } catch (error) {
      console.error('Error creating booking', error);
      throw error;
    }
  },

  async getBookings(params: z.infer<typeof GetBookingsQuerySchema>): Promise<GetBookingsQuery> {
    try {
      const response = await api.get<GetBookingsQuery>('/api/bookings', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      throw error;
    }
  },

  async getBooking(params: z.infer<typeof GetBookingsQuerySchema>): Promise<GetBookingsQuery> {
    return this.getBookings(params);
  },

  async updateBookingStatus(bookingId: string, body: UpdateBookingStatusBody) {
    try {
      const response = await api.patch(`/api/bookings/${bookingId}`, body);
      return response.data;
    } catch (error) {
      console.error('Failed to update booking:', error);
      throw error;
    }
  },

  async cancelBooking(bookingId: string) {
    try {
      const response = await api.delete(`/api/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete booking:', error);
      throw error;
    }
  },
};
