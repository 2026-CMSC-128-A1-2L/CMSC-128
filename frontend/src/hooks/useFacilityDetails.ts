import { useEffect, useMemo, useState } from 'react';
import type { GetFacilityResponse } from '../interface/facility';
import { FacilityService } from '../service/FacilityService';
import { api } from '../service/axiosInstance';
import type { DormCardData } from './useFacilities';

const placeholderImage = 'https://placehold.co/900x430?text=No+image';
const objectIdPattern = /^[a-f\d]{24}$/i;

const toPublicMediaUrl = (value?: string) => {
  if (!value) return undefined;
  if (value.startsWith('http') || value.startsWith('/api/')) return value;
  return `/api/files/public?key=${encodeURIComponent(value.replace(/^\/+/, ''))}`;
};

type FacilityDetail = GetFacilityResponse;
type FacilityMedia = { value: string };
type FacilityListing = {
  id?: unknown;
  name?: string;
  roomType?: string;
  description?: string;
  tags?: Record<string, string | number | boolean>;
  unitCount?: number;
  availableUnitCount?: number;
  price?: {
    min: number;
    max: number;
  };
  cost?: {
    rent: number;
  };
};

export type TagDefinition = {
  name: string;
  displayName: string;
  isRequired: boolean;
  dataType: {
    name: 'enum' | 'numeric' | 'boolean';
    values?: string[];
    min?: number;
    max?: number;
  };
};

export type FacilityReview = {
  id: string;
  reviewerName: string;
  createdAt?: string;
  rating: number;
  description: string;
  mediaUrls: string[];
};

export type FacilityDetailsData = {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates?: {
    lat: number;
    long: number;
  };
  gallery: string[];
  rating: string;
  price: {
    min: number;
    max: number;
  };
  listings: {
    id: string;
    label: string;
    roomType: string;
    description: string;
    tags: Record<string, string | number | boolean>;
    availableUnitCount: number;
    unitCount: number;
    price: number;
  }[];
  tagDefinitions: TagDefinition[];
  reviews: FacilityReview[];
  roomTypes: {
    pax: string;
    price: number;
  }[];
  landlord?: {
    name: string;
    profilePicture?: string;
    contact?: string;
    numUnits?: number;
    createdAt?: Date | string;
  };
  allowVisit: boolean;
  allowTransfer: boolean;
};

type UseFacilityDetailsReturn = {
  facility: FacilityDetailsData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

const toStringId = (value: unknown, fallback: string) => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'toString' in value) return String(value);
  return fallback;
};

const mapFromCard = (card: DormCardData): FacilityDetailsData => ({
  id: card.id,
  name: card.name,
  description: '',
  location: card.location,
  gallery: [card.image],
  rating: card.rating,
  price: card.price,
  listings: card.room_types.map((room, index) => ({
    id: room.id && objectIdPattern.test(room.id) ? room.id : `${card.id}-${index}`,
    label: room.pax,
    roomType: room.pax,
    description: '',
    tags: {},
    availableUnitCount: 0,
    unitCount: 0,
    price: room.price,
  })),
  tagDefinitions: [],
  reviews: [],
  roomTypes: card.room_types,
  allowVisit: false,
  allowTransfer: false,
});

