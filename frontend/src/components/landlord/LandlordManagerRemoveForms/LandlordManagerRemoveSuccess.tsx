import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  managerName: string;
  onClose: () => void;
};

const LandlordManagerRemoveSuccess: FunctionComponent<Props> = ({ managerName, onClose }) => {
  return (
    <div className="relative flex w-[480px] flex-col items-start overflow-hidden rounded-[16px] bg-white p-[32px]">
      <div className="flex w-full flex-col items-center gap-[24px] overflow-hidden px-[10px] pt-[40px] pb-[24px]">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center justify-center bg-white px-[3px] py-[5px]">
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#cbf6ed]">
              <Icon
                icon="solar:check-circle-bold"
                className="h-[64px] w-[64px] text-[#096c5b]"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-[10px] p-[10px] text-center">
            <b className="w-full font-['Inter',sans-serif] text-[24px] leading-[32px] text-black">
              Manager Removed.
            </b>
            <p className="w-full font-['Inter',sans-serif] text-[14px] leading-[20px] font-medium text-black">
              <b>{managerName}</b> has been removed from your managers. They no longer have access
              to your assigned properties.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center p-[10px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] bg-[#cbf6ed] px-[32px] py-[12px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordManagerRemoveSuccess;
