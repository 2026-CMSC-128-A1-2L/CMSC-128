import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Amenity = {
  icon: string;
  label: string;
  active: boolean;
};

type AmenetiesDetailsProps = {
  amenities: Amenity[];
};

const AmenetiesDetails: FunctionComponent<AmenetiesDetailsProps> = ({ amenities }) => (
  <div className="w-full flex flex-col gap-4 font-inter">
    <div className="px-5 py-2">
      <b className="text-xl text-black dark:text-[#edf6f4]">Amenities</b>
    </div>
    <div className="px-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map(({ icon, label, active }) => (
        <div
          key={label}
          className={`rounded-xl border flex flex-col items-center py-5 px-3 gap-2 ${
            active
              ? 'border-teal-200 bg-white text-gray dark:border-[#2f8677] dark:bg-[#101111] dark:text-[#edf6f4]'
              : 'border-whitesmoke-200 bg-whitesmoke-100 text-silver dark:border-[#303331] dark:bg-[#1a1b1b]'
          }`}
        >
          <Icon icon={icon} className="w-6 h-6" color={active ? '#096C5B' : '#B8B8B8'} />
          <b className="text-sm text-center">{label}</b>
        </div>
      ))}
    </div>
  </div>
);

export default AmenetiesDetails;
