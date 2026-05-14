import type z from 'zod';
import type { GetUsersQuerySchema } from 'shared';
import type {
  ApproveUserRequestBody,
  OnboardSelfRequestBody,
  SubmitVerificationRequestBody,
  UpdateManagerRequestBody,
  UpdateStudentRequestBody,
} from '../interface/user';
import { api } from './axiosInstance';

type GetUsersResponse<TUser = unknown> = {
  data: TUser[];
};

export const UserService = {
  async getUsers<TUser = unknown>(
    params: z.infer<typeof GetUsersQuerySchema>,
  ): Promise<GetUsersResponse<TUser>> {
    try {
      const response = await api.get<GetUsersResponse<TUser>>('/api/users', {
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
      const response = await api.delete(`/api/users/${userId}`);
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
      const response = await api.get('/api/users/me/reports');
      return response.data;
    } catch (error) {
      console.error('Error fetching my reports:', error);
      throw error;
    }
  },

  async getMyApplications() {
    try {
      const response = await api.get('/api/users/me/applications');
      return response.data;
    } catch (error) {
      console.error('Error fetching my applications:', error);
      throw error;
    }
  },

  async getMyRentals() {
    try {
      const response = await api.get('/api/users/me/rentals');
      return response.data;
    } catch (error) {
      console.error('Error fetching my rentals:', error);
      throw error;
    }
  },

  async getMyBillings() {
    try {
      const response = await api.get('/api/users/me/billings');
      return response.data;
    } catch (error) {
      console.error('Error fetching my billings:', error);
      throw error;
    }
  },

  async getMyBookings() {
    try {
      const response = await api.get('/api/users/me/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      throw error;
    }
  },
};
