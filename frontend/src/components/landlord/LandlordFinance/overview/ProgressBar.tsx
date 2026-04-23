import { FunctionComponent } from 'react';

interface ProgressRowProps {
  label: string;
  value: string;
  percent: number;
}

const ProgressRow: FunctionComponent<ProgressRowProps> = ({ label, value, percent }) => (
  <div className="self-stretch flex flex-col items-start gap-[3px]">
    <div className="self-stretch flex items-center justify-between gap-5">
      <div className="h-[17px] relative tracking-[0.02em] font-semibold flex items-center text-teal-200 shrink-0">
        {label}
      </div>
      <div className="h-[17px] relative tracking-[0.02em] font-semibold text-silver text-right flex items-center justify-end shrink-0">
        {value}
      </div>
    </div>
    <div className="self-stretch h-2.5 rounded-[100px] bg-silver overflow-hidden">
      <div className="h-2.5 rounded-[100px] bg-teal-200" style={{ width: `${percent}%` }} />
    </div>
  </div>
);

export default ProgressRow;