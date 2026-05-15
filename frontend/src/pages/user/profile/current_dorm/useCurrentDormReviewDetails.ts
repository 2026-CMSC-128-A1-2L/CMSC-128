import { useEffect, useState } from 'react';
import placeholderImage from '../../../../../assets/one_sapphire_place.png';
import { ApplicationService } from '../../../../service/ApplicationService';
import { FacilityService } from '../../../../service/FacilityService';
import { UserService } from '../../../../service/UserService';

type EntityRef = string | Record<string, unknown> | null | undefined;

type CurrentDormSource = {
  id?: unknown;
  _id?: unknown;
  status?: string;
  facilityId?: EntityRef;
  listingId?: EntityRef;
  unitId?: EntityRef;
  applicationId?: EntityRef;
  leaseDuration?: '6-months' | '12-months';
  moveInDate?: string;
  expectedMoveOutDate?: string;
  actualMoveOutDate?: string;
};

type FacilityResponse = {
  id?: unknown;
  _id?: unknown;
  name?: string;
  location?: { text?: string };
  media?: { value?: string }[];
  landlord?: Person;
  managers?: Person[];
  listings?: {
    id?: unknown;
    _id?: unknown;
    roomType?: string;
    name?: string;
    tags?: Record<string, string | number | boolean>;
  }[];
};

type Person = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

export type CurrentDormReviewDetails = {
  facilityId?: string;
  listingId?: string;
  dormitoryName: string;
  dormitoryAddress: string;
  dormitoryImage: string;
  landlordName: string;
  managerName: string;
  roomNumber: string;
  roomType: string;
  contractLabel: string;
  tags: string[];
};

const getDataArray = <T>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const getDataObject = <T>(response: unknown): T | undefined => {
  if (!response || typeof response !== 'object') return undefined;
  if ('data' in response) return (response as { data?: T }).data;
  return response as T;
};

const getId = (value: EntityRef): string | undefined => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return undefined;
  const id = value.id ?? value._id;
  return typeof id === 'string' ? id : id ? String(id) : undefined;
};

const getSourceId = (value?: CurrentDormSource) => {
  const id = value?.id ?? value?._id;
  return typeof id === 'string' ? id : id ? String(id) : undefined;
};

const getName = (person?: Person) => {
  const name = [person?.firstName, person?.middleName, person?.lastName].filter(Boolean).join(' ');
  return name || undefined;
};

