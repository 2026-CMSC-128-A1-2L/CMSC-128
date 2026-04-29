import { type FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';

type Props = { onSubmit: () => void; onCancel: () => void };

const ReportManager5: FunctionComponent<Props> = ({ onSubmit, onCancel }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="relative rounded-tl-[25.6px] bg-white w-[490px] flex flex-col items-center pb-[25.6px] gap-[33.6px]">
      <div className="self-stretch rounded-tl-[25.6px] bg-linear-to-b from-[#096c5b] to-[#16917c] flex flex-col items-start justify-center py-[9.6px] pl-[45.6px] pr-[25.6px]">
        <div className="flex flex-col items-start pt-[25.6px] pb-[6.4px] gap-[4px]">
          <b className="font-['Poppins',sans-serif] text-[32px] text-white">Report Manager</b>
          <b className="font-['Inter',sans-serif] text-[18px] tracking-[-0.01em] text-[#e8f4f8]">Report your dorm manager</b>
        </div>
      </div>

      <div className="self-stretch px-[38.4px] pb-[16px]">
        <button
          onClick={() => setAgreed((p) => !p)}
          className={`self-stretch w-full flex items-start gap-[10px] rounded-[9.6px] p-[12px] text-left transition-colors ${agreed ? 'bg-[#f0fdf9]' : 'hover:bg-[#fafafa]'}`}
        >
          <div className="mt-[3px] flex shrink-0">
            <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border transition-colors ${agreed ? 'border-[#096c5b] bg-[#096c5b]' : 'border-[#d1d5db] bg-[#f5f5f5] shadow-[0px_0px_2px_rgba(0,0,0,0.25)]'}`}>
              {agreed && <Icon icon="solar:check-bold" className="h-[11px] w-[11px] text-white" />}
            </span>
          </div>
          <p className="flex-1 font-['Inter',sans-serif] text-[14px] leading-[25px] text-black">
            <span className="font-medium">I declare that all information and reports submitted are </span>
            <b className="text-[#096c5b]">truthful</b>
            <span className="font-medium">, </span>
            <b className="text-[#096c5b]">complete</b>
            <span className="font-medium">, and </span>
            <b className="text-[#096c5b]">based on verified facts</b>
            <span className="font-medium"> to the best of my knowledge. I acknowledge that any false or misleading information may lead to consequences in accordance with applicable rules and regulations.</span>
          </p>
        </button>
      </div>

      <div className="flex items-center gap-[12.8px]">
        <button onClick={onCancel} className="rounded-[9.6px] py-[6.4px] px-[19.2px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#dc143c] transition-opacity hover:opacity-70">
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!agreed}
          className="rounded-[9.6px] bg-[#e0f7f4] py-[6.4px] px-[19.2px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReportManager5;