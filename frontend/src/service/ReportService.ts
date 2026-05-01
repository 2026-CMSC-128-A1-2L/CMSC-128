import axios from 'axios';
import type { ResolveReportBody, ReportListingBody, ReportUserBody } from '../interface/report';
import { API_URL } from './constant';

export const ReportService = {

  //FOREIGN -> UserService
  async getMyReports() {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/me/reports`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching my reports:', error);
      throw error;
    }
  },

  //FOREIGN -> UserService
  async reportUser(userId: string, body: ReportUserBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/${userId}/reports`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error reporting user:', error);
      throw error;
    }
  },


  //FOREIGN -> ListingService
  async reportListing(listingId: string, body: ReportListingBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/listings/${listingId}/reports`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error reporting listing:', error);
      throw error;
    }
  },



  async getReports() {
    try {
      const response = await axios.get(
        `${API_URL}/api/reports`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  async getReport(reportId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/reports/${reportId}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  },

  async resolveReport(reportId: string, body: ResolveReportBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/reports/${reportId}/resolve`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error resolving report:', error);
      throw error;
    }
  },


};
