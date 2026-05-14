import type { Profile } from '../interface/profile';
import { api } from './axiosInstance';

export const ProfileService = {
  async getProfile(userId: string): Promise<{ data: Profile }> {
    try {
      const response = await api.get<{ data: Profile }>(`/api/profiles/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch profile: ', error);
      throw error;
    }
  },
};
