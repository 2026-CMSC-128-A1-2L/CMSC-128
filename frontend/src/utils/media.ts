const R2_PUBLIC_ORIGIN =
  import.meta.env.VITE_R2_PUBLIC_URL ?? 'https://pub-7a3284e84ae04648a8ef605ba34cb54a.r2.dev';

type MediaValue = { sourceType?: string; value?: string } | string | null | undefined;

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

export const getMediaValue = (media: MediaValue) => {
  if (!media) return '';
  return typeof media === 'string' ? media : media.value ?? '';
};

export const getMediaCandidates = (media: MediaValue) => {
  const value = getMediaValue(media);
  const candidates = new Set<string>();

  if (!value) return [];

  if (value.startsWith('blob:') || value.startsWith('data:')) {
    candidates.add(value);
    return [...candidates];
  }

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

export const getPrimaryMediaUrl = (media: MediaValue) => getMediaCandidates(media)[0] ?? '';
