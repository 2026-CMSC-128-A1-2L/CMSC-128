import type z from 'zod';
import type { GetBillingsQuerySchema } from 'shared';
import type {
  CreateBillingBody,
  GetBillingsQuery,
  SubmitBillingPaymentArguments,
  UpdateBillingPaymentRequestBody,
  UpdateBillingRequestBody,
} from '../interface/billing';
import { api } from './axiosInstance';
import DownloadBillings from '../components/user/finance/DownloadBillings';
import { ur } from 'zod/v4/locales';

export const BillingService = {
  async getLandlordSummary() {
    try {
      const response = await api.get('/api/billings/landlord/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching landlord billing summary:', error);
      throw error;
    }
  },

  async getFacilitySummary(facilityId: string) {
    try {
      const response = await api.get(`/api/billings/facility/${facilityId}/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching facility billing summary:', error);
      throw error;
    }
  },

  async getUserBillingDashboard(userId: string) {
    try {
      const response = await api.get(`/api/billings/users/${userId}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user billing dashboard:', error);
      throw error;
    }
  },

  async getBillings(params: z.infer<typeof GetBillingsQuerySchema>): Promise<GetBillingsQuery> {
    try {
      const response = await api.get<GetBillingsQuery>('/api/billings', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching billings:', error);
      throw error;
    }
  },

  async createBilling(body: CreateBillingBody) {
    try {
      const response = await api.post('/api/billings', body);
      return response.data;
    } catch (error) {
      console.error('Error creating billing:', error);
      throw error;
    }
  },

  async getBilling(billingId: string) {
    try {
      const response = await api.get(`/api/billings/${billingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching billing:', error);
      throw error;
    }
  },

  async updateBilling(billingId: string, body: UpdateBillingRequestBody) {
    try {
      const response = await api.patch(`/api/billings/${billingId}`, body);
      return response.data;
    } catch (error) {
      console.error('Error updating billing:', error);
      throw error;
    }
  },

  async updateBillingPayment(billingId: string, body: UpdateBillingPaymentRequestBody) {
    try {
      const response = await api.post(`/api/billings/${billingId}/verify`, body);
      return response.data;
    } catch (error) {
      console.error('Error verifying billing payment:', error);
      throw error;
    }
  },

  async submitBillingPayment(billingId: string, body: SubmitBillingPaymentArguments) {
    try {
      const response = await api.post(`/api/billings/${billingId}/submit-payment`, body);
      return response.data;
    } catch (error) {
      console.error('Error submitting billing payment:', error);
      throw error;
    }
  },

  async getUnitBillings(unitId: string) {
    try {
      const response = await api.get(`/api/units/${unitId}/billings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching unit billings:', error);
      throw error;
    }
  },

  async downloadBilling(userId: string) {
    try {
      const response = await api.get(`/api/billings/download/${userId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;

      const contentDisposition = response.headers['content-disposition'];
      let fileName = `billing_${userId}.pdf`;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch?.[1]) fileName = fileNameMatch[1];
      }

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);

      return response.data;
    } catch (error) {
      console.error('Error downloading billing PDF:', error);
      throw error;
    }
  },
};
