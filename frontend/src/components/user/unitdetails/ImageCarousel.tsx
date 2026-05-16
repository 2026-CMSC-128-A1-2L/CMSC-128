import type React from 'react';
import { useState, useCallback, useMemo, memo } from 'react';
import { Icon } from '@iconify/react';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import Counter from 'yet-another-react-lightbox/plugins/counter';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface Props {
  images: string[];
}

const ImageCarousel: React.FC<Props> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const len = images.length;

  const navigate = useCallback(
    (dir: 'left' | 'right') => {
      if (isAnimating || len <= 1) return;

      setIsAnimating(true);
      setDirection(dir);

      setCurrent((prev) => (dir === 'right' ? (prev + 1) % len : (prev - 1 + len) % len));

      setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 400);
    },
    [isAnimating, len],
  );

  const indices = useMemo(
    () => ({
      prev: (current - 1 + len) % len,
      next: (current + 1) % len,
    }),
    [current, len],
  );

  const transitionClass = 'transition-all duration-400 ease-out transform-gpu';

  const slides = useMemo(() => images.map((src) => ({ src })), [images]);

  return (
    <div className="self-stretch h-[427.9px] relative overflow-hidden select-none">
      <img
        className={`absolute h-[83.34%] w-[83.37%] top-[8.33%] left-[-16.63%]
          shadow-lg rounded-[18.57px] object-cover 
          ${transitionClass} ${direction === 'left' ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
        alt=""
        src={images[indices.prev]}
        loading="eager"
      />

      <img
        onClick={() => !isAnimating && setIsLightboxOpen(true)}
        className={`absolute h-full w-[91.66%] top-0 left-[4.17%] z-2
          shadow-2xl rounded-[20.43px] object-cover cursor-zoom-in
          ${transitionClass} ${isAnimating ? 'scale-[0.98] opacity-90' : 'scale-100 opacity-100'}`}
        alt="Main View"
        src={images[current]}
      />

      <img
        className={`absolute h-[83.34%] w-[83.37%] top-[8.33%] right-[-16.63%]
          shadow-lg rounded-[18.57px] object-cover
          ${transitionClass} ${direction === 'right' ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
        alt=""
        src={images[indices.next]}
        loading="eager"
      />

      {len > 1 && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-between px-6">
          <NavButton
            icon="material-symbols:chevron-left-rounded"
            onClick={() => navigate('left')}
            disabled={isAnimating}
          />
          <NavButton
            icon="material-symbols:chevron-right-rounded"
            onClick={() => navigate('right')}
            disabled={isAnimating}
          />
        </div>
      )}

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={current}
        slides={slides}
        plugins={[Counter, Thumbnails]}
        thumbnails={{
          position: 'bottom',
          width: 80,
          height: 60,
          gap: 12,
        }}
      />
    </div>
  );
};

const NavButton = memo(
  ({ icon, onClick, disabled }: { icon: string; onClick: () => void; disabled: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`pointer-events-auto h-12 w-12 shadow-md rounded-full bg-white/90 backdrop-blur-sm 
    flex items-center justify-center hover:bg-white active:scale-90 transition-transform dark:bg-[#101111]/90 dark:hover:bg-[#101111]
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <Icon icon={icon} className="w-8 h-8 text-slate-800 dark:text-[#d7e0ef]" />
    </button>
  ),
);

export default memo(ImageCarousel);
