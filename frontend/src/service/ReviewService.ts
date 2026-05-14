import type { CreateReviewBody, UpdateReviewBody } from '../interface/review';
import { api } from './axiosInstance';

export const ReviewService = {
  async getListingReviews(listingId: string) {
    try {
      const response = await api.get(`/api/listings/${listingId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching listing reviews:', error);
      throw error;
    }
  },

  async createReview(listingId: string, body: CreateReviewBody) {
    try {
      const response = await api.post(`/api/listings/${listingId}/reviews`, body);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  async getFacilityReviews(facilityId: string) {
    try {
      const response = await api.get(`/api/facilities/${facilityId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching facility reviews:', error);
      throw error;
    }
  },

  async getAverageRatingsByFacility(facilityId: string) {
    try {
      const response = await api.get(`/api/facilities/${facilityId}/average-ratings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching average ratings:', error);
      throw error;
    }
  },

  async getReviews() {
    try {
      const response = await api.get('/api/reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  async updateReview(reviewId: string, body: UpdateReviewBody) {
    try {
      const response = await api.patch(`/api/reviews/${reviewId}`, body);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  async approveReview(reviewId: string) {
    try {
      const response = await api.post(`/api/reviews/${reviewId}/approve`, {});
      return response.data;
    } catch (error) {
      console.error('Error approving review:', error);
      throw error;
    }
  },

  async rejectReview(reviewId: string) {
    try {
      const response = await api.post(`/api/reviews/${reviewId}/reject`, {});
      return response.data;
    } catch (error) {
      console.error('Error rejecting review:', error);
      throw error;
    }
  },

  async deleteReview(reviewId: string) {
    try {
      const response = await api.delete(`/api/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },
};
