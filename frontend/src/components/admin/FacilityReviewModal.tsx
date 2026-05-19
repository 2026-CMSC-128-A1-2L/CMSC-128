import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import AdminPopupOverlay from './AdminPopupOverlay';

type FacilityDoc = { docId: string; name: string; status: string; files: string[] };
type MediaItem = { sourceType: string; value: string };
type FacilityData = {
  _id?: string;
  id?: string;
  name: string;
  type: string;
  status: string;
  capacity: number;
  description: string;
  location: { text: string };
  media?: MediaItem[];
  price?: { min: number; max: number };
  listings?: {
    id?: string;
    name: string;
    capacity?: number;
    price?: { min: number; max: number };
  }[];
  documents?: FacilityDoc[];
  createdAt?: string;
};

type Props = {
  isOpen: boolean;
  facility: FacilityData | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  formatType: (type: string) => string;
};

const R2_PUBLIC_ORIGIN =
  import.meta.env.VITE_R2_PUBLIC_URL ?? 'https://pub-7a3284e84ae04648a8ef605ba34cb54a.r2.dev';

const addKeyCandidates = (candidates: Set<string>, key: string) => {
  const normalizedKey = key.replace(/^\/+/, '');
  if (!normalizedKey) return;

  candidates.add(`/api/files/public?key=${encodeURIComponent(normalizedKey)}`);
  candidates.add(`${R2_PUBLIC_ORIGIN.replace(/\/+$/, '')}/${normalizedKey}`);

  if (normalizedKey.startsWith('atlas/')) {
    const withoutAtlas = normalizedKey.replace(/^atlas\//, '');
    candidates.add(`/api/files/public?key=${encodeURIComponent(withoutAtlas)}`);
    candidates.add(`${R2_PUBLIC_ORIGIN.replace(/\/+$/, '')}/${withoutAtlas}`);
  } else {
    const withAtlas = `atlas/${normalizedKey}`;
    candidates.add(`/api/files/public?key=${encodeURIComponent(withAtlas)}`);
    candidates.add(`${R2_PUBLIC_ORIGIN.replace(/\/+$/, '')}/${withAtlas}`);
  }
};

const getImageCandidates = (media: MediaItem) => {
  const value = media.value;
  const candidates = new Set<string>();

  if (!value) return [];

  if (value.startsWith('http')) {
    candidates.add(value);
    try {
      const parsedUrl = new URL(value);
      addKeyCandidates(candidates, parsedUrl.pathname);
    } catch {
      // Keep the original URL if parsing fails.
    }
  } else {
    addKeyCandidates(candidates, value);
  }

  return [...candidates];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);

const formatPrice = (facility: FacilityData) => {
  const prices = [
    facility.price?.min,
    facility.price?.max,
    ...(facility.listings ?? []).flatMap((listing) => [listing.price?.min, listing.price?.max]),
  ].filter((value): value is number => typeof value === 'number' && value > 0);

  if (prices.length === 0) return '—';

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatCurrency(min) : `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

const getDocumentUrl = (fileKey: string) =>
  `/api/files/public?key=${encodeURIComponent(fileKey.replace(/^\/+/, ''))}`;

const getDocumentName = (fileKey: string) => fileKey.split('/').pop() ?? fileKey;

export default function FacilityReviewModal({
  isOpen,
  facility,
  onClose,
  onApprove,
  onReject,
  formatType,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [thumbnailUrls, setThumbnailUrls] = useState<Record<number, string>>({});
  const mediaItems = useMemo(() => facility?.media ?? [], [facility?.media]);
  const mediaCandidates = useMemo(
    () => mediaItems.map(getImageCandidates),
    [mediaItems],
  );
  const getThumbnailUrl = (index: number) => thumbnailUrls[index] ?? mediaCandidates[index]?.[0];
  const slides = mediaCandidates.map((candidates, index) => ({
    src: getThumbnailUrl(index) ?? candidates[0],
  }));
  const tryNextThumbnailUrl = (index: number) => {
    const currentUrl = getThumbnailUrl(index);
    const candidates = mediaCandidates[index] ?? [];
    const currentIndex = candidates.indexOf(currentUrl ?? '');
    const nextUrl = candidates[currentIndex + 1];
    if (nextUrl) {
      setThumbnailUrls((urls) => ({ ...urls, [index]: nextUrl }));
    }
  };

  if (!isOpen || !facility) return null;
  return (
    <AdminPopupOverlay onClose={onClose} isOpen={isOpen}>
      <div className="flex w-[640px] max-h-[90vh] flex-col overflow-hidden rounded-tl-[32px] bg-white dark:bg-[#141515] dark:border dark:border-[#303331]">
        <div className="w-full shrink-0 rounded-tl-[32px] bg-gradient-to-b from-[#096c5b] to-[#16917c] px-[57px] py-3">
          <div className="w-full py-8 pb-2">
            <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">
              Facility Review
            </h2>
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">
              Review submitted facility
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-12 pt-8 pb-6 bg-white dark:bg-[#141515]">
          <div className="mb-6">
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#001d18] dark:text-[#d7e0ef]">
              {facility.name}
            </p>
            <p className="mt-1 font-['Inter',sans-serif] text-[14px] font-medium text-[#666] dark:text-[#a4acba]">
              {formatType(facility.type)} &bull; {facility.location.text}
            </p>
          </div>
          <div className="mb-4 grid grid-cols-4 gap-3">
            <div className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                Capacity
              </p>
              <p className="mt-1 font-['Inter',sans-serif] text-[22px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                {facility.capacity}
              </p>
            </div>
            <div className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                Price
              </p>
              <p className="mt-1 font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                {formatPrice(facility)}
              </p>
            </div>
            <div className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                Type
              </p>
              <p className="mt-1 font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                {formatType(facility.type)}
              </p>
            </div>
            {facility.createdAt && (
              <div className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
                <p className="font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                  Submitted
                </p>
                <p className="mt-1 font-['Inter',sans-serif] text-[14px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                  {new Date(facility.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
          <div className="mb-4 rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
            <p className="mb-2 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
              Description
            </p>
            <p className="font-['Inter',sans-serif] text-[15px] font-medium leading-relaxed text-[#001d18] dark:text-[#d7e0ef]">
              {facility.description.replace(/\[.*?\]\s*/, '')}
            </p>
          </div>
          {mediaItems.length > 0 && (
            <div className="mb-4 rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                Media
              </p>
              <div className="flex gap-3 overflow-x-auto">
                {mediaCandidates.map((_, i) => (
                  <button
                    key={`media-${i}`}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group relative h-36 w-56 shrink-0 cursor-pointer overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-[#f8fafc] p-0 dark:border-[#404341] dark:bg-[#141515]"
                  >
                    <img
                      src={getThumbnailUrl(i)}
                      alt={`${facility.name} ${i + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={() => tryNextThumbnailUrl(i)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                      <Icon icon="iconamoon:eye" className="h-6 w-6" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {facility.documents && facility.documents.length > 0 && (
            <div className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                Submitted Documents
              </p>
              <div className="flex flex-col gap-2">
                {facility.documents.map((doc) => (
                  <div
                    key={doc.docId}
                    className="rounded-[12px] border border-[#e5e7eb] dark:border-[#404341] bg-[#fafafa] dark:bg-[#141515] px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#edf7f5] dark:bg-[#12342e]">
                          <Icon
                            icon="solar:document-text-bold"
                            className="h-4 w-4 text-[#096c5b] dark:text-[#72cbb8]"
                          />
                        </div>
                        <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#001d18] dark:text-[#d7e0ef]">
                          {doc.name}
                        </span>
                      </div>
                      <span className="font-['Inter',sans-serif] text-[12px] font-semibold text-[#64748b] dark:text-[#a4acba]">
                        {doc.files.length} file{doc.files.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {doc.files.length > 0 && (
                      <div className="mt-3 flex flex-col gap-2">
                        {doc.files.map((fileKey) => (
                          <a
                            key={fileKey}
                            href={getDocumentUrl(fileKey)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-3 rounded-[10px] bg-white px-3 py-2 font-['Inter',sans-serif] text-[12px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80 dark:bg-[#1f2022] dark:text-[#72cbb8]"
                          >
                            <span className="truncate">{getDocumentName(fileKey)}</span>
                            <Icon
                              icon="heroicons:arrow-top-right-on-square"
                              className="h-4 w-4 shrink-0"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-center gap-4 border-t border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515] px-12 py-5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#64748b] transition-opacity hover:opacity-80"
        >
          Cancel
        </button>
        {facility.status === 'submitted' && (
          <>
            <button
              type="button"
              onClick={onReject}
              className="cursor-pointer rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] transition-opacity hover:opacity-80"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={onApprove}
              className="cursor-pointer rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80"
              >
                Approve
              </button>
            </>
          )}
        </div>
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={Math.max(lightboxIndex, 0)}
          slides={slides}
        />
      </div>
    </AdminPopupOverlay>
  );
}
