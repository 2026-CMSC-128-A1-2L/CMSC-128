import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

const amenities = [
  { icon: 'material-symbols:wifi', label: 'Wi-Fi' },
  { icon: 'material-symbols:snowflake', label: 'Air Con' },
  { icon: 'boxicons:cctv', label: 'CCTV' },
  { icon: 'streamline:hotel-laundry', label: 'Laundry' },
  { icon: 'carbon:police', label: '24/7 Guard' },
  { icon: 'boxicons:desk', label: 'Study Desk' },
  { icon: 'mdi:refrigerator-outline', label: 'Refrigerator' },
  { icon: 'emojione-monotone:kitchen-knife', label: 'Kitchen' },
];

const AmenetiesDetails: FunctionComponent = () => (
  <div className="w-full flex flex-col gap-4 font-inter">
    <div className="px-5 py-2"><b className="text-xl text-black">Amenities</b></div>
    <div className="px-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map(({ icon, label }) => (
        <div key={label} className="rounded-xl border border-whitesmoke-200 bg-white flex flex-col items-center py-5 px-3 gap-2">
          <Icon icon={icon} className="w-6 h-6" color="#096C5B" />
          <b className="text-sm text-gray text-center">{label}</b>
        </div>
      ))}
    </div>
  </div>
);

export default AmenetiesDetails;