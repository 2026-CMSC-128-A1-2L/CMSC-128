import axios from 'axios';
import type { CreateReviewBody, UpdateReviewBody } from '../interface/review';
import { API_URL } from './constant';

export const ReviewService = {

  //FOREIGN -> Listing Router
  async getListingReviews(listingId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/listings/${listingId}/reviews`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching listing reviews:', error);
      throw error;
    }
  },

  //FOREIGN -> Listing Router
  async createReview(listingId: string, body: CreateReviewBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/listings/${listingId}/reviews`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },


  //FOREIGN -> Facility Router

  async getFacilityReviews(facilityId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/facilities/${facilityId}/reviews`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching facility reviews:', error);
      throw error;
    }
  },

  //FOREIGN -> Facility Router

  async getAverageRatingsByFacility(facilityId: string) {
    try {
      const response = await axios.get(
        `${API_URL}/api/facilities/${facilityId}/average-ratings`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching average ratings:', error);
      throw error;
    }
  },





  async getReviews() {
    try {
      const response = await axios.get(
        `${API_URL}/api/reviews`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  async updateReview(reviewId: string, body: UpdateReviewBody) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/reviews/${reviewId}`,
        {
          ...body,
        },
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  async approveReview(reviewId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/reviews/${reviewId}/approve`,
        {},
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error approving review:', error);
      throw error;
    }
  },

  async rejectReview(reviewId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/reviews/${reviewId}/reject`,
        {},
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error rejecting review:', error);
      throw error;
    }
  },

  async deleteReview(reviewId: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/api/reviews/${reviewId}`,
        {
          // headers
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },



};
