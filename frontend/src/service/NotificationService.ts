import axios from 'axios';
import type z from 'zod';
import type { GetNotificationQuerySchema } from 'shared';
import type { GetNotificationsResponse } from '../interface/notification';
import { API_URL } from './constant';

export const NotificationService = {
  async getNotifications(
    params: z.infer<typeof GetNotificationQuerySchema>,
  ): Promise<GetNotificationsResponse> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();

      const response = await axios.get<GetNotificationsResponse>(
        `${API_URL}/api/notifications?q=${kv}`,
        {},
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  },

  async getNotification(notificationId: string) {
    try {
      const response = await axios.get<GetNotificationsResponse>(
        `${API_URL}/api/notifications/${notificationId}`,
        {},
      );

      return response.data;
    } catch (error) {
      console.error('Failed to read notification:', error);
      throw error;
    }
  },

  async readNotification(notificationId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/notifications/${notificationId}/read`,
        {
          //types na ipopost sa db?
        },
        {
          //headers
        },
      );

      return response.data;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  },
};
