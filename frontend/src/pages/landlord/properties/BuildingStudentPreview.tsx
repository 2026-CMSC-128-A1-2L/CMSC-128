import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbHeader from '../../../components/general/Breadcrumb';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import AboutDetails from '../../../components/user/unitdetails/AboutDetails';
import AmenetiesDetails from '../../../components/user/unitdetails/AmenetiesDetails';
import ImageCarousel from '../../../components/user/unitdetails/ImageCarousel';
import LocationDetails from '../../../components/user/unitdetails/LocationDetails';
import PropertyTab from '../../../components/user/unitdetails/PropertyTab';
import PropertyTabs from '../../../components/user/unitdetails/PropertyTabs';
import ReviewDetails from '../../../components/user/unitdetails/ReviewDetails';
import RulesDetails from '../../../components/user/unitdetails/RulesDetails';
import { useFacilityDetails } from '../../../hooks/useFacilityDetails';
import LoadingPage from '../../general/LoadingPage';

const currencyFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
});

const roomButtonLabel = (label: string) => label.replace(/\s*\([^)]*\)\s*$/, '');

const amenityTagIcons: Record<string, string> = {
  hasWifi: 'material-symbols:wifi',
  hasAircon: 'material-symbols:snowflake',
  hasCctv: 'boxicons:cctv',
  hasLaundry: 'streamline:hotel-laundry',
  securityGuard: 'carbon:police',
  hasStudyDesk: 'boxicons:desk',
  hasRefrigerator: 'mdi:refrigerator-outline',
  hasKitchen: 'emojione-monotone:kitchen-knife',
};

const amenityTagNames = Object.keys(amenityTagIcons);
const ruleTagNames = ['visitorPolicy', 'smokingPolicy', 'petsPolicy', 'curfew', 'paymentPolicy'];
const aboutTagNames = [
  'layout',
  'floorAreaSqm',
  'floorLevel',
  'bathroom',
  'furnishing',
  'genderPolicy',
  'leaseTerm',
  'moveInPolicy',
];

const formatTagValue = (value: string | number | boolean) => {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value.toLocaleString();
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
};

const SkeletonLine = ({ className = '' }: { className?: string }) => (
  <div className={`rounded-md bg-silver-100 ${className}`} aria-hidden="true" />
);

