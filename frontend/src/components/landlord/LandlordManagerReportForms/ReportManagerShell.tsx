import type { FunctionComponent, ReactNode } from 'react';

type Props = {
  onCancel: () => void;
  onNext: () => void;
  nextLabel?: string;
  children: ReactNode;
};

const ReportManagerShell: FunctionComponent<Props> = ({ onCancel, onNext, nextLabel = 'Next', children }) => (
  <div className="relative rounded-tl-[25.6px] bg-white w-[490px] flex flex-col items-center pb-[25.6px] gap-[33.6px]">
    <div className="self-stretch rounded-tl-[25.6px] bg-linear-to-b from-[#096c5b] to-[#16917c] flex flex-col items-start justify-center py-[9.6px] pl-[45.6px] pr-[25.6px]">
      <div className="flex flex-col items-start pt-[25.6px] pb-[6.4px] gap-[4px]">
        <b className="font-['Poppins',sans-serif] text-[32px] text-white">Report Manager</b>
        <b className="font-['Inter',sans-serif] text-[18px] tracking-[-0.01em] text-[#e8f4f8]">Report your dorm manager</b>
      </div>
    </div>
    <div className="self-stretch flex flex-col items-start px-[38.4px] pb-[16px] gap-[38.4px] font-['Inter',sans-serif] text-[14px] text-[#666]">
      <div className="self-stretch flex flex-col items-start gap-[9.6px]">
        <b>Email Address</b>
        <div className="self-stretch h-[38.4px] rounded-[9.6px] border border-[#e0e0e0] flex items-center px-[12.8px] text-[#8a9099]">
          <span className="font-medium">ncunanan@gmail.com</span>
        </div>
        <div className="self-stretch flex items-center justify-center py-0 px-[6.4px]">
          <b className="flex-1 font-['Inter',sans-serif] text-[18px] tracking-[-0.008em] text-black">
            You are reporting Nathaniel Cunanan. Please select all that apply:
          </b>
        </div>
      </div>
      {children}
    </div>
    <div className="flex items-center gap-[12.8px]">
      <button onClick={onCancel} className="rounded-[9.6px] py-[6.4px] px-[19.2px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#dc143c] transition-opacity hover:opacity-70">
        Cancel
      </button>
      <button onClick={onNext} className="rounded-[9.6px] bg-[#e0f7f4] py-[6.4px] px-[19.2px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80">
        {nextLabel}
      </button>
    </div>
  </div>
);

export default ReportManagerShell;