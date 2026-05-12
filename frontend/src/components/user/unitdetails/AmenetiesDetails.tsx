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
      <b className="text-xl text-black">Amenities</b>
    </div>
    <div className="px-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map(({ icon, label, active }) => (
        <div
          key={label}
          className={`rounded-xl border flex flex-col items-center py-5 px-3 gap-2 ${
            active
              ? 'border-teal-200 bg-white text-gray'
              : 'border-whitesmoke-200 bg-whitesmoke-100 text-silver'
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