const PreviewApplyCard = ({
  rooms,
  selectedRoomId,
  onSelectRoom,
  primaryRent,
}: {
  rooms: { id: string; label: string }[];
  selectedRoomId: string;
  onSelectRoom: (id: string) => void;
  primaryRent: number;
}) => {
  const estimatedUtilities = primaryRent > 0 ? Math.round(primaryRent * 0.15) : 0;
  const securityDeposit = primaryRent > 0 ? primaryRent * 2 : 0;
  const moveInCost = primaryRent + estimatedUtilities + securityDeposit;

  return (
    <div className="w-full xl:w-[340px] shrink-0 bg-white border border-whitesmoke-300 rounded-xl flex flex-col p-5 gap-5 text-sm font-inter">
      <div className="flex items-center gap-2 text-xl text-black">
        <Icon icon="ri:grid-fill" className="h-5 w-5" />
        <b>Apply</b>
      </div>

      <div className="flex flex-col gap-4 text-gray font-lora text-xs">
        <div className="flex flex-col gap-1.5">
          <div className="font-medium">Rooms Available</div>
          <div className="grid grid-cols-1 gap-2 text-black sm:grid-cols-2 xl:grid-cols-1">
            {rooms.length > 0 ? (
              rooms.map((room) => {
                const isSelected = selectedRoomId === room.id;

                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => onSelectRoom(room.id)}
                    className={`rounded-lg border py-2 px-3 text-center font-semibold text-xs shadow transition-colors ${
                      isSelected
                        ? 'border-darkslategray-200 bg-darkslategray-200 text-white'
                        : 'border-transparent bg-white text-black hover:bg-lightcyan'
                    } cursor-pointer`}
                  >
                    {roomButtonLabel(room.label)}
                  </button>
                );
              })
            ) : (
              <SkeletonLine className="h-9 w-full" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="font-medium">Lease Duration</div>
          <SkeletonLine className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-medium">Preferred Move-in Date</div>
          <SkeletonLine className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-medium">
            Message to Landlord <span className="text-silver">(optional)</span>
          </div>
          <SkeletonLine className="h-20 w-full" />
        </div>

        <div className="shadow rounded-lg bg-whitesmoke-200 flex flex-col p-3 gap-1 text-dimgray font-poppins text-xs">
          {[
            ['Monthly Rent', primaryRent > 0 ? currencyFormatter.format(primaryRent) : 'TBA'],
            [
              'Est. Utilities',
              estimatedUtilities > 0 ? currencyFormatter.format(estimatedUtilities) : 'TBA',
            ],
            [
              'Security Deposit',
              securityDeposit > 0 ? currencyFormatter.format(securityDeposit) : 'TBA',
            ],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
          <div className="h-px bg-gray-200 my-1" />
          <div className="flex justify-between font-bold text-gray">
            <span>Est. Move-in Cost</span>
            <span>{moveInCost > 0 ? currencyFormatter.format(moveInCost) : 'TBA'}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled
        className="w-full rounded-lg bg-silver-100 flex items-center justify-center gap-2 py-3 px-4 text-white"
      >
        <span className="font-medium text-sm">Submit Application</span>
        <Icon icon="formkit:arrowright" className="h-5 w-5" />
      </button>
      <div className="flex flex-col items-center gap-1">
        <SkeletonLine className="h-3 w-44" />
        <SkeletonLine className="h-3 w-36" />
      </div>
    </div>
  );
};

const BuildingStudentPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { facility, isLoading, error, refetch } = useFacilityDetails(id);
  const [selectedListingId, setSelectedListingId] = useState('');

  const availableListings = useMemo(() => facility?.listings ?? [], [facility]);
  const selectedListing =
    availableListings.find((listing) => listing.id === selectedListingId) ?? availableListings[0];

  useEffect(() => {
    if (selectedListing && selectedListing.id !== selectedListingId) {
      setSelectedListingId(selectedListing.id);
    }
  }, [selectedListing, selectedListingId]);

  if (isLoading && !facility) return <LoadingPage />;

  if (error && !facility) {
    return (
      <LandlordLayout
        activeSidebarItem="properties"
        breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }]}
      >
        <div className="flex h-64 flex-col items-center justify-center gap-4 text-center text-gray-500">
          <p>{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="rounded-lg bg-darkslategray-200 px-5 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </LandlordLayout>
    );
  }

  if (!facility) return null;

  const tagDefinitionsByName = new Map(facility.tagDefinitions.map((tag) => [tag.name, tag]));
  const selectedListingTags = Object.entries(selectedListing?.tags ?? {})
    .filter(([key]) => key !== 'seedSource' && key !== 'roomLabel')
    .map(([name, value]) => ({
      name,
      value,
      label: tagDefinitionsByName.get(name)?.displayName ?? name,
    }));
  const selectedListingTagMap = new Map(selectedListingTags.map((tag) => [tag.name, tag]));
  const primaryRent = selectedListing?.price ?? 0;
  const selectedPriceLabel = primaryRent > 0 ? currencyFormatter.format(primaryRent) : 'Price TBA';
  const landlordSince =
    facility.landlord?.createdAt != null
      ? new Date(facility.landlord.createdAt).getFullYear().toString()
      : 'N/A';

  const detailTags = [
    facility.allowVisit ? 'Visits Allowed' : 'Visits Unavailable',
    facility.allowTransfer ? 'Transfers Allowed' : 'Transfers Unavailable',
    `${availableListings.length} Room Type${availableListings.length === 1 ? '' : 's'}`,
    facility.price.min > 0 ? `From ${currencyFormatter.format(facility.price.min)}` : 'Price TBA',
  ];
  const aboutDetails = [
    {
      label: 'ROOM TYPE',
      value: selectedListing ? roomButtonLabel(selectedListing.label) : 'TBA',
    },
    {
      label: 'UNITS AVAILABLE',
      value: selectedListing
        ? `${selectedListing.availableUnitCount} of ${selectedListing.unitCount}`
        : 'TBA',
    },
    ...aboutTagNames
      .map((name) => selectedListingTagMap.get(name))
      .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag))
      .map((tag) => ({
        label: tag.label.toUpperCase(),
        value: formatTagValue(tag.value),
      })),
  ];
  const included = ['hasWifi', 'hasKitchen', 'hasLaundry', 'hasAircon'].map((name) => ({
    label: tagDefinitionsByName.get(name)?.displayName ?? name,
    active: selectedListingTagMap.get(name)?.value === true,
  }));
  const amenities = amenityTagNames.map((name) => ({
    icon: amenityTagIcons[name],
    label: tagDefinitionsByName.get(name)?.displayName ?? name,
    active: selectedListingTagMap.get(name)?.value === true,
  }));
  const rules = ruleTagNames
    .map((name) => selectedListingTagMap.get(name))
    .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag))
    .map((tag) => ({
      text: `${tag.label}: ${formatTagValue(tag.value)}`,
      ok: !['smokingPolicy', 'petsPolicy'].includes(tag.name),
    }));
  const reviewRatings = facility.reviews
    .map((review) => review.rating)
    .filter((rating) => rating > 0);
  const overallScore =
    reviewRatings.length > 0
      ? Number(
          (reviewRatings.reduce((sum, rating) => sum + rating, 0) / reviewRatings.length).toFixed(
            1,
          ),
        )
      : 0;
  const ratingRows = [5, 4, 3, 2, 1].map((star) => {
    const count = reviewRatings.filter((rating) => Math.round(rating) === star).length;
    return {
      star,
      width: reviewRatings.length > 0 ? `${(count / reviewRatings.length) * 100}%` : '0%',
      count,
    };
  });
  const reviews = facility.reviews.map((review) => {
    const [firstName = '', lastName = ''] = review.reviewerName.split(' ');
    const initials = `${firstName[0] ?? 'S'}${lastName[0] ?? ''}`.toUpperCase();
    const date = review.createdAt
      ? new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(new Date(review.createdAt))
      : 'Recently';

    return {
      id: review.id,
      initials,
      name: review.reviewerName,
      date,
      rating: `${review.rating.toFixed(1)} / 5.0`,
      text: review.description || 'No written review was provided.',
      mediaUrls: review.mediaUrls,
    };
  });

  return (
    <LandlordLayout activeSidebarItem="properties">
      <div className="flex flex-col gap-6 font-inter text-darkslategray-100">
        <div className="rounded-lg border border-teal-100 bg-lightcyan px-4 py-3 text-sm text-darkslategray-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-semibold">
              <Icon icon="iconamoon:eye-light" className="h-5 w-5" />
              You're in student view. Actions are disabled and empty student-only fields are shown
              as grey placeholders.
            </div>
            <button
              type="button"
              onClick={() => navigate(`/landlord/properties/${facility.id}`)}
              className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-teal shadow-sm"
            >
              Back to Building
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-semibold flex-wrap">
          <BreadcrumbHeader
            routes={[
              { name: 'Home', url: '/home' },
              { name: 'Properties', url: '/landlord/properties' },
              { name: facility.name },
            ]}
          />
        </div>

        <div className="relative w-full flex items-center pb-6 box-border">
          <div className="w-full flex items-center bg-[#f8f9fa] rounded-num-12 py-3 pl-3 pr-4 gap-2">
            <Icon icon="ic:outline-search" className="w-5 h-5 text-unselected shrink-0" />
            <div className="w-full text-num-14 font-semibold text-unselected">
              Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-10 text-sm font-lora text-darkslategray-200">
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <div className="relative min-h-[428px] w-full overflow-hidden rounded-xl">
              {facility.gallery.length > 0 ? (
                <ImageCarousel images={facility.gallery} />
              ) : (
                <div className="h-[428px] w-full rounded-xl bg-silver-100" />
              )}
            </div>

            <div className="flex flex-col gap-4 font-inter">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 text-3xl text-black flex-wrap">
                    <b>{facility.name}</b>
                    <b className="text-silver">
                      - {availableListings.length} room type
                      {availableListings.length === 1 ? '' : 's'}
                    </b>
                  </div>
                  <div className="mt-6 text-xs tracking-wide font-semibold text-darkslategray-200">
                    {facility.location}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    disabled
                    className="rounded border border-teal-200 py-3 px-8 text-sm font-bold text-teal-200"
                  >
                    {facility.allowVisit ? 'VISIT' : 'NO VISIT'}
                  </button>
                  <button
                    type="button"
                    disabled
                    className="rounded border border-teal-200 py-3 px-8 text-sm font-bold text-teal-200"
                  >
                    SAVE
                  </button>
                </div>
              </div>
              <div className="relative rounded-lg bg-darkslategray-200 shadow-md px-4 py-3 text-white max-w-max">
                <b className="text-2xl leading-8">{selectedPriceLabel}</b>
                {primaryRent > 0 && <span className="text-lg text-teal-100"> / month</span>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-center text-teal-200">
              {detailTags.map((label, index) => (
                <div
                  key={label}
                  className={`rounded-lg border border-teal-200 py-2 px-4 font-medium ${
                    index === 0 ? 'bg-lightcyan' : ''
                  }`}
                >
                  {label}
                </div>
              ))}
              {selectedListingTags.length > 0
                ? selectedListingTags.map(({ name, label, value }) => (
                    <div
                      key={`${name}-${String(value)}`}
                      className="rounded-lg border border-teal-200 py-2 px-4 font-medium"
                    >
                      {`${label}: ${formatTagValue(value)}`}
                    </div>
                  ))
                : [0, 1, 2].map((item) => <SkeletonLine key={item} className="h-9 w-28" />)}
            </div>

            <PropertyTabs>
              <PropertyTab
                text="ABOUT"
                element={
                  <AboutDetails
                    description={[facility.description, selectedListing?.description]
                      .filter(Boolean)
                      .join('\n\n')}
                    details={aboutDetails}
                    included={included}
                  />
                }
              />
              <PropertyTab text="AMENITIES" element={<AmenetiesDetails amenities={amenities} />} />
              <PropertyTab text="RULES" element={<RulesDetails rules={rules} />} />
              <PropertyTab
                text="LOCATION"
                element={
                  <LocationDetails
                    latitude={facility.coordinates?.lat}
                    longitude={facility.coordinates?.long}
                    name={facility.name}
                    address={facility.location}
                  />
                }
              />
              <PropertyTab
                text="REVIEWS"
                element={
                  <ReviewDetails
                    overallScore={overallScore}
                    totalReviews={reviews.length}
                    rows={ratingRows}
                    reviews={reviews}
                  />
                }
              />
            </PropertyTabs>
          </div>

          <div className="w-full xl:w-[340px] shrink-0 flex flex-col gap-8 font-inter text-black">
            <PreviewApplyCard
              rooms={availableListings.map((listing) => ({
                id: listing.id,
                label: listing.label,
              }))}
              selectedRoomId={selectedListing?.id ?? ''}
              onSelectRoom={setSelectedListingId}
              primaryRent={primaryRent}
            />

            <div className="rounded-lg shadow bg-white flex flex-col p-4 gap-4">
              <div className="flex items-center gap-2 text-xl">
                <Icon icon="material-symbols:wifi-home-outline-rounded" className="h-6 w-6" />
                <b className="text-sm">LANDLORD</b>
              </div>
              <div className="flex items-center gap-3">
                {facility.landlord?.profilePicture ? (
                  <img
                    className="h-12 w-12 rounded-full object-cover shadow"
                    src={facility.landlord.profilePicture}
                    alt={facility.landlord.name}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-lightcyan shadow flex items-center justify-center text-sm font-bold text-teal-200">
                    {facility.landlord?.name?.slice(0, 1) ?? 'L'}
                  </div>
                )}
                <div className="flex flex-col gap-0.5 font-lora text-xs">
                  <div className="font-medium">{facility.landlord?.name ?? 'Landlord'}</div>
                  <div className="text-[10px] font-semibold text-darkslategray-100">
                    member since {landlordSince}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-teal-100 text-sm">
                {[
                  [String(facility.landlord?.numUnits ?? availableListings.length), 'Active Units'],
                  [landlordSince, 'Since'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="flex-1 border border-teal-100 rounded-lg flex flex-col items-center py-2"
                  >
                    <b className="font-semibold">{value}</b>
                    <div className="text-[10px] font-semibold font-lora text-darkslategray-100">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <SkeletonLine className="h-9 w-full" />
              <SkeletonLine className="h-9 w-full" />
            </div>

            <div className="rounded-lg border border-whitesmoke-200 bg-white p-4">
              <div className="mb-3 text-sm font-bold text-gray">You may also like</div>
              <div className="flex flex-col gap-3">
                <SkeletonLine className="h-24 w-full" />
                <SkeletonLine className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};

export default BuildingStudentPreview;
