import type z from 'zod';
import type { GetApplicationsQuerySchema } from 'shared';
import type {
  ApproveApplicationRequestBody,
  AssignUnitRequestBody,
  CreateApplicationBody,
  GetApplicationsQuery,
} from '../interface/application';
import { api } from './axiosInstance';

export const ApplicationService = {
  async getApplications(
    params: z.infer<typeof GetApplicationsQuerySchema>,
  ): Promise<GetApplicationsQuery> {
    try {
      const response = await api.get<GetApplicationsQuery>('/api/applications', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  async createApplication(body: CreateApplicationBody) {
    try {
      const response = await api.post('/api/applications', body);
      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  async getApplication(applicationId: string) {
    try {
      const response = await api.get(`/api/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  async deleteApplication(applicationId: string) {
    try {
      await api.delete(`/api/applications/${applicationId}`);
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  },

  async approveApplication(applicationId: string, body: ApproveApplicationRequestBody) {
    try {
      const response = await api.post(`/api/applications/${applicationId}/approve`, body);
      return response.data;
    } catch (error) {
      console.error('Error approving application:', error);
      throw error;
    }
  },

  async rejectApplication(applicationId: string) {
    try {
      const response = await api.post(`/api/applications/${applicationId}/reject`, {});
      return response.data;
    } catch (error) {
      console.error('Error rejecting application:', error);
      throw error;
    }
  },

  async assignUnit(applicationId: string, body: AssignUnitRequestBody) {
    try {
      const response = await api.post(`/api/applications/${applicationId}/assign-unit`, body);
      return response.data;
    } catch (error) {
      console.error('Error assigning unit:', error);
      throw error;
    }
  },

  async finalizeApplication(applicationId: string) {
    try {
      const response = await api.post(`/api/applications/${applicationId}/finalize`, {});
      return response.data;
    } catch (error) {
      console.error('Error finalizing application:', error);
      throw error;
    }
  },

  async getApplicationsByListing(listingId: string) {
    try {
      const response = await api.get(`/api/listings/${listingId}/applications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching listing applications:', error);
      throw error;
    }
  },
};
