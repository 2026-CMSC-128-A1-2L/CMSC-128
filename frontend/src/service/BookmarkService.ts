import type { GetBookmarksQuery } from '../interface/bookmark';
import { api } from './axiosInstance';

export type BookmarkItem = {
  bookmarkId: string;
  bookmarkCreated?: string;
  userId?: string;
  listingId: string;
  facilityId: string;
  facilityName?: string | null;
  facilityLoc?: string | null;
  facilityRating?: number | null;
  minPrice?: number | null;
  roomType?: string | null;
  roomLabel?: string | null;
  listingDescription?: string | null;
  capacity?: number | null;
  media?: Array<{ value?: string }>;
  unitCount: number;
  availableUnitCount: number;
  currentListingStatus?: string | null;
};

type GetBookmarksResponse = {
  data: BookmarkItem[];
};

export const BookmarkService = {
  async getBookmarks(params: Partial<GetBookmarksQuery>): Promise<GetBookmarksResponse> {
    try {
      const response = await api.get<GetBookmarksResponse>('/api/bookmarks', {
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
