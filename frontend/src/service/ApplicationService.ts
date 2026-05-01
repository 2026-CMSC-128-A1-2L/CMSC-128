import axios from 'axios';
import z from 'zod';
import { GetApplicationsQuerySchema } from 'shared';
import type { GetApplicationsQuery, CreateApplicationBody, ApproveApplicationRequestBody, AssignUnitRequestBody, ApplicationFilter } from '../interface/application';
import { API_URL } from './constant';

export const ApplicationService = {



  async getApplications(params: z.infer<typeof GetApplicationsQuerySchema>): Promise<GetApplicationsQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();
      const response = await axios.get<GetApplicationsQuery>(
        `${API_URL}/api/applications?q=${kv}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  async createApplication(body: CreateApplicationBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/applications`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },


  async getApplication(applicationId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/applications/${applicationId}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },


  async deleteApplication(applicationId: string) {
    try {
      await axios.delete(
        `${API_URL}/api/applications/${applicationId}`,
        {
          // headers
        }
      );
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  },

  async approveApplication(applicationId: string, body: ApproveApplicationRequestBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/applications/${applicationId}/approve`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error approving application:', error);
      throw error;
    }
  },

  async rejectApplication(applicationId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/applications/${applicationId}/reject`,
        {},
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error rejecting application:', error);
      throw error;
    }
  },

  async assignUnit(applicationId: string, body: AssignUnitRequestBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/applications/${applicationId}/assign-unit`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error assigning unit:', error);
      throw error;
    }
  },

  async finalizeApplication(applicationId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/applications/${applicationId}/finalize`,
        {},
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error finalizing application:', error);
      throw error;
    }
  },
};
