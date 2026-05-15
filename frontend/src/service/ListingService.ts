import type {
  CreateListingBody,
  GetListingsQuery,
  UpdateListingBody,
  UpdateListingTagsBody,
} from '../interface/listing';
import { api } from './axiosInstance';

export const ListingService = {
  //FOREIGN -> Facility Routes
  async createListing(facilityId: string, body: CreateListingBody) {
    try {
      const response = await api.post(`/api/facilities/${facilityId}/listings`, {
        ...body,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },

  async getListings(params: GetListingsQuery): Promise<GetListingsQuery> {
    try {
      const response = await api.get<GetListingsQuery>('/api/listings', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  },

  async getListing(listingId: string) {
    try {
      const response = await api.get(`/api/listings/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw error;
    }
  },

  async updateListing(listingId: string, body: UpdateListingBody) {
    try {
      const response = await api.patch(`/api/listings/${listingId}`, {
        ...body,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },

  async deleteListing(listingId: string) {
    try {
      await api.delete(`/api/listings/${listingId}`);
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  },

  async updateListingTags(listingId: string, body: UpdateListingTagsBody) {
    try {
      const response = await api.patch(`/api/listings/${listingId}/tags`, {
        ...body,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating listing tags:', error);
      throw error;
    }
  },

  async getListingsByFacility(facilityId: string) {
    try {
      const response = await api.get(`/api/facilities/${facilityId}/listings`);
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
