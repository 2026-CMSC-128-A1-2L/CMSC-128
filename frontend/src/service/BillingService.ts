import axios from 'axios';
import z from 'zod';
import { GetBillingsQuerySchema } from 'shared';
import type { GetBillingsQuery, CreateBillingBody, UpdateBillingRequestBody, UpdateBillingPaymentRequestBody, SubmitBillingPaymentArguments, VerifyBillingRequestBody } from '../interface/billing';
import { API_URL } from './constant';

export const BillingService = {

  //FOREIGN -> Landlord Router
  async getLandlordSummary() {
    try {
      const response = await axios.get(
        `${API_URL}/api/billings/landlord/summary`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching landlord billing summary:', error);
      throw error;
    }
  },

  //FOREGIN -> Facility Router

  async getFacilitySummary(facilityId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/billings/facility/${facilityId}/summary`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching facility billing summary:', error);
      throw error;
    }
  },


  //FOREIGN -> User Router

  async getUserBillingDashboard(userId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/billings/users/${userId}/dashboard`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user billing dashboard:', error);
      throw error;
    }
  },




  async getBillings(params: z.infer<typeof GetBillingsQuerySchema>): Promise<GetBillingsQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();
      const response = await axios.get<GetBillingsQuery>(
        `${API_URL}/api/billings?q=${kv}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching billings:', error);
      throw error;
    }
  },

  async createBilling(body: CreateBillingBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/billings`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating billing:', error);
      throw error;
    }
  },


  async getBilling(billingId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/billings/${billingId}`,
        {
          // headers
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching billing:', error);
      throw error;
    }
  },

  async updateBilling(billingId: string, body: UpdateBillingRequestBody) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/billings/${billingId}`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating billing:', error);
      throw error;
    }
  },

  async updateBillingPayment(billingId: string, body: UpdateBillingPaymentRequestBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/billings/${billingId}/verify`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error verifying billing payment:', error);
      throw error;
    }
  },



  async submitBillingPayment(billingId: string, body: SubmitBillingPaymentArguments) {
    try {
      const response = await axios.post(
        `${API_URL}/api/billings/${billingId}/submit-payment`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting billing payment:', error);
      throw error;
    }
  },

};
