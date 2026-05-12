import type { GetBookmarksQuery } from '../interface/bookmark';
import { api } from './axiosInstance';

export type BookmarkItem = {
  bookmarkId: string;
  bookmarkCreated: string;
  userId: string;
  listingId: string;
  facilityId: string;
  facilityName: string | null;
  facilityLoc: string | null;
  facilityRating: number | null;
  minPrice: number | null;
  roomType: string | null;
  roomLabel: string | null;
  listingDescription?: string;
  capacity: number | null;
  media?: { sourceType: string; value: string }[];
  unitCount: number;
  availableUnitCount: number;
  currentListingStatus: 'occupied' | 'pa-move out na' | 'open' | 'pasalo' | null;
};

type BookmarkResponse<T> = {
  data: T;
};

export const BookmarkService = {
  async getBookmarks(params: Partial<GetBookmarksQuery> = {}) {
    const response = await api.get<BookmarkResponse<BookmarkItem[]>>('/api/bookmarks', {
      params,
    });
    return response.data;
  },

  async addBookmark(listingId: string) {
    const response = await api.post<BookmarkResponse<unknown>>(`/api/bookmarks/${listingId}`);
    return response.data;
  },

  async deleteBookmark(listingId: string) {
    const response = await api.delete<BookmarkResponse<{ deletedCount?: number }>>(
      `/api/bookmarks/${listingId}`,
    );
    return response.data;
  },
};
