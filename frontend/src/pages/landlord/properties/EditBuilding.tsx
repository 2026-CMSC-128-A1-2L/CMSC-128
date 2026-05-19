import { Icon } from '@iconify/react';
import { type FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageBackground from '../../../components/general/PageBackground';
import BuildingInformation from '../../../components/landlord/addbuilding/BuildingInformation';
import BuildingSubmit from '../../../components/landlord/addbuilding/BuildingSubmit';
import {
  DEFAULT_BUILDING_COORDINATES,
  type RequirementItem,
  type RoomData,
  type RoomTypeData,
  useBuildingStore,
} from '../../../components/landlord/addbuilding/useBuildingStore';
import ProgressBar from '../../../components/user/ProgressBar';
import { FacilityService } from '../../../service/FacilityService';
import type { GetFacilityResponse } from '../../../interface/facility';

type MediaItem = {
  value?: string;
};

type FacilityDocument = {
  docId: string;
  name: string;
  files?: string[];
};

type FacilityListing = GetFacilityResponse['listings'][number] & {
  units?: Array<{
    id?: string;
    _id?: string;
    roomNumber?: string;
    room_number?: string;
    isAvailable?: boolean;
    currentOccupancy?: number;
    current_occupants?: number;
    occupants?: string[];
  }>;
};

const requirementLabels: Record<string, string> = {
  valid_id: 'Valid ID',
  business_permit: 'Business Permit',
  dti_registration: 'DTI Business Name Registration',
  bir_cert: 'BIR Certificate of Registration',
  tenancy_contract: 'Tenancy Contract Template',
};

const requirementIds = Object.keys(requirementLabels);

const mediaValues = (media?: MediaItem[]) =>
  (media ?? []).map((item) => item.value).filter((value): value is string => Boolean(value));

const toRequirementItems = (documents: FacilityDocument[] | undefined): RequirementItem[] => {
  const documentsById = new Map((documents ?? []).map((document) => [document.docId, document]));

  return requirementIds.map((id) => {
    const document = documentsById.get(id);

    return {
      id,
      label: document?.name ?? requirementLabels[id],
      file: null,
      fileKey: document?.files?.[0] ?? null,
      date: null,
    };
  });
};

const toRoomData = (unit: FacilityListing['units'][number], index: number): RoomData => ({
  id: unit.id ?? unit._id ?? crypto.randomUUID(),
  number: unit.roomNumber ?? unit.room_number ?? String(index + 1),
  isAvailable: unit.isAvailable ?? true,
  current_occupants: unit.currentOccupancy ?? unit.current_occupants ?? 0,
  user_occupant: unit.occupants ?? [],
});

const toRoomTypes = (listings: GetFacilityResponse['listings']): RoomTypeData[] =>
  (listings as FacilityListing[]).map((listing) => {
    const monthlyPrice =
      typeof listing.tags?.monthly_price === 'number'
        ? listing.tags.monthly_price
        : typeof listing.cost?.rent === 'number'
          ? listing.cost.rent
          : '';

    return {
      id: listing.id,
      name: listing.name || listing.roomType,
      roomType: listing.roomType,
      capacity: String(listing.capacity ?? ''),
      price: String(monthlyPrice),
      tags: [],
      about: listing.description ?? '',
      images: mediaValues(listing.media),
      imageFiles: [],
      rooms: (listing.units ?? []).map(toRoomData),
    };
  });

const EditBuilding: FunctionComponent = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const { reset, setBuildingInfo } = useBuildingStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => ['Building Information', 'Review Changes'], []);

  const onCancelClick = useCallback(() => {
    navigate(propertyId ? `/landlord/properties/${propertyId}` : '/landlord/properties');
  }, [navigate, propertyId]);

  const onNextClick = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const onPrevClick = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 0) {
        navigate(propertyId ? `/landlord/properties/${propertyId}` : '/landlord/properties');
        return prev;
      }

      return prev - 1;
    });
  }, [navigate, propertyId]);

  useEffect(() => {
    if (!propertyId) {
      setError('No property was selected for editing.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadFacility = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await FacilityService.getFacility(propertyId);
        const facility = response.data;
        const roomTypes = toRoomTypes(facility.listings);

        if (!isMounted) return;

        reset();
        setBuildingInfo({
          id: propertyId,
          name: facility.name ?? '',
          typeOfBuilding: facility.type ?? '',
          location: facility.location?.text ?? '',
          locationCoordinates: facility.location?.coordinates ?? DEFAULT_BUILDING_COORDINATES,
          about: facility.description ?? '',
          images: mediaValues(facility.media),
          imageFiles: [],
          roomTypes:
            roomTypes.length > 0
              ? roomTypes
              : [
                  {
                    id: crypto.randomUUID(),
                    name: '',
                    roomType: '',
                    capacity: '',
                    price: '',
                    tags: [],
                    about: '',
                    images: [],
                    imageFiles: [],
                    rooms: [],
                  },
                ],
          requirements: toRequirementItems(
            'documents' in facility ? (facility.documents as FacilityDocument[]) : undefined,
          ),
          managers: [],
          allowPasalo: facility.allowTransfer ?? false,
          allowOcularVisit: facility.allowVisit ?? false,
        });
      } catch (loadError) {
        console.error('Failed to load property for editing:', loadError);

        if (isMounted) {
          setError('We could not load this property for editing. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadFacility();

    return () => {
      isMounted = false;
    };
  }, [propertyId, reset, setBuildingInfo]);

  const renderStepContent = () => {
    if (!propertyId) return null;

    switch (currentStep) {
      case 0:
        return <BuildingInformation onNextClick={onNextClick} onPrevClick={onPrevClick} />;
      case 1:
        return <BuildingSubmit mode="edit" facilityId={propertyId} onPrevClick={onPrevClick} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-transparent font-inter dark:text-[#d7e0ef]">
      <PageBackground />
      <div className="relative z-10 max-h-screen overflow-y-auto px-10 pt-4 pb-12 lg:px-20">
        <button
          type="button"
          className="group flex w-fit cursor-pointer items-center gap-1.5 py-4 text-darkgreen dark:text-[#d7e0ef]"
          onClick={onCancelClick}
        >
          <Icon icon="material-symbols-light:chevron-left" className="w-7 h-7" />
          <div className="relative">
            <span className="text-sm font-semibold">Cancel</span>
            <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 rounded-full bg-darkgreen transition-all duration-300 ease-out group-hover:w-full dark:bg-[#72cbb8]" />
          </div>
        </button>

        <div className="rounded-3xl border border-whitesmoke px-6 pt-8 pb-10 shadow-sm dark:border-[#343737] dark:bg-[#101111]/80 md:px-10">
          <h1 className="text-2xl font-bold text-[#1a5c50] dark:text-[#72cbb8]">
            Edit Building
          </h1>
          <p className="mt-1 text-sm font-semibold text-black dark:text-[#edf6f4]">
            Update the property information and review the changes before saving.
          </p>

          <div className="w-full h-px my-6" />

          {isLoading ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-whitesmoke bg-white/70 dark:border-[#343737] dark:bg-[#141515]">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#096c5b] dark:text-[#72cbb8]">
                <Icon icon="svg-spinners:180-ring" className="h-5 w-5" />
                Loading building details...
              </div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-sm font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-start relative w-full">
              <div className="sticky top-10 self-start w-full md:w-[180px] shrink-0">
                <ProgressBar
                  currentStepIndex={currentStep}
                  orientation="vertical"
                  steps={steps.map((label, index) => ({ key: `${index}-${label}`, label }))}
                />
              </div>
              <div className="flex-1 min-w-0 w-full">{renderStepContent()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBuilding;
