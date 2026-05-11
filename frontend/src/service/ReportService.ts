import type { ResolveReportBody, ReportListingBody, ReportUserBody } from '../interface/report';
import { api } from './axiosInstance';

export const ReportService = {
  async getMyReports() {
    try {
      const response = await api.get('/api/users/me/reports');
      return response.data;
    } catch (error) {
      console.error('Error fetching my reports:', error);
      throw error;
    }
  },

  async reportUser(userId: string, body: ReportUserBody) {
    try {
      const response = await api.post(`/api/users/${userId}/report`, body);
      return response.data;
    } catch (error) {
      console.error('Error reporting user:', error);
      throw error;
    }
  },

  async reportListing(listingId: string, body: ReportListingBody) {
    try {
      const response = await api.post(`/api/listings/${listingId}/report`, body);
      return response.data;
    } catch (error) {
      console.error('Error reporting listing:', error);
      throw error;
    }
  },

  async getReports() {
    try {
      const response = await api.get('/api/reports');
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  async getReport(reportId: string) {
    try {
      const response = await api.get(`/api/reports/${reportId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  },

  async resolveReport(reportId: string, body: ResolveReportBody) {
    try {
      const response = await api.post(`/api/reports/${reportId}/resolve`, body);
      return response.data;
    } catch (error) {
      console.error('Error resolving report:', error);
      throw error;
    }
  },
};
