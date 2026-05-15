import { useState, type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import dorm1 from '../../../../assets/landing_contact.webp';
import dorm2 from '../../../../assets/landing_listing.webp';
import dorm3 from '../../../../assets/landing_contact.webp';
import { useNavigate } from 'react-router-dom';
import LandlordProfileSwitch from './component/LandlordProfileSwitch';
import { Link } from 'react-router-dom';

type Property = {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
};

const properties: Property[] = [
  {
    id: '1',
    name: 'Tri-AD Hall Dormitory',
    location: 'Umali Subdivision, Los Baños',
    rating: 4.3,
    image: dorm1,
  },
  {
    id: '2',
    name: 'Two Sapphire Place',
    location: 'Umali Subdivision, Los Baños',
    rating: 3.7,
    image: dorm2,
  },
  {
    id: '3',
    name: "Women's Dormitory",
    location: 'Inside UPLB',
    rating: 3.7,
    image: dorm3,
  },
];

type AvailabilityItemProps = {
  icon: string;
  title: string;
  children: ReactNode;
};

const AvailabilityItem = ({ icon, title, children }: AvailabilityItemProps) => (
  <div className="flex items-start gap-[16px]">
    <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#eaf6f2] text-[#096c5b] dark:bg-[#17352f] dark:text-[#72cbb8]">
      <Icon icon={icon} className="h-[22px] w-[22px]" aria-hidden="true" />
    </span>
    <div className="flex min-w-0 flex-col gap-[8px] text-[#096c5b] dark:text-[#72cbb8]">
      <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px]">{title}</p>
      <div className="flex flex-col gap-[4px] text-[14px]">{children}</div>
    </div>
  </div>
);

const AvailabilityLine = ({ days, hours }: { days: string; hours: string }) => (
  <div className="flex flex-wrap items-center gap-x-[8px] gap-y-[2px]">
    <span className="font-['Inter',sans-serif] font-bold whitespace-nowrap">{days}</span>
    <span className="font-['Inter',sans-serif] font-medium whitespace-nowrap">{hours}</span>
  </div>
);

const PropertyCard = ({ property }: { property: Property }) => (
  <Link
    to={`/landlord/properties/${property.id}`}
    className="group flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.08)] ring-1 ring-[#f0f0f0] transition-shadow duration-200 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] no-underline dark:bg-[#111312] dark:ring-[#303331]"
  >
    <div className="relative aspect-4/3 w-full overflow-hidden">
      <img
        src={property.image}
        alt={property.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <button
        type="button"
        aria-label={`Bookmark ${property.name}`}
        className="absolute right-[10px] top-[10px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#096c5b] shadow-sm transition-colors hover:bg-white dark:bg-[#171918] dark:text-[#72cbb8]"
      >
        <Icon
          icon="material-symbols:bookmark-outline"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        />
      </button>
    </div>

    <div className="flex flex-col gap-[6px] px-[16px] py-[14px]">
      <div className="flex items-start justify-between gap-[8px]">
        <h3 className="min-w-0 truncate font-['Inter',sans-serif] text-[16px] font-bold leading-[20px] tracking-[-0.18px] text-black dark:text-white">
          {property.name}
        </h3>
        <span className="flex shrink-0 items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold tracking-[0.24px] text-[#2f3136] dark:text-[#d7e0ef]">
          <Icon
            icon="material-symbols:star-rounded"
            className="h-[14px] w-[14px] text-[#f5b301]"
            aria-hidden="true"
          />
          {property.rating.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-[8px]">
        <span className="flex min-w-0 items-center gap-[6px] font-['Lora',serif] text-[12px] font-semibold tracking-[0.24px] text-[#2f3136] dark:text-[#a4acba]">
          <Icon
            icon="material-symbols:location-on-outline"
            className="h-[14px] w-[14px] shrink-0 text-[#096c5b] dark:text-[#72cbb8]"
            aria-hidden="true"
          />
          <span className="truncate">{property.location}</span>
        </span>
        <button
          type="button"
          aria-label={`More info for ${property.name}`}
          className="flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center text-[#2f3136] hover:text-[#096c5b] dark:text-[#d7e0ef] dark:hover:text-[#72cbb8]"
        >
          <Icon
            icon="material-symbols:info-outline"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </Link>
);

type SectionHeaderProps = {
  title: string;
  onEdit?: () => void;
};

const SectionHeader = ({ title, onEdit }: SectionHeaderProps) => (
  <div className="flex items-center gap-[12px]">
    <h2 className="font-['Inter',sans-serif] text-[22px] font-bold leading-[28px] text-[#2f3136] dark:text-[#edf6f4]">
      {title}
    </h2>
    {onEdit && (
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${title.toLowerCase()}`}
        className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b] dark:text-[#d7e0ef] dark:hover:text-[#72cbb8]"
      >
        <Icon icon="iconamoon:edit" className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    )}
  </div>
);

const LandlordProfile = () => {
  const navigate = useNavigate();

  // contact number editing state
  const [isEditing, setIsEditing] = useState(false);
  const [contactNumber, setContactNumber] = useState('09*********');

  // home address editing state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [homeAddress, setHomeAddressz] = useState('Brgy. Batong Malake, Los Banos, Laguna');

  return (
    <div className="flex w-full flex-col gap-[32px] px-[32px] pb-[32px]">
      <section className="flex flex-col gap-[16px]">
        <SectionHeader title="Availability" />
        <div className="grid grid-cols-1 gap-x-[48px] gap-y-[24px] md:grid-cols-2">
          <AvailabilityItem icon="solar:clock-circle-outline" title="Ocular Visitation">
            <AvailabilityLine days="Mon - Wed:" hours="8:00 AM - 5:00 PM" />
          </AvailabilityItem>
          <AvailabilityItem icon="ix:inquiry" title="General Inquiries">
            <AvailabilityLine days="Mon - Fri:" hours="8:00 AM - 5:00 PM" />
            <AvailabilityLine days="Sat - Sun:" hours="9:00 AM - 3:00 PM" />
          </AvailabilityItem>
        </div>
      </section>

      <div className="h-px w-full bg-[#e5e7eb]/70 dark:bg-[#303331]" />

      <section className="flex flex-col gap-[16px]">
        <SectionHeader title="Managed Properties" onEdit={() => {}} />
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.name} property={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandlordProfile;
