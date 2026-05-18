import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import RoomtypeModal, {
  type ApiUnit,
  type ApiListing,
} from '../../../components/landlord/LandlordProperties/RoomtypeModal';
import { FacilityService } from '../../../service/FacilityService';
import { UnitService } from '../../../service/UnitService';

// ─── Local types mapped from API responses ─────────────────────────────────

type FacilityListing = {
  id: string;
  name: string;
  roomType: string;
  description?: string;
  cost: { rent: number; estimatedUtilities: number; securityDeposit: number };
  unitCount: number;
  availableUnitCount: number;
  media: { sourceType: string; value: string }[];
};

type FacilityManager = {
  id: string;
  profilePicture?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
};

type FacilityTenant = {
  id: string;
  displayName: string;
  unit: string;
  billingStatus: string;
};

type ApiFacility = {
  id: string;
  name: string;
  location: { text: string; coordinates?: { lat: number; long: number } };
  description: string;
  type: string;
  media: { sourceType: string; value: string }[];
  listings: FacilityListing[];
  managers: FacilityManager[];
  allowVisit: boolean;
  allowTransfer: boolean;
  capacity?: number;
};

// ─── Helpers ───────────────────────────────────────────────────────────────

const mediaToUrl = (media: { sourceType: string; value: string }) =>
  media.sourceType === 'local'
    ? `/api/files/public?key=${encodeURIComponent(media.value)}`
    : media.value;

const formatManagerName = (m: FacilityManager) =>
  [m.firstName, m.middleName, m.lastName].filter(Boolean).join(' ');

// ─── Sub-components ────────────────────────────────────────────────────────

const Button = ({
  text,
  children,
  onClick,
}: {
  text: string;
  children?: React.ReactElement;
  onClick?: React.MouseEventHandler;
}) => (
  <button
    type="button"
    className="cursor-pointer rounded-xl border-teal border-solid border flex items-center justify-center py-2 px-4 gap-2 hover:text-whitesmoke-200 hover:bg-teal"
    onClick={onClick}
  >
    <b>{text}</b>
    {children}
  </button>
);

const TextField = ({
  text,
  id,
  className,
  value,
}: {
  text: string;
  id: string;
  className: string;
  value: string;
}) => (
  <div className={`${className} flex flex-col gap-3 min-w-0 cursor-pointer`}>
    <label htmlFor={id} className="truncate">
      <b>{text}</b>
    </label>
    <input
      className="w-full rounded-xl bg-aliceblue border-whitesmoke-200 border-solid border py-4 px-4 text-slategray font-medium"
      id={id}
      value={value}
      disabled
      readOnly
    />
  </div>
);

const ManagerList = ({ managers }: { managers: FacilityManager[] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 gap-2.5">
    <b>Managers</b>
    {managers.length === 0 ? (
      <p className="text-sm text-dimgray">No managers assigned.</p>
    ) : (
      <div className="self-stretch flex flex-col gap-2 text-sm text-black">
        {managers.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center gap-2.5">
            <div className="font-medium">{formatManagerName(m)}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const TenantList = ({ tenants }: { tenants: FacilityTenant[] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 gap-2.5">
    <b>Tenants</b>
    {tenants.length === 0 ? (
      <p className="text-sm text-dimgray">No active tenants.</p>
    ) : (
      <div className="self-stretch flex flex-col gap-2 text-sm text-black">
        {tenants.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-2.5">
            <div className="font-medium">{t.displayName}</div>
            <div className="font-medium text-dimgray">{t.unit}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AddListingCard = () => (
  <div className="w-full sm:w-66 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-num-10 bg-silver-100 border-silver-200 border-dashed border-2 flex flex-col items-center justify-center py-4 px-8 text-center text-teal h-56">
    <div className="flex flex-col items-center gap-4">
      <Icon icon="material-symbols:add-rounded" className="w-15 h-15" />
      <div className="flex flex-col items-center gap-1">
        <b>Add New Listing</b>
        <div className="text-sm font-medium text-dimgray">
          Add a new listing/room type under this building
        </div>
      </div>
    </div>
  </div>
);

// ─── ListingCard ───────────────────────────────────────────────────────────

const ListingCard = ({
  facilityName,
  listing,
  onOpen,
}: {
  facilityName: string;
  listing: FacilityListing;
  onOpen: (listing: ApiListing) => void;
}) => {
  const image =
    listing.media.length > 0
      ? mediaToUrl(listing.media[0])
      : 'https://placehold.co/264x144?text=No+image';

  return (
    <div className="relative h-56 w-66 overflow-hidden rounded-[15.31px] border border-solid border-whitesmoke bg-white text-left text-black font-inter shadow-sm transition-shadow duration-200 hover:shadow-lg">
      <button
        type="button"
        className="flex h-full w-full cursor-pointer flex-col items-start border-0 bg-transparent p-0 text-left"
        onClick={() => onOpen({ id: listing.id, name: listing.name, image })}
      >
        <img className="h-36 w-full object-cover" src={image} alt={listing.name} />
        <div className="flex w-full flex-1 flex-col px-3 py-1.5">
          <b className="w-full truncate text-num-14 leading-5 text-black">{listing.name}</b>
          <div className="mt-1 flex w-full items-center gap-1 text-left text-num-10 font-semibold text-dimgray">
            <Icon icon="ri:door-open-line" className="h-3.5 w-3.5 shrink-0 text-[#096c5b]" />
            <div className="min-w-0 flex-1 truncate">
              {listing.availableUnitCount}/{listing.unitCount} available
            </div>
          </div>
          {listing.cost.rent > 0 && (
            <div className="text-num-10 font-semibold text-dimgray">
              ₱{listing.cost.rent.toLocaleString()}/mo
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────

const BuildingInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const facilityStatus: string | undefined = (location.state as any)?.facilityStatus;
  const facilityCapacity: number | undefined = (location.state as any)?.facilityCapacity;

  const [facility, setFacility] = useState<ApiFacility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tenants, setTenants] = useState<FacilityTenant[]>([]);

  const [selectedListing, setSelectedListing] = useState<ApiListing | null>(null);
  const [modalUnits, setModalUnits] = useState<ApiUnit[]>([]);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);
  const [unitCache, setUnitCache] = useState<Record<string, ApiUnit[]>>({});

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [facilityRes, tenantsRes] = await Promise.all([
          FacilityService.getFacility(id),
          FacilityService.getTenants(),
        ]);
        if (!cancelled) {
          setFacility(facilityRes.data as ApiFacility);
          const facilityTenants = (tenantsRes as any[]).filter(
            (t: any) => t.facilityId?.toString() === id,
          );
          setTenants(
            facilityTenants.map((t: any) => ({
              id: t.id,
              displayName: t.displayName,
              unit: t.unit,
              billingStatus: t.billingStatus,
            })),
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load facility.');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const openListingModal = useCallback(
    async (listing: ApiListing) => {
      setSelectedListing(listing);
      if (unitCache[listing.id]) {
        setModalUnits(unitCache[listing.id]);
        return;
      }
      setIsLoadingUnits(true);
      try {
        const res = await UnitService.getUnitsByListing(listing.id);
        const units: ApiUnit[] = (res.data ?? []).map((u: any) => ({
          _id: u._id,
          roomNumber: u.roomNumber,
          isAvailable: u.isAvailable,
          currentRentals: u.currentRentals,
          capacity: u.capacity,
          price: u.price,
        }));
        setUnitCache((prev) => ({ ...prev, [listing.id]: units }));
        setModalUnits(units);
      } catch {
        setModalUnits([]);
      } finally {
        setIsLoadingUnits(false);
      }
    },
    [unitCache],
  );

  const closeModal = useCallback(() => {
    setSelectedListing(null);
    setModalUnits([]);
  }, []);

  if (isLoading) {
    return (
      <LandlordLayout
        activeSidebarItem="properties"
        breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }]}
      >
        <div className="flex w-full flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div className="h-[360px] animate-pulse rounded-2xl bg-[#e8f0ef] dark:bg-[#242928]" />
            <div className="flex flex-col gap-4 rounded-2xl border border-[#f0f0f0] bg-white p-6 dark:border-[#303331] dark:bg-[#141515]">
              <div className="h-7 w-2/3 animate-pulse rounded-lg bg-[#e8f0ef] dark:bg-[#242928]" />
              <div className="h-4 w-full animate-pulse rounded-lg bg-[#e8f0ef] dark:bg-[#242928]" />
              <div className="h-4 w-3/4 animate-pulse rounded-lg bg-[#e8f0ef] dark:bg-[#242928]" />
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-20 animate-pulse rounded-xl bg-[#e8f0ef] dark:bg-[#242928]" />
                <div className="h-20 animate-pulse rounded-xl bg-[#e8f0ef] dark:bg-[#242928]" />
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-28 animate-pulse rounded-xl bg-[#e8f0ef] dark:bg-[#242928]" />
            <div className="h-28 animate-pulse rounded-xl bg-[#e8f0ef] dark:bg-[#242928]" />
            <div className="h-28 animate-pulse rounded-xl bg-[#e8f0ef] dark:bg-[#242928]" />
          </div>
        </div>
      </LandlordLayout>
    );
  }

  if (error || !facility) {
    return (
      <LandlordLayout
        activeSidebarItem="properties"
        breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }]}
      >
        <div className="flex items-center justify-center h-64 text-gray-500">
          {error ?? 'Facility not found.'}
        </div>
      </LandlordLayout>
    );
  }

  const totalUnits = facility.listings.reduce((sum, l) => sum + l.unitCount, 0);
  const capacity = facility.capacity ?? facilityCapacity ?? totalUnits;

  const statusLabel = facilityStatus
    ? facilityStatus === 'approved'
      ? 'Active'
      : facilityStatus.charAt(0).toUpperCase() + facilityStatus.slice(1)
    : '—';

  const photos = facility.media.map(mediaToUrl);

  return (
    <LandlordLayout
      activeSidebarItem="properties"
      breadcrumbs={[
        { label: 'Properties', to: '/landlord/properties' },
        { label: facility.name },
      ]}
    >
      {selectedListing && (
        <RoomtypeModal
          openModal={true}
          closeModal={closeModal}
          facilityName={facility.name}
          listing={selectedListing}
          units={modalUnits}
          isLoadingUnits={isLoadingUnits}
        />
      )}

      <div className="w-full flex flex-col items-start gap-5 text-dimgray font-inter">
        <div className="w-full flex flex-wrap items-center gap-5 sm:gap-10 text-2xl text-gray border-b-2 border-b-whitesmoke py-4">
          <b className="truncate">{facility.name}</b>
          <div className="flex items-center gap-4 text-sm text-teal flex-wrap">
            <Button text="Edit Details" onClick={() => navigate(`/landlord/properties/edit/${id}`)}>
              <Icon icon="iconamoon:edit" className="w-5 h-5" />
            </Button>
            <Button text="View As Student" onClick={() => {}}>
              <Icon icon="iconamoon:eye-light" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 py-2.5 px-2.5">
          <div className="text-lg text-teal font-bold">Building Information</div>

          <div className="w-full flex flex-col gap-4 text-sm text-dimgray">
            <div className="w-full flex flex-col md:flex-row items-start gap-4">
              <TextField className="w-full md:flex-4" text="Name" id="name" value={facility.name} />
              <TextField
                className="w-full md:flex-3"
                text="Type of Building"
                id="building-type"
                value={facility.type}
              />
              <TextField
                className="w-full md:flex-2"
                text="Status"
                id="status"
                value={statusLabel}
              />
              <TextField
                className="w-full md:flex-1"
                text="Capacity"
                id="capacity"
                value={capacity.toString()}
              />
            </div>
            <TextField
              className="w-full"
              text="Location"
              id="location"
              value={facility.location.text}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <b>About</b>
            <div className="w-full rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border py-3 px-4 text-sm text-slategray leading-6 font-medium whitespace-pre-wrap break-words">
              {facility.description}
            </div>
          </div>

          {photos.length > 0 && (
            <div className="flex flex-col gap-2.5 p-2.5">
              <b>Photos</b>
              <div className="flex flex-wrap gap-2.5">
                {photos.map((url, index) => (
                  <div
                    key={`${url}-${index}`}
                    className="h-25 w-25 rounded-num-12 border-whitesmoke-200 border-solid border overflow-hidden shrink-0"
                  >
                    <img
                      src={url}
                      alt={`${facility.name} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <b>Room Types</b>
              <div className="w-full flex flex-wrap gap-4">
                {facility.listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    facilityName={facility.name}
                    listing={listing}
                    onOpen={openListingModal}
                  />
                ))}
                <AddListingCard />
              </div>
            </div>
          </div>

          <ManagerList managers={facility.managers} />
          <TenantList tenants={tenants} />
        </div>
      </div>
    </LandlordLayout>
  );
};

export default BuildingInfo;
