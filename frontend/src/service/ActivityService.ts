import { api } from './axiosInstance';

export const ActivityService = {
  async getActivities() {
    try {
      const response = await api.get('/api/activities');
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },
};
