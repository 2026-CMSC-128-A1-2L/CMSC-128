import type { CreateTransferBody } from '../interface/transfer';
import { api } from './axiosInstance';

export const TransferService = {
  async getTransferRequests() {
    try {
      const response = await api.get('/api/transfers');
      return response.data;
    } catch (error) {
      console.error('Error fetching transfer requests:', error);
      throw error;
    }
  },

  async createTransferRequest(body: CreateTransferBody) {
    try {
      const response = await api.post('/api/transfers', body);
      return response.data;
    } catch (error) {
      console.error('Error creating transfer request:', error);
      throw error;
    }
  },

  async approveTransferRequest(transferId: string) {
    try {
      const response = await api.post(`/api/transfers/${transferId}/approve`, {});
      return response.data;
    } catch (error) {
      console.error('Error approving transfer request:', error);
      throw error;
    }
  },

  async rejectTransferRequest(transferId: string) {
    try {
      const response = await api.post(`/api/transfers/${transferId}/reject`, {});
      return response.data;
    } catch (error) {
      console.error('Error rejecting transfer request:', error);
      throw error;
    }
  },

  async cancelTransferRequest(transferId: string) {
    try {
      const response = await api.delete(`/api/transfers/${transferId}`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling transfer request:', error);
      throw error;
    }
  },
};
