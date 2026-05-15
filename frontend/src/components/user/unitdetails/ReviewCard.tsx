import { useMemo, useState, type FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface ReviewCardProps {
  initials: string;
  name: string;
  date: string;
  rating: string;
  text: string;
  mediaUrls?: string[];
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({
  initials,
  name,
  date,
  rating,
  text,
  mediaUrls = [],
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [thumbnailUrls, setThumbnailUrls] = useState<Record<number, string>>({});
  const mediaCandidates = useMemo(() => mediaUrls.slice(0, 2).map(getImageCandidates), [mediaUrls]);

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

  return (
    <div className="w-full mx-auto relative shrink-0">
      {/* Background */}
      <div className="absolute inset-0 rounded-[15px] bg-white border border-whitesmoke-200 box-border" />

      <div className="relative top-[12px] w-full flex flex-col items-start gap-1.5 pb-3">
        {/* Header */}
        <div className="w-full flex items-start pl-4 pr-4 sm:pl-5 sm:pr-5 justify-between">
          <div className="flex items-start gap-2 shrink-0">
            {/* Avatar */}
            <div className="h-8 w-8 relative">
              <div className="absolute inset-0 rounded-full bg-gainsboro border border-silver box-border" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {initials}
              </div>
            </div>

            {/* Name + Date */}
            <div className="flex flex-col items-start text-left text-sm text-black font-inter">
              <div className="leading-6 font-medium">{name}</div>
              <div className="text-[10px] sm:text-[8px] text-darkslategray">{date}</div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-end shrink-0 text-teal-200 font-inter">
            <Icon icon="material-symbols:star-rounded" className="w-[13px] h-[13px]" />
            <b className="tracking-tight text-sm sm:text-[12px]">{rating}</b>
          </div>
        </div>

        {/* Text */}
        <div className="w-full px-4 sm:px-5 py-2.5 box-border text-left text-black">
          <div className="w-full tracking-tight font-semibold text-sm sm:text-base">{text}</div>
        </div>

        {mediaUrls.length > 0 && (
          <div className="flex w-full gap-3 px-4 pb-4 sm:px-5">
            {mediaCandidates.map((candidates, index) => (
              <button
                type="button"
                key={candidates[0]}
                onClick={() => setLightboxIndex(index)}
                className="group relative block h-24 w-32 cursor-pointer overflow-hidden rounded-lg border border-whitesmoke-200 bg-whitesmoke-100 p-0"
              >
                <img
                  src={getThumbnailUrl(index)}
                  alt={`Review attachment ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={() => tryNextThumbnailUrl(index)}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                  <Icon icon="iconamoon:eye" className="h-6 w-6" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={Math.max(lightboxIndex, 0)}
        slides={slides}
      />
    </div>
  );
};

const getImageCandidates = (url: string) => {
  const candidates = [url];

  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;

    if (pathname.startsWith('/atlas/atlas/')) {
      candidates.push(`${parsedUrl.origin}${pathname.replace('/atlas/atlas/', '/atlas/')}`);
    }

    if (pathname.startsWith('/atlas/')) {
      candidates.push(`${parsedUrl.origin}${pathname.replace('/atlas/', '/')}`);
    } else {
      candidates.push(`${parsedUrl.origin}/atlas${pathname}`);
    }
  } catch {
    return candidates;
  }

  return [...new Set(candidates)];
};

export default ReviewCard;
