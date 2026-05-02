import axios from 'axios';
import type { Profile } from '../interface/profile';
import { API_URL } from './constant';

export const ProfileService = {
  async getProfile(userId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/profiles/${userId}`,
        {
          //headers
        },
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile: ", error)
      throw error
    }
  },


}
