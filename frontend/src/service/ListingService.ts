import axios from 'axios';
import z from 'zod';
import { GetListingsQuerySchema } from 'shared';
import type { TagFilter, Tag, ListingFilter, GetListingsQuery, CreateListingBody, UpdateListingBody, UpdateListingTagsResponseBody } from '../interface/listing';
import { API_URL } from './constant';

export const ListingService = {
  async getListings(
    params: z.infer<typeof GetListingsQuerySchema>
  ): Promise<GetListingsQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params))
      }).toString();

      const response = await axios.get(
        `${API_URL}/listings?q=${kv}`
      );
      return response.data();
    } catch (error) {
      console.error("Error fetching listings: ", error);
      throw error
    }
  },

}

