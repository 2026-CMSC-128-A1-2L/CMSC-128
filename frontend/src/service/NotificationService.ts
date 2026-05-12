import type z from 'zod';
import type { GetNotificationQuerySchema } from 'shared';
import type { GetNotificationsResponse } from '../interface/notification';
import { api } from './axiosInstance';

export const NotificationService = {
  async getNotifications(
    params: z.infer<typeof GetNotificationQuerySchema>,
  ): Promise<GetNotificationsResponse> {
    try {
      const response = await api.get<GetNotificationsResponse>('/api/notifications', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  },

  async getNotification(notificationId: string) {
    try {
      const response = await api.get(`/api/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to read notification:', error);
      throw error;
    }
  },

  async readNotification(notificationId: string) {
    try {
      const response = await api.post(`/api/notifications/${notificationId}/read`, {});
      return response.data;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  },
};
