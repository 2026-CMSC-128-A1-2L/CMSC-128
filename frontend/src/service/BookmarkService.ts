import type { GetBookmarksQuery } from '../interface/bookmark';
import { api } from './axiosInstance';

export const BookmarkService = {
  async getBookmarks(params: GetBookmarksQuery): Promise<GetBookmarksQuery> {
    try {
      const response = await api.get<GetBookmarksQuery>('/api/bookmarks', {
        params: { q: JSON.stringify(params) },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  },

  async addBookmark(listingId: string) {
    try {
      const response = await api.post(`/api/bookmarks/${listingId}`, {});

      return response.data;
    } catch (error) {
      console.error('Failed to add bookmark', error);
      throw error;
    }
  },

  async deleteBookmark(listingId: string) {
    try {
      const response = await api.delete(`/api/bookmarks/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete bookmark:', error);
      throw error;
    }
  },
};