const formatDate = (date?: string | Date | null) => {
  if (!date) return undefined;
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return undefined;
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getLeaseEndDate = (moveInDate?: string, leaseDuration?: '6-months' | '12-months') => {
  if (!moveInDate || !leaseDuration) return undefined;
  const parsedDate = new Date(moveInDate);
  if (Number.isNaN(parsedDate.getTime())) return undefined;
  parsedDate.setMonth(parsedDate.getMonth() + (leaseDuration === '6-months' ? 6 : 12));
  return formatDate(parsedDate);
};

const getContractLabel = (source?: CurrentDormSource) => {
  if (source?.leaseDuration === '6-months') return 'Contract: 6 Months';
  if (source?.leaseDuration === '12-months') return 'Contract: 1 Year';
  const leaseEnd = getLeaseEndDate(source?.moveInDate, source?.leaseDuration);
  const fallbackEnd = formatDate(source?.actualMoveOutDate ?? source?.expectedMoveOutDate);
  return leaseEnd || fallbackEnd ? `Lease End: ${leaseEnd ?? fallbackEnd}` : 'Current Lease';
};

const getRoomLabel = (listing?: EntityRef) => {
  if (!listing || typeof listing !== 'object') return 'Selected Room';
  return (
    (typeof listing.name === 'string' && listing.name) ||
    (typeof listing.roomType === 'string' && listing.roomType) ||
    'Selected Room'
  );
};

const getRoomNumber = (unit?: EntityRef, listing?: EntityRef) => {
  if (unit && typeof unit === 'object' && typeof unit.roomNumber === 'string') {
    return `Room ${unit.roomNumber}`;
  }
  return getRoomLabel(listing);
};

const getFacilityAddress = (facilityRef?: EntityRef) => {
  if (!facilityRef || typeof facilityRef !== 'object') return undefined;
  const location = facilityRef.location;
  if (!location || typeof location !== 'object') return undefined;
  return 'text' in location && typeof location.text === 'string' ? location.text : undefined;
};

const buildTags = (details: { roomType: string; unit?: EntityRef; source?: CurrentDormSource }) => {
  const tags = [details.roomType];
  if (
    details.unit &&
    typeof details.unit === 'object' &&
    typeof details.unit.location === 'string'
  ) {
    tags.push(details.unit.location);
  }
  tags.push(getContractLabel(details.source));
  return tags.filter(Boolean);
};

const mapDetails = (
  source: CurrentDormSource,
  facility?: FacilityResponse,
): CurrentDormReviewDetails => {
  const listingId = getId(source.listingId);
  const listingFromFacility = facility?.listings?.find((listing) => getId(listing) === listingId);
  const listing = source.listingId;
  const unit = source.unitId;
  const roomType =
    getRoomLabel(listing) !== 'Selected Room'
      ? getRoomLabel(listing)
      : listingFromFacility?.name || listingFromFacility?.roomType || 'Selected Room';

  return {
    facilityId: getId(source.facilityId) ?? getId(facility),
    listingId,
    dormitoryName:
      (source.facilityId &&
        typeof source.facilityId === 'object' &&
        typeof source.facilityId.name === 'string' &&
        source.facilityId.name) ||
      facility?.name ||
      'Current Dorm',
    dormitoryAddress:
      getFacilityAddress(source.facilityId) || facility?.location?.text || 'Address unavailable',
    dormitoryImage:
      (source.facilityId &&
        typeof source.facilityId === 'object' &&
        Array.isArray(source.facilityId.media) &&
        source.facilityId.media[0]?.value) ||
      facility?.media?.[0]?.value ||
      placeholderImage,
    landlordName: getName(facility?.landlord) ?? 'Dorm Landlord',
    managerName: getName(facility?.managers?.[0]) ?? 'Dorm Manager',
    roomNumber: getRoomNumber(unit, listing),
    roomType,
    contractLabel: getContractLabel(source),
    tags: buildTags({ roomType, unit, source }),
  };
};

const findRelatedApplication = (
  rental: CurrentDormSource | undefined,
  applications: CurrentDormSource[],
) => {
  if (!rental) {
    return (
      applications.find((application) => application.status === 'finalized') ??
      applications.find((application) => application.status === 'approved') ??
      applications[0]
    );
  }

  const rentalApplicationId = getId(rental.applicationId);
  const rentalFacilityId = getId(rental.facilityId);
  const rentalUnitId = getId(rental.unitId);

  return (
    applications.find((application) => getSourceId(application) === rentalApplicationId) ??
    applications.find(
      (application) =>
        getId(application.facilityId) === rentalFacilityId &&
        (!rentalUnitId || getId(application.unitId) === rentalUnitId),
    ) ??
    applications.find((application) => getId(application.facilityId) === rentalFacilityId)
  );
};

const mergeDormSources = (
  rental: CurrentDormSource | undefined,
  application: CurrentDormSource | undefined,
) => {
  if (!rental) return application;
  if (!application) return rental;

  return {
    ...rental,
    ...application,
    status: rental.status,
    expectedMoveOutDate: rental.expectedMoveOutDate,
    actualMoveOutDate: rental.actualMoveOutDate,
  };
};

export const useCurrentDormReviewDetails = () => {
  const [details, setDetails] = useState<CurrentDormReviewDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCurrentDorm = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [rentalsResponse, applicationsResponse] = await Promise.allSettled([
          UserService.getMyRentals(),
          ApplicationService.getMyApplications({ limit: 50 }),
        ]);

        const rentals =
          rentalsResponse.status === 'fulfilled'
            ? getDataArray<CurrentDormSource>(rentalsResponse.value)
            : [];
        const applications =
          applicationsResponse.status === 'fulfilled'
            ? getDataArray<CurrentDormSource>(applicationsResponse.value)
            : [];

        const activeRental =
          rentals.find((rental) => rental.status === 'active') ??
          rentals.find((rental) => rental.status === 'inactive');
        const relatedApplication = findRelatedApplication(activeRental, applications);
        const source = mergeDormSources(activeRental, relatedApplication);

        if (!source) {
          if (!cancelled) {
            setDetails(null);
            setError('No current dorm was found for this account.');
          }
          return;
        }

        const facilityId = getId(source.facilityId);
        const facilityResponse = facilityId
          ? await FacilityService.getFacility(facilityId).catch(() => undefined)
          : undefined;
        const facility = getDataObject<FacilityResponse>(facilityResponse);

        if (!cancelled) setDetails(mapDetails(source, facility));
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Could not load current dorm details.';
          setError(message);
          setDetails(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadCurrentDorm();
    return () => {
      cancelled = true;
    };
  }, []);

  return { details, isLoading, error };
};
