import { useState, type FunctionComponent } from 'react';
import { getMediaCandidates } from '../../utils/media';

type FallbackImageProps = {
  media: { sourceType?: string; value?: string } | string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  onClick?: () => void;
};

const FallbackImage: FunctionComponent<FallbackImageProps> = ({
  media,
  alt,
  className,
  loading = 'lazy',
  onClick,
}) => {
  const [index, setIndex] = useState(0);
  const candidates = getMediaCandidates(media);
  const src = candidates[index];

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onClick={onClick}
      onError={() => setIndex((current) => Math.min(current + 1, candidates.length - 1))}
    />
  );
};

export default FallbackImage;
