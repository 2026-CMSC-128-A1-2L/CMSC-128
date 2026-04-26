import { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  onClose: () => void;
};

const UpdateManager2: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <div className="w-[480px] relative rounded-[16px] bg-white overflow-hidden flex flex-col items-center p-[32px] gap-[24px] text-center">
      <div className="flex flex-col items-center gap-[24px]">
        {/* Icon */}
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#e0f7f4]">
          <Icon icon="solar:check-circle-bold" className="h-[64px] w-[64px] text-[#096c5b]" aria-hidden="true" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-[10px]">
          <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-black">Permissions Updated!</b>
          <p className="font-['Inter',sans-serif] text-[14px] leading-[20px] text-black">
            <span className="font-medium">We've notified </span>
            <b>Nathaniel Cunanan</b>
            <span className="font-medium"> about the changes to their manager permissions.</span>
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="rounded-[12px] bg-[#e0f7f4] py-[12px] px-[32px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateManager2;