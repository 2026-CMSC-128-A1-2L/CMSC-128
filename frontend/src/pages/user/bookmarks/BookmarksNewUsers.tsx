import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import SideBar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import { useTheme } from '../../../pages/utilities/DarkMode';
import { useBookmarks } from '../../../hooks/useBookmarks';
import type { BookmarkItem } from '../../../service/BookmarkService';

const currencyFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
});

const placeholderImage = 'https://placehold.co/280x150?text=No+image';

const formatRoomLabel = (bookmark: BookmarkItem) => {
  if (bookmark.roomLabel) return bookmark.roomLabel;
  if (!bookmark.roomType) return 'Room type';
  return bookmark.roomType
    .split(/[-_]/)
    .map((word) => `${word[0]?.toUpperCase() ?? ''}${word.slice(1)}`)
    .join(' ');
};

type BookmarkCardProps = {
  bookmark: BookmarkItem;
  onRemove: (listingId: string) => Promise<void>;
};

const BookmarkCard: FunctionComponent<BookmarkCardProps> = ({ bookmark, onRemove }) => {
  const image = bookmark.media?.[0]?.value ?? placeholderImage;
  const isFull = bookmark.availableUnitCount <= 0 && bookmark.unitCount > 0;
  const roomLabel = formatRoomLabel(bookmark);
  const detailsPath = `/facilities/${bookmark.facilityId}`;
  const detailsState = { selectedRoomType: roomLabel };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-whitesmoke-200 bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col md:flex-row">
      <Link
        to={detailsPath}
        state={detailsState}
        className="absolute inset-0 z-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-200"
        aria-label={`View ${bookmark.facilityName ?? roomLabel}`}
      />

      <div className="h-44 md:h-auto md:w-72 shrink-0 bg-whitesmoke-100">
        <img
          src={image}
          alt={bookmark.facilityName ?? roomLabel}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <b className="text-xl text-darkslategray-200">
                {bookmark.facilityName ?? 'Facility'}
              </b>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isFull ? 'bg-whitesmoke-100 text-silver' : 'bg-lightcyan text-teal-200'
                }`}
              >
                {isFull ? 'Full' : 'Open'}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-dimgray">
              <Icon icon="material-symbols-light:location-on" className="h-4 w-4" />
              <span>{bookmark.facilityLoc ?? 'Location unavailable'}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              void onRemove(bookmark.listingId);
            }}
            className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-whitesmoke-200 text-teal-200 transition-colors hover:bg-lightcyan cursor-pointer"
            aria-label={`Remove ${roomLabel} bookmark`}
          >
            <Icon icon="material-symbols:bookmark-remove-outline" className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-whitesmoke-100 px-4 py-3">
            <div className="text-xs font-semibold text-dimgray">Room Type</div>
            <b className="text-sm text-darkslategray-200">{roomLabel}</b>
          </div>
          <div className="rounded-lg bg-whitesmoke-100 px-4 py-3">
            <div className="text-xs font-semibold text-dimgray">Monthly Rent</div>
            <b className="text-sm text-darkslategray-200">
              {bookmark.minPrice != null ? currencyFormatter.format(bookmark.minPrice) : 'TBA'}
            </b>
          </div>
          <div className="rounded-lg bg-whitesmoke-100 px-4 py-3">
            <div className="text-xs font-semibold text-dimgray">Rating</div>
            <b className="flex items-center gap-1 text-sm text-darkslategray-200">
              <Icon icon="material-symbols:star-rounded" className="h-4 w-4 text-[#f5b642]" />
              {bookmark.facilityRating?.toFixed(1) ?? 'N/A'}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookmarksNewUsers: FunctionComponent = () => {
  const { toggle } = useTheme();
  const { bookmarks, isLoading, error, refetch, removeBookmark } = useBookmarks({
    sortBy: 'date',
    order: 'desc',
  });

  return (
    <div className="w-full h-screen flex flex-col font-inter text-black overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="sticky top-0 h-screen shrink-0 z-10">
          <SideBar onToggleDarkMode={toggle} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="flex min-h-full flex-col">
              <div className="flex-1 flex flex-col px-4 sm:px-8 pt-16 pr-4 sm:pr-20">
                <div className="flex flex-col gap-8 flex-1">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <b className="text-2xl leading-8">Bookmarks</b>
                        <b className="text-2xl leading-8 text-teal">{bookmarks.length}</b>
                      </div>
                      {error && (
                        <button
                          type="button"
                          onClick={refetch}
                          className="rounded-lg bg-lightcyan px-4 py-2 text-sm font-semibold text-teal-200 cursor-pointer"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                    <div className="w-full h-0.5 rounded-[100px] bg-whitesmoke-200" />
                  </div>

                  {isLoading ? (
                    <div className="flex-1 flex items-center justify-center py-16 text-sm font-semibold text-dimgray">
                      Loading bookmarks...
                    </div>
                  ) : error ? (
                    <div className="flex-1 flex items-center justify-center py-16 text-center text-sm font-semibold text-red-500">
                      {error}
                    </div>
                  ) : bookmarks.length > 0 ? (
                    <div className="flex flex-col gap-4 pb-12">
                      {bookmarks.map((bookmark) => (
                        <BookmarkCard
                          key={bookmark.bookmarkId}
                          bookmark={bookmark}
                          onRemove={removeBookmark}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center py-16 text-center text-sm">
                      <div className="flex items-center gap-2">
                        <b>
                          <span>No bookmarked listings yet. </span>
                          <Link to="/home">
                            <span className="text-teal">Browse listings</span>
                          </Link>
                        </b>

                        <Link to="/home">
                          <Icon icon="radix-icons:arrow-top-right" className="h-6 w-6 relative" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <footer>
                <Footer />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarksNewUsers;
