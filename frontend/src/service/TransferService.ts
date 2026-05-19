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

  async getManagedTransferRequests(params: { status?: string } = {}) {
    try {
      const response = await api.get('/api/transfers/managed', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching managed transfer requests:', error);
      throw error;
    }
  },

  async getManagedTransferRequest(transferId: string) {
    try {
      const response = await api.get(`/api/transfers/managed/${transferId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching managed transfer request:', error);
      throw error;
    }
  },

  async getPasaloListings() {
    try {
      const response = await api.get('/api/transfers/pasalo');
      return response.data;
    } catch (error) {
      console.error('Error fetching pasalo listings:', error);
      throw error;
    }
  },

  async getPasaloTransfer(transferId: string) {
    try {
      const response = await api.get(`/api/transfers/pasalo/${transferId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pasalo transfer:', error);
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
