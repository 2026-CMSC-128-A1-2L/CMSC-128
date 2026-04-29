import type { FunctionComponent } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

const StatCard: FunctionComponent<StatCardProps> = ({ label, value, highlight }) => (
  <div
    className={`h-[84px] w-full min-w-[150px] rounded-[10px] flex flex-col items-start p-3 box-border border-solid border
      ${highlight ? 'bg-azure border-transparent' : 'bg-white border-whitesmoke-200'}`}
  >
    <b className="self-stretch h-6 relative flex items-center shrink-0 text-[12px] sm:text-[14px] text-darkslategray-100 wrap-break-word">
      {label}
    </b>
    <b className="self-stretch relative text-[18px] sm:text-[20px] md:text-[24px] font-inter text-teal-200 wrap-break-word">
      {value}
    </b>
  </div>
);

export default StatCard;
