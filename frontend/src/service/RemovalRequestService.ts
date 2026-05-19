import { api } from './axiosInstance';

export type RemovalRequestData = {
  _id: string;
  landlordId: {
    _id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    emails?: string[];
  } | string;
  tenantDisplayName?: string;
  tenantEmail?: string;
  facilityName?: string;
  reasons: {
    backedOut: boolean;
    noDocuments: boolean;
    other: boolean;
    otherReason?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
};

export type CreateRemovalRequestBody = {
  tenantId?: string;
  tenantDisplayName: string;
  tenantEmail: string;
  facilityName: string;
  reasons: {
    backedOut: boolean;
    noDocuments: boolean;
    other: boolean;
    otherReason?: string;
  };
};

export const RemovalRequestService = {
  async createRequest(body: CreateRemovalRequestBody) {
    try {
      const response = await api.post('/api/removal-requests', body);
      return response.data;
    } catch (error) {
      console.error('Error creating removal request:', error);
      throw error;
    }
  },

  async getRequests() {
    try {
      const response = await api.get('/api/removal-requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching removal requests:', error);
      throw error;
    }
  },

  async approveRequest(requestId: string) {
    try {
      const response = await api.post(`/api/removal-requests/${requestId}/approve`);
      return response.data;
    } catch (error) {
      console.error('Error approving removal request:', error);
      throw error;
    }
  },

  async rejectRequest(requestId: string) {
    try {
      const response = await api.post(`/api/removal-requests/${requestId}/reject`);
      return response.data;
    } catch (error) {
      console.error('Error rejecting removal request:', error);
      throw error;
    }
  },
};
