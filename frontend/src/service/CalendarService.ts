import axios from "axios";
import { API_URL } from "./constant";

export type CalendarEvent = {
  type: "booking" | "billing" | "move-in" | "move-out";
  date: string;
  title: string;
  referenceId: string;
};

export type GetCalendarResponse = {
  data: CalendarEvent[];
};

export const CalendarService = {
  async getCalendarEvents(
    year: number,
    month: number
  ): Promise<GetCalendarResponse> {
    try {
      const response = await axios.get<GetCalendarResponse>(
        `${API_URL}/api/calendar?year=${year}&month=${month}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch calendar events:", error);
      throw error;
    }
  },

  async getUpcomingEvents(): Promise<GetCalendarResponse> {
    try {
      const response = await axios.get<GetCalendarResponse>(
        `${API_URL}/api/calendar/upcoming`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch upcoming events:", error);
      throw error;
    }
  },
};
