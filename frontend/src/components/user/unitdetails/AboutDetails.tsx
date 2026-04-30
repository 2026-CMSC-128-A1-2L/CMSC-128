import type { FunctionComponent } from 'react';

const details = [
  ['ROOM TYPE', 'Transient'],
  ['FLOOR AREA', '18 sqm'],
  ['FLOOR LEVELS', '2 Floors'],
  ['MAX OCCUPANCY', '4 Person'],
  ['BATHROOM', 'Shared (Floor)'],
  ['FURNISHING', 'Semi-Furnished'],
  ['GENDER POLICY', 'Female Only'],
  ['LEASE TERM', 'Min. 6 months'],
  ['MOVE-IN DATE', 'Min. 6 months'],
];

const included = [
  { label: 'Wi-Fi', active: true },
  { label: 'Water (shared)', active: true },
  { label: 'Trash Collection', active: true },
  { label: 'Electricity', active: false },
  { label: 'Laundry', active: false },
];

const AboutDetails: FunctionComponent = () => (
  <div className="w-full flex flex-col gap-6 text-left font-inter">
    <p className="px-5 text-sm font-medium font-lora text-gray">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>

    <div>
      <div className="px-5 py-2">
        <b className="text-xl text-black">Unit Details</b>
      </div>
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-whitesmoke bg-white p-3 flex flex-col gap-1"
          >
            <div className="text-xs font-semibold tracking-wide font-lora text-darkslategray-100">
              {label}
            </div>
            <b className="text-lg text-gray font-inter">{value}</b>
          </div>
        ))}
      </div>
    </div>

    <div>
      <div className="px-5 py-2">
        <b className="text-xl text-black">What's Included?</b>
      </div>
      <div className="px-5 flex flex-wrap gap-2">
        {included.map(({ label, active }) => (
          <div
            key={label}
            className={`rounded-xl border py-2 px-4 text-sm font-medium font-lora ${active ? 'bg-lightcyan border-teal-200 text-darkslategray-200' : 'border-silver text-silver'}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutDetails;
