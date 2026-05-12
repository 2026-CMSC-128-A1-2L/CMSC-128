import type { CreateInviteManagerBody } from '../interface/invite';
import { api } from './axiosInstance';

export const InviteService = {
  async getInvites() {
    try {
      const response = await api.get('/api/invites');
      return response.data;
    } catch (error) {
      console.error('Error fetching invites:', error);
      throw error;
    }
  },

  async inviteManager(body: CreateInviteManagerBody) {
    try {
      const response = await api.post('/api/invites', body);
      return response.data;
    } catch (error) {
      console.error('Error inviting manager:', error);
      throw error;
    }
  },

  async acceptInvite(inviteId: string) {
    try {
      const response = await api.post(`/api/invites/${inviteId}/accept`, {});
      return response.data;
    } catch (error) {
      console.error('Error accepting invite:', error);
      throw error;
    }
  },

  async declineInvite(inviteId: string) {
    try {
      const response = await api.post(`/api/invites/${inviteId}/decline`, {});
      return response.data;
    } catch (error) {
      console.error('Error declining invite:', error);
      throw error;
    }
  },

  async getInvite(inviteId: string) {
    try {
      const response = await api.get(`/api/invites/${inviteId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching invite:', error);
      throw error;
    }
  },

  async deleteInvite(inviteId: string) {
    try {
      const response = await api.delete(`/api/invites/${inviteId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting invite:', error);
      throw error;
    }
  },
};
