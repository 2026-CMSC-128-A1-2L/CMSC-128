import axios from 'axios';
import z from 'zod';
import { GetCalendarQuerySchema } from 'shared';
import type { GetCalendarQuery } from '../interface/calendar';
import { API_URL } from './constant';

export const CalendarService = {

  async getCalendar(params: z.infer<typeof GetCalendarQuerySchema>): Promise<GetCalendarQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();
      const response = await axios.get<GetCalendarQuery>(
        `${API_URL}/api/calendar?q=${kv}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar:', error);
      throw error;
    }
  },

  async getUpcomingEvents() {
    try {
      const response = await axios.get(
        `${API_URL}/api/calendar/upcoming`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  },
};
