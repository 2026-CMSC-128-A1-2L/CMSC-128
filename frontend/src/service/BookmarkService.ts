import axios from 'axios';
import type { GetBookmarksQuery } from '../interface/bookmark';
import { API_URL } from './constant';

export const BookmarkService = {
  async getBookmarks(params: GetBookmarksQuery): Promise<GetBookmarksQuery> {
    try {
      const kv = new URLSearchParams({
        q: encodeURIComponent(JSON.stringify(params)),
      }).toString();

      const response = await axios.get<GetBookmarksQuery>(`${API_URL}/api/bookmarks?q=${kv}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  },

  async addBookmark(listingId: string) {
    try {
      const response = await axios.post(
        `${API_URL}/api/bookmarks/${listingId}`,
        {
          //empty kasi na hahandle na ata ito sa backend? not sure tbd
        },
        {
          //headrs
        },
      );

      return response.data;
    } catch (error) {
      console.error('Failed to add bookmark', error);
      throw error;
    }
  },

  async deleteBookmark(listingId: string) {
    try {
      const response = await axios.delete(`${API_URL}/api/bookmarks/${listingId}`, {
        //headers
      });
      return response.data;
    } catch (error) {
      console.error('Failed to delete bookmark:', error);
      throw error;
    }
  },
};
