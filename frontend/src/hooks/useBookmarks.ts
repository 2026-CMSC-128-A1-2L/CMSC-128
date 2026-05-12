import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookmarkService, type BookmarkItem } from '../service/BookmarkService';
import type { GetBookmarksQuery } from '../interface/bookmark';

type UseBookmarksReturn = {
  bookmarks: BookmarkItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  removeBookmark: (listingId: string) => Promise<void>;
};

export function useBookmarks(params: Partial<GetBookmarksQuery> = {}): UseBookmarksReturn {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = () => setFetchCount((count) => count + 1);
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    void fetchCount;
    const queryParams = JSON.parse(paramsKey) as Partial<GetBookmarksQuery>;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await BookmarkService.getBookmarks(queryParams);
        if (!cancelled) setBookmarks(response.data);
      } catch (err) {
        if (!cancelled) {
          const status = axios.isAxiosError(err) ? err.response?.status : undefined;
          const message =
            status === 401
              ? 'Please sign in to view your bookmarks.'
              : status === 403
                ? 'Bookmarks are only available for verified student accounts.'
                : err instanceof Error
                  ? err.message
                  : 'Failed to load bookmarks.';
          setError(message);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fetchCount, paramsKey]);

  const removeBookmark = async (listingId: string) => {
    await BookmarkService.deleteBookmark(listingId);
    setBookmarks((items) => items.filter((item) => item.listingId !== listingId));
  };

  return { bookmarks, isLoading, error, refetch, removeBookmark };
}
