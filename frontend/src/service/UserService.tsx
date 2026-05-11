// service/user.ts
import axios from 'axios';
import type z from 'zod';
import type { GetUsersQuerySchema } from 'shared';
import type {
  GetUsersQuery,
  UpdateStudentRequestBody,
  UpdateManagerRequestBody,
  OnboardSelfRequestBody,
  ApproveUserRequestBody,
  SubmitVerificationRequestBody,
} from '../interface/user';
import { API_URL } from './constant';
import { api } from './axiosInstance';

export const UserService = {
  async getUsers(params: z.infer<typeof GetUsersQuerySchema>): Promise<GetUsersQuery> {
    try {
      const response = await api.get<GetUsersQuery>('/api/users', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getSelf() {
    try {
      const response = await api.get('/api/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching self:', error);
      throw error;
    }
  },

  async getUser(userId: string) {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async updateSelf(body: UpdateStudentRequestBody | UpdateManagerRequestBody) {
    try {
      const response = await api.patch('/api/users/me', body);
      return response.data;
    } catch (error) {
      console.error('Error updating self:', error);
      throw error;
    }
  },

  async deleteSelf() {
    try {
      const response = await api.delete('/api/users/me');
      return response.data;
    } catch (error) {
      console.error('Error deleting self:', error);
      throw error;
    }
  },

  async onboardSelf(body: OnboardSelfRequestBody) {
    try {
      const response = await api.post('/api/users/me/onboard', body);
      return response.data;
    } catch (error) {
      console.error('Error onboarding self:', error);
      throw error;
    }
  },

  async submitVerification(body: SubmitVerificationRequestBody) {
    try {
      const response = await api.post('/api/users/me/verification', body);
      return response.data;
    } catch (error) {
      console.error('Error submitting verification:', error);
      throw error;
    }
  },

  async deleteUser(userId: string) {
    try {
      const response = await axios.delete(`${API_URL}/api/users/${userId}`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async approveUser(userId: string, body: ApproveUserRequestBody) {
    try {
      await api.post(`/api/users/${userId}/approve`, body ?? {});
    } catch (error) {
      console.error('Error approving user:', error);
      throw error;
    }
  },

  async rejectUser(userId: string) {
    try {
      await api.post(`/api/users/${userId}/reject`, {});
    } catch (error) {
      console.error('Error rejecting user:', error);
      throw error;
    }
  },

  async getMyReports() {
    try {
      const response = await axios.get(`${API_URL}/api/users/me/reports`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my reports:', error);
      throw error;
    }
  },

  async getMyApplications() {
    try {
      const response = await axios.get(`${API_URL}/api/users/me/applications`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my applications:', error);
      throw error;
    }
  },

  async getMyRentals() {
    try {
      const response = await axios.get(`${API_URL}/api/users/me/rentals`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my rentals:', error);
      throw error;
    }
  },

  async getMyBillings() {
    try {
      const response = await axios.get(`${API_URL}/api/users/me/billings`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my billings:', error);
      throw error;
    }
  },

  async getMyBookings() {
    try {
      const response = await axios.get(`${API_URL}/api/users/me/bookings`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      throw error;
    }
  },
};
