import type { FunctionComponent } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import SideBar from "../../../components/user/SideBar";
import Footer from "../../../components/general/Footer";
import PageBackground from "../../../components/general/PageBackground";
import { useTheme } from "../../../pages/utilities/DarkMode";
import { useBookmarks } from "../../../hooks/useBookmarks";
import type { BookmarkItem } from "../../../service/BookmarkService";
import FallbackImage from "../../../components/general/FallbackImage";

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
});

const placeholderImage = "https://placehold.co/280x150?text=No+image";

const formatRoomLabel = (bookmark: BookmarkItem) => {
  if (bookmark.roomLabel) return bookmark.roomLabel;
  if (!bookmark.roomType) return "Room type";
  return bookmark.roomType
    .split(/[-_]/)
    .map((word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ");
};

type BookmarkCardProps = {
  bookmark: BookmarkItem;
  onRemove: (listingId: string) => Promise<void>;
};

const BookmarkCard: FunctionComponent<BookmarkCardProps> = ({
  bookmark,
  onRemove,
}) => {
  const image = bookmark.media?.[0]?.value ?? placeholderImage;
  const isFull = bookmark.availableUnitCount <= 0 && bookmark.unitCount > 0;
  const roomLabel = formatRoomLabel(bookmark);
  const detailsPath = `/facilities/${bookmark.facilityId}`;
  const detailsState = { selectedRoomType: roomLabel };

  return (
    <Link
      to={detailsPath}
      state={detailsState}
      className="group relative flex w-[268px] flex-col overflow-hidden rounded-[16px] border border-[#f0f0f0] bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-[#303331] dark:bg-[#101111] dark:shadow-none dark:hover:ring-1 dark:hover:ring-[#303331]"
      aria-label={`View ${bookmark.facilityName ?? roomLabel}`}
    >
      <div className="relative h-32 w-full shrink-0 bg-whitesmoke-100 dark:bg-[#1a1b1b]">
        <FallbackImage
          media={image}
          alt={bookmark.facilityName ?? roomLabel}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-2 top-2 flex gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              isFull
                ? "bg-whitesmoke-200 text-silver dark:bg-[#242526] dark:text-[#647483]"
                : "bg-lightcyan text-teal-200 dark:bg-[#12342e] dark:text-[#72cbb8]"
            }`}
          >
            {isFull ? "Full" : "Open"}
          </span>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void onRemove(bookmark.listingId);
          }}
          className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm text-[#024338] transition-colors hover:bg-white dark:bg-[#101111]/90 dark:text-[#72cbb8] dark:hover:bg-[#141515]"
          aria-label={`Remove ${roomLabel} bookmark`}
        >
          <Icon
            icon="material-symbols:bookmark-remove-outline"
            className="h-4 w-4"
          />
        </button>
      </div>

      <div className="flex flex-col gap-1 px-3 pb-3 pt-2">
        <div className="flex items-center justify-between gap-2">
          <b className="truncate text-[15px] font-bold text-black leading-tight dark:text-[#edf6f4]">
            {bookmark.facilityName ?? "Facility"}
          </b>
          <div className="flex shrink-0 items-center gap-1">
            <Icon
              icon="material-symbols:star-rounded"
              className="h-3.5 w-3.5 text-[#f5b642]"
            />
            <span className="text-xs font-semibold text-black font-lora dark:text-[#edf6f4]">
              {bookmark.facilityRating?.toFixed(1) ?? "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold font-lora text-black dark:text-[#a4acba]">
          <Icon
            icon="material-symbols-light:location-on"
            className="h-3.5 w-3.5 shrink-0"
          />
          <span className="truncate">
            {bookmark.facilityLoc ?? "Location unavailable"}
          </span>
        </div>

        <div className="mt-1.5 flex gap-1.5">
          <span className="rounded-lg bg-[#cbf6ed] px-2 py-0.5 text-[7px] font-semibold text-[#096c5b] font-lora dark:bg-[#12342e] dark:text-[#72cbb8]">
            {roomLabel}
          </span>
          <span className="rounded-lg bg-[#cbf6ed] px-2 py-0.5 text-[7px] font-semibold text-[#096c5b] font-lora dark:bg-[#12342e] dark:text-[#72cbb8]">
            {bookmark.minPrice != null
              ? currencyFormatter.format(bookmark.minPrice)
              : "TBA"}
          </span>
          {bookmark.capacity != null && (
            <span className="rounded-lg bg-[#cbf6ed] px-2 py-0.5 text-[7px] font-semibold text-[#096c5b] font-lora dark:bg-[#12342e] dark:text-[#72cbb8]">
              {bookmark.capacity}pax
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const BookmarksNewUsers: FunctionComponent = () => {
  const { toggle } = useTheme();
  const { bookmarks, isLoading, error, refetch, removeBookmark } = useBookmarks(
    {
      sortBy: "date",
      order: "desc",
    },
  );

  return (
    <div className="relative flex min-h-screen font-inter text-black dark:bg-[#0f1010] dark:text-[#edf6f4]">
      <PageBackground />
      <div className="sticky top-0 h-screen shrink-0 z-10">
        <SideBar onToggleDarkMode={toggle} />
      </div>

      <div className="relative z-10 flex flex-1 flex-col min-w-0 overflow-y-auto">
        <div className="flex-1 flex flex-col px-4 sm:px-8 pt-16 pr-4 sm:pr-20">
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <b className="text-2xl leading-8 dark:text-[#edf6f4]">
                    Bookmarks
                  </b>
                  <b className="text-2xl leading-8 text-teal dark:text-[#72cbb8]">
                    {bookmarks.length}
                  </b>
                </div>
                {error && (
                  <button
                    type="button"
                    onClick={refetch}
                    className="rounded-lg bg-lightcyan px-4 py-2 text-sm font-semibold text-teal-200 dark:bg-[#0d3a32] dark:text-[#72cbb8]"
                  >
                    Retry
                  </button>
                )}
              </div>
              <div className="w-full h-0.5 rounded-[100px] bg-whitesmoke-200 dark:bg-[#303331]" />
            </div>

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center py-16 text-sm font-semibold text-dimgray dark:text-[#a4acba]">
                Loading bookmarks...
              </div>
            ) : error ? (
              <div className="flex-1 flex items-center justify-center py-16 text-center text-sm font-semibold text-red-500">
                {error}
              </div>
            ) : bookmarks.length > 0 ? (
              <div className="flex flex-wrap gap-2 pb-12">
                {bookmarks.map((bookmark) => (
                  <BookmarkCard
                    key={bookmark.bookmarkId}
                    bookmark={bookmark}
                    onRemove={removeBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center py-16 text-center text-sm dark:text-[#a4acba]">
                <div className="flex items-center gap-2">
                  <b>
                    <span>No bookmarked listings yet. </span>
                    <Link to="/home">
                      <span className="text-teal dark:text-[#72cbb8]">
                        Browse listings
                      </span>
                    </Link>
                  </b>

                  <Link to="/home">
                    <Icon
                      icon="radix-icons:arrow-top-right"
                      className="h-6 w-6 relative"
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BookmarksNewUsers;
