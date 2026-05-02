// service/user.ts
import axios from 'axios';
import z from 'zod';
import { GetUsersQuerySchema } from 'shared';
import type { GetUsersQuery, UpdateStudentRequestBody, UpdateManagerRequestBody, OnboardSelfRequestBody, ApproveUserRequestBody, UserFilter } from '../interface/user';
import { API_URL } from './constant';

export const UserService = {

  async getUsers(params: z.infer<typeof GetUsersQuerySchema>): Promise<GetUsersQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();
      const response = await axios.get<GetUsersQuery>(
        `${API_URL}/api/users?q=${kv}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getSelf() {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/me`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching self:', error);
      throw error;
    }
  },

  async getUser(userId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/${userId}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async updateSelf(body: UpdateStudentRequestBody | UpdateManagerRequestBody) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/users/me`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating self:', error);
      throw error;
    }
  },

  async deleteSelf() {
    try {
      const response = await axios.delete(
        `${API_URL}/api/users/me`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting self:', error);
      throw error;
    }
  },


  async onboardSelf(body: OnboardSelfRequestBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/me/onboard`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error onboarding self:', error);
      throw error;
    }
  },


  async deleteUser(userId: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/api/users/${userId}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async approveUser(userId: string, body: ApproveUserRequestBody) {
    try {
      await axios.post(
        `${API_URL}/api/users/${userId}/approve`,
        {
          ...body,
        },
        {
          // headers
        }
      );
    } catch (error) {
      console.error('Error approving user:', error);
      throw error;
    }
  },

  async rejectUser(userId: string) {
    try {
      await axios.post(
        `${API_URL}/api/users/${userId}/reject`,
        {},
        {
          // headers
        }
      );
    } catch (error) {
      console.error('Error rejecting user:', error);
      throw error;
    }
  },

  async getMyReports() {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/me/reports`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching my reports:', error);
      throw error;
    }
  },


  async getMyApplications() {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/me/applications`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching my applications:', error);
      throw error;
    }
  },

  async getMyRentals() {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/me/rentals`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching my rentals:', error);
      throw error;
    }
  },

  async getMyBillings() {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/me/billings`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching my billings:', error);
      throw error;
    }
  },

  async getMyBookings() {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/me/bookings`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      throw error;
    }
  },
};
