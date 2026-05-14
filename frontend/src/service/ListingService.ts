import axios from 'axios';
import z from 'zod';
import { GetListingsQuerySchema } from 'shared';
import type { GetListingsQuery, CreateListingBody, UpdateListingBody } from '../interface/listing';
import { API_URL } from './constant';

export const ListingService = {
  //FOREIGN -> Facility Routes
  async createListing(facilityId: string, body: CreateListingBody) {
    try {
      const response = await axios.post(
        `${API_URL}/api/facilities/${facilityId}/listings`,
        {
          ...body,
        },
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },

  async getListings(params: z.infer<typeof GetListingsQuerySchema>): Promise<GetListingsQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();
      const response = await axios.get<GetListingsQuery>(`${API_URL}/api/listings?q=${kv}`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  },

  async getListing(listingId: string) {
    try {
      const response = await axios.get(`${API_URL}/api/listings/${listingId}`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw error;
    }
  },

  async updateListing(listingId: string, body: UpdateListingBody) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/listings/${listingId}`,
        {
          ...body,
        },
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },

  async deleteListing(listingId: string) {
    try {
      await axios.delete(`${API_URL}/api/listings/${listingId}`, {
        // headers
      });
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  },

  async updateListingTags(listingId: string, body: UpdateListingTagsBody) {
    try {
      const response = await axios.patch(
        `${API_URL}/api/listings/${listingId}/tags`,
        {
          ...body,
        },
        {
          // headers
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error updating listing tags:', error);
      throw error;
    }
  },

  async getListingsByFacility(facilityId: string) {
    try {
      const response = await axios.get(`${API_URL}/api/facilities/${facilityId}/listings`, {
        // headers
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching listings by facility:', error);
      throw error;
    }
  },

  //GET Units by Listing -> UnitService
  //POST CREATE Units -> UnitService
  //GET Applications by listing -> ApplicationService
  // GET Rentals By Listing -> RentalService
  // GET Listing Reviews -> ReviewService
  // POST Create Review -> ReviewService
  // POST Report Listing -> ReportService
  async getListingUnits(listingId: string) {
    try {
      const response = await api.get(`/api/listings/${listingId}/units`);
      return response.data;
    } catch (error) {
      console.error('Error fetching listing units:', error);
      throw error;
    }
  },
};
