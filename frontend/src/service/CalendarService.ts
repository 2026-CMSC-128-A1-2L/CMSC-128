import type z from 'zod';
import type { GetCalendarQuerySchema } from 'shared';
import type { GetCalendarQuery } from '../interface/calendar';
import { api } from './axiosInstance';

export type CalendarEvent = {
  type: 'booking' | 'billing' | 'move-in' | 'move-out';
  date: string;
  title: string;
  referenceId: string;
};

type CalendarResponse = {
  data: CalendarEvent[];
};

export const CalendarService = {
  async getCalendar(params: z.infer<typeof GetCalendarQuerySchema>): Promise<CalendarResponse> {
    try {
      const response = await api.get<CalendarResponse>('/api/calendar', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar:', error);
      throw error;
    }
  },

  async getCalendarEvents(year: number, month: number): Promise<CalendarResponse> {
    return this.getCalendar({ year, month } as GetCalendarQuery);
  },

  async getUpcomingEvents(): Promise<CalendarResponse> {
    try {
      const response = await api.get<CalendarResponse>('/api/calendar/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  },
};
