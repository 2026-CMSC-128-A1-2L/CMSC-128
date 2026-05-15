import type { GetBookingsQuery, CreateBookingBody } from '../interface/booking';
import { api } from './axiosInstance';

export type VisitSlotAvailability = {
  startDate: string;
  endDate: string;
  available: boolean;
};

export const BookingService = {
  async createBooking(body: CreateBookingBody) {
    try {
      const response = await api.post('/api/bookings/', {
        ...body,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking', error);
      throw error;
    }
  },

  async getBookings(params: GetBookingsQuery): Promise<GetBookingsQuery> {
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

  async getAvailableVisitSlots(facilityId: string, date: string) {
    try {
      const response = await api.get<{ data: VisitSlotAvailability[] }>(
        `/api/bookings/facilities/${facilityId}/available-slots`,
        { params: { date } },
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch available visit slots:', error);
      throw error;
    }
  },

  async updateBookingStatus(bookingId: string) {
    try {
      const response = await api.patch(`/api/bookings/${bookingId}`, {});

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
