import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import dorm1 from '../../../../assets/landing_contact.webp';
import dorm2 from '../../../../assets/landing_listing.webp';
import dorm3 from '../../../../assets/landing_contact.webp';

type Property = {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
};

const properties: Property[] = [
  { id: '1', name: 'Tri-AD Hall Dormitory', location: 'Umali Subdivision, Los Baños', rating: 4.3, image: dorm1 },
  { id: '2', name: 'Two Sapphire Place', location: 'Umali Subdivision, Los Baños', rating: 3.7, image: dorm2 },
  { id: '3', name: "Women's Dormitory", location: 'Inside UPLB', rating: 3.7, image: dorm3 },
];

const AvailabilityItem = ({ icon, title, children }: { icon: string; title: string; children: ReactNode }) => (
  <div className="flex items-start gap-[16px]">
    <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#eaf6f2] text-[#096c5b]">
      <Icon icon={icon} className="h-[22px] w-[22px]" />
    </span>
    <div className="flex min-w-0 flex-col gap-[8px] text-[#096c5b]">
      <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px]">{title}</p>
      <div className="flex flex-col gap-[4px] text-[14px]">{children}</div>
    </div>
  </div>
);

const PropertyCard = ({ property }: { property: Property }) => (
  <Link
    to={`/landlord/properties/${property.id}`}
    className="group flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.08)] ring-1 ring-[#f0f0f0] transition-shadow duration-200 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] no-underline"
  >
    <div className="relative aspect-4/3 w-full overflow-hidden">
      <img src={property.image} alt={property.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
    </div>
    <div className="flex flex-col gap-[6px] px-[16px] py-[14px]">
      <div className="flex items-start justify-between gap-[8px]">
        <h3 className="min-w-0 truncate font-['Inter',sans-serif] text-[16px] font-bold text-black">{property.name}</h3>
        <span className="flex shrink-0 items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold text-[#2f3136]">
          <Icon icon="material-symbols:star-rounded" className="h-[14px] w-[14px] text-[#f5b301]" />
          {property.rating.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center gap-[6px] font-['Lora',serif] text-[12px] font-semibold text-[#2f3136]">
        <Icon icon="material-symbols:location-on-outline" className="h-[14px] w-[14px] text-[#096c5b]" />
        <span className="truncate">{property.location}</span>
      </div>
    </div>
  </Link>
);

const LandlordProfileView = () => {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Availability */}
      <section className="flex flex-col gap-[16px] px-[32px]">
        <div className="flex items-center gap-[12px]">
          <h2 className="font-['Inter',sans-serif] text-[22px] font-bold text-[#2f3136]">Availability</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-[48px] gap-y-[24px] md:grid-cols-2">
          <AvailabilityItem icon="solar:clock-circle-outline" title="Ocular Visitation">
            <div className="flex gap-2"><span className="font-bold">Mon - Wed:</span> 8:00 AM - 5:00 PM</div>
          </AvailabilityItem>
          <AvailabilityItem icon="ix:inquiry" title="General Inquiries">
            <div className="flex gap-2"><span className="font-bold">Mon - Fri:</span> 8:00 AM - 5:00 PM</div>
            <div className="flex gap-2"><span className="font-bold">Sat - Sun:</span> 9:00 AM - 3:00 PM</div>
          </AvailabilityItem>
        </div>
      </section>

      <div className="h-px w-full bg-[#e5e7eb]/70" />

      {/* Managed Properties */}
      <section className="flex flex-col gap-[16px] px-[32px]">
        <div className="flex items-center gap-[12px]">
          <h2 className="font-['Inter',sans-serif] text-[22px] font-bold text-[#2f3136]">Managed Properties</h2>
          <button className="text-[#2f3136] hover:text-[#096c5b]">
            <Icon icon="iconamoon:edit" className="h-[18px] w-[18px]" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
      
    </div>
    
  );
};

export default LandlordProfileView;