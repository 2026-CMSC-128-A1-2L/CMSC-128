import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  onClose: () => void;
};

const LandlordManagerReportSuccess: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <div className="relative flex w-[480px] flex-col items-start overflow-hidden rounded-[16px] bg-white dark:bg-[#141515] p-[32px]">
      <div className="flex w-full flex-col items-center gap-[24px] overflow-hidden px-[10px] pt-[40px] pb-[24px]">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center justify-center bg-white dark:bg-[#141515] px-[3px] py-[5px]">
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#cbf6ed] dark:bg-[#12342e]">
              <Icon
                icon="solar:check-circle-bold"
                className="h-[64px] w-[64px] text-[#096c5b] dark:text-[#72cbb8]"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-[10px] p-[10px] text-center">
            <b className="w-full font-['Inter',sans-serif] text-[24px] leading-[32px] text-black dark:text-[#d7e0ef]">
              Report Submitted.
            </b>
            <p className="w-full font-['Inter',sans-serif] text-[14px] leading-[20px] font-medium text-black dark:text-[#d7e0ef]">
              Thank you for your report. You're helping keep ATLAS safe for our{' '}
              <span className="italic">mga iskolar ng bayan</span> and landlords.
            </p>
            <p className="w-full font-['Inter',sans-serif] text-[14px] leading-[20px] font-medium text-black dark:text-[#d7e0ef]">
              Your report has been successfully submitted. Our team will review the details and take
              appropriate action.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center p-[10px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-[32px] py-[12px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordManagerReportSuccess;