const mapFromFacility = (
  facility: FacilityDetail,
  tagDefinitions: TagDefinition[],
  reviews: FacilityReview[],
  fallback?: DormCardData,
): FacilityDetailsData => {
  const media: FacilityMedia[] = 'media' in facility ? facility.media : [];
  const listings: FacilityListing[] = 'listings' in facility ? facility.listings : [];
  const gallery = media
    .map((item: FacilityMedia) => toPublicMediaUrl(item.value))
    .filter((url): url is string => Boolean(url));
  const fallbackData = fallback ? mapFromCard(fallback) : undefined;

  const listingPrices = listings
    .map((listing: FacilityListing) => (listing.cost ? listing.cost.rent : listing.price?.min))
    .filter((price: number | undefined): price is number => typeof price === 'number' && price > 0);

  const minPrice =
    listingPrices.length > 0 ? Math.min(...listingPrices) : (fallbackData?.price.min ?? 0);
  const maxPrice =
    listingPrices.length > 0 ? Math.max(...listingPrices) : (fallbackData?.price.max ?? 0);

  const mappedListings =
    listings.length > 0
      ? listings.map((listing: FacilityListing, index: number) => {
          const roomType = listing.roomType ?? `listing-${index + 1}`;
          const title = listing.name ?? `${roomType[0].toUpperCase()}${roomType.slice(1)}`;
          const availableUnitCount = listing.availableUnitCount ?? 0;
          const unitCount = listing.unitCount ?? 0;

          return {
            id: toStringId(listing.id, `${roomType}-${index}`),
            label: `${title}${unitCount > 0 ? ` (${availableUnitCount}/${unitCount} available)` : ''}`,
            roomType,
            description: listing.description ?? '',
            tags: listing.tags ?? {},
            availableUnitCount,
            unitCount,
            price: listing.cost?.rent ?? listing.price?.min ?? 0,
          };
        })
      : (fallbackData?.listings ?? []);

  const roomTypes = mappedListings.map((listing) => ({
    pax: listing.label,
    price: listing.price,
  }));

  const landlord =
    'landlord' in facility
      ? {
          name: [
            facility.landlord.firstName,
            facility.landlord.middleName,
            facility.landlord.lastName,
          ]
            .filter(Boolean)
            .join(' '),
          profilePicture: facility.landlord.profilePicture,
          contact: facility.landlord.contact,
          numUnits: facility.landlord.numUnits,
          createdAt: facility.landlord.createdAt,
        }
      : undefined;

  return {
    id: toStringId(facility.id, fallbackData?.id ?? ''),
    name: facility.name,
    description:
      'description' in facility ? facility.description : (fallbackData?.description ?? ''),
    location: facility.location.text,
    coordinates: facility.location.coordinates,
    gallery: gallery.length > 0 ? gallery : (fallbackData?.gallery ?? [placeholderImage]),
    rating: fallbackData?.rating ?? '—',
    price: { min: minPrice, max: maxPrice },
    listings: mappedListings,
    tagDefinitions,
    reviews,
    roomTypes,
    landlord,
    allowVisit: 'allowVisit' in facility ? facility.allowVisit : false,
    allowTransfer: 'allowTransfer' in facility ? facility.allowTransfer : false,
  };
};

type RawReview = {
  _id?: unknown;
  id?: unknown;
  userId?:
    | string
    | {
        firstName?: string;
        lastName?: string;
      };
  createdAt?: string;
  ratings?: {
    quality?: number;
    comfort?: number;
    environment?: number;
  };
  description?: string;
  media?: {
    value?: string;
  }[];
};

const toPublicReviewMediaUrl = (value?: string) => {
  if (!value) return undefined;
  const key = getReviewMediaKey(value);
  return key ? `/api/files/public?key=${encodeURIComponent(key)}` : undefined;
};

const getReviewMediaKey = (value: string) => {
  if (!value.startsWith('http')) return value.replace(/^\/+/, '');

  try {
    return new URL(value).pathname.replace(/^\/+/, '');
  } catch {
    return undefined;
  }
};

const mapReview = (review: RawReview): FacilityReview => {
  const reviewer =
    typeof review.userId === 'object' && review.userId
      ? [review.userId.firstName, review.userId.lastName].filter(Boolean).join(' ')
      : 'Student';
  const ratings = review.ratings;
  const ratingValues = [ratings?.quality, ratings?.comfort, ratings?.environment].filter(
    (rating): rating is number => typeof rating === 'number',
  );
  const rating =
    ratingValues.length > 0
      ? ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length
      : 0;

  return {
    id: toStringId(review.id ?? review._id, crypto.randomUUID()),
    reviewerName: reviewer || 'Student',
    createdAt: review.createdAt,
    rating,
    description: review.description ?? '',
    mediaUrls:
      review.media
        ?.map((item) => toPublicReviewMediaUrl(item.value))
        .filter((url): url is string => Boolean(url)) ?? [],
  };
};

export function useFacilityDetails(
  facilityId: string | undefined,
  fallback?: DormCardData,
): UseFacilityDetailsReturn {
  const [facility, setFacility] = useState<FacilityDetailsData | null>(
    fallback ? mapFromCard(fallback) : null,
  );
  const [isLoading, setIsLoading] = useState(Boolean(facilityId));
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const fallbackKey = useMemo(() => JSON.stringify(fallback ?? null), [fallback]);
  const refetch = () => setFetchCount((count) => count + 1);

  useEffect(() => {
    const loadKey = `${facilityId ?? 'none'}:${fetchCount}:${fallbackKey}`;
    void loadKey;

    if (!facilityId) {
      setIsLoading(false);
      setError('No facility was selected.');
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [facilityResponse, tagsResponse, reviewsResponse] = await Promise.all([
          FacilityService.getFacility(facilityId),
          api.get<{ data: TagDefinition[] }>('/api/tags'),
          api.get<{ data: RawReview[] }>(`/api/facilities/${facilityId}/reviews`),
        ]);
        if (!cancelled) {
          setFacility(
            mapFromFacility(
              facilityResponse.data,
              tagsResponse.data.data,
              reviewsResponse.data.data.map(mapReview),
              fallback,
            ),
          );
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load facility details.';
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
  }, [facilityId, fetchCount, fallbackKey, fallback]);

  return { facility, isLoading, error, refetch };
}
