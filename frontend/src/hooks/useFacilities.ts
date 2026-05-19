import { useEffect, useState } from 'react';
import { FacilityService } from '../service/FacilityService';
import type { GetFacilitiesResponse } from '../interface/facility';

// Shape that DormCard consumes
export type DormCardData = {
  id: string;
  name: string;
  rating: string;
  price: { min: number; max: number };
  location: string;
  coordinates?: { lat: number; long: number };
  image: string;
  propertyType: string;                  // ← new
  isAcceptingApplications: boolean;      // ← new
  room_types: {
    id?: string;
    pax: string;
    price: number;
    unitCount?: number;
    availableUnitCount?: number;
  }[];
};

// GetFacilitiesResponse is an array of ManagerFacilitySchema | UserFacilitySchema.
// Both extend BaseUserFacilitySchema so `id`, `name`, `location` are always present.
// UserFacilitySchema adds `averageRating`, `image`, `price`.
// ManagerFacilitySchema / UserFacilityDetailedSchema adds `media`.
type FacilityItem = GetFacilitiesResponse[number];
type FacilityListingSummary = {
  id?: unknown;
  name: string;
  price: {
    min: number;
    max: number;
  };
  unitCount?: number;
  availableUnitCount?: number;
};
type FacilityListItem = FacilityItem & {
  listings?: FacilityListingSummary[];
};

function mapToCardData(facility: FacilityItem): DormCardData {
  const hasUserFields = 'averageRating' in facility;
  const hasMedia = 'media' in facility;
  const facilityWithListings = facility as FacilityListItem;

  // Image: prefer explicit `image` field (UserFacilitySchema),
  // then first media item (detailed schemas), then placeholder.
  let image = 'https://placehold.co/280x120?text=No+image';
  if (hasUserFields && (facility as { image?: string }).image) {
    image = (facility as { image: string }).image;
  } else if (hasMedia) {
    const media = (facility as { media: { value: string }[] }).media;
    if (media?.[0]?.value) image = media[0].value;
  }

  // Rating: present on UserFacilitySchema as a number; absent on detailed schemas
  const rating = hasUserFields
    ? ((facility as { averageRating: number }).averageRating ?? 0).toFixed(1)
    : '—';

  // Price: present on UserFacilitySchema; stub 0/0 for detailed schemas
  const listingPrices =
    facilityWithListings.listings
      ?.flatMap((listing: FacilityListingSummary) => [listing.price.min, listing.price.max])
      .filter((price: number) => price > 0) ?? [];
  const price =
    hasUserFields && 'price' in facility
      ? (facility as { price: { min: number; max: number } }).price
      : {
          min: listingPrices.length > 0 ? Math.min(...listingPrices) : 0,
          max: listingPrices.length > 0 ? Math.max(...listingPrices) : 0,
        };
  const roomTypes =
    facilityWithListings.listings?.map((listing: FacilityListingSummary) => ({
      id: typeof listing.id === 'string' ? listing.id : String(listing.id ?? ''),
      pax: listing.name,
      price: listing.price.min,
      unitCount: listing.unitCount,
      availableUnitCount: listing.availableUnitCount,
    })) ?? [];

  return {
    id: facility.id as string,
    name: facility.name,
    location: facility.location.text,
    coordinates: facility.location.coordinates ?? undefined, // ← add this
    image,
    rating,
    price,
    room_types: roomTypes,propertyType: (facility as { type?: string }).type ?? 'Dormitory',         
    isAcceptingApplications: (facility as { isAcceptingApplications?: boolean }).isAcceptingApplications ?? true,                                             // ← new
  };
}

type UseFacilitiesReturn = {
  facilities: DormCardData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFacilities(): UseFacilitiesReturn {
  const [facilities, setFacilities] = useState<DormCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = () => setFetchCount((n) => n + 1);

  useEffect(() => {
    void fetchCount;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // FacilityService.getFacilities() → { data: GetFacilitiesResponse }
        const response = await FacilityService.getFacilities();
        if (!cancelled) {
          setFacilities(response.data.map(mapToCardData));
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load facilities.';
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
  }, [fetchCount]);

  return { facilities, isLoading, error, refetch };
}
