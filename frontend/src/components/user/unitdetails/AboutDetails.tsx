import type { FunctionComponent } from 'react';

type AboutDetailsProps = {
  description?: string;
  details: {
    label: string;
    value: string;
  }[];
  included: {
    label: string;
    active: boolean;
  }[];
};

const AboutDetails: FunctionComponent<AboutDetailsProps> = ({ description, details, included }) => (
  <div className="w-full flex flex-col gap-6 text-left font-inter">
    <p className="px-5 text-sm font-medium font-lora text-gray whitespace-pre-line">
      {description?.trim() || 'No property description has been provided yet.'}
    </p>

    <div>
      <div className="px-5 py-2">
        <b className="text-xl text-black">Unit Details</b>
      </div>
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {details.map(({ label, value }) => (
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
