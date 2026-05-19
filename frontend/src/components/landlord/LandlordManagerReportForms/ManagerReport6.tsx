import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  onClose: () => void;
};

const ReportManager6: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <div className="w-full h-[500px] relative rounded-2xl bg-white overflow-hidden flex flex-col items-start p-8 box-border text-center text-2xl text-black font-inter">
      <div className="self-stretch h-[436px] overflow-hidden shrink-0 flex flex-col items-center pt-[65px] px-2.5 pb-6 box-border gap-6">
        <div className="self-stretch flex flex-col items-start">
          <div className="self-stretch bg-white overflow-hidden flex items-center justify-center py-[5px] px-[3px]">
            <div className="w-[100px] h-[100px] flex items-center justify-center relative rounded-[50%] bg-lightcyan">
              <Icon
                icon="solar:check-circle-bold"
                className="h-[64px] w-[64px] text-[#096c5b]"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-2.5 gap-2.5">
            <b className="self-stretch relative leading-8">Report Submitted.</b>
            <div className="self-stretch relative text-sm leading-5">
              <span className="font-medium">{`Thank you for your report. You’re helping keep ATLAS safe for our `}</span>
              <i className="font-medium">mga iskolar ng bayan</i>
              <span className="font-medium">
                {' '}
                and landlords.
                <br />
                <br />
                Your report has been successfully submitted. Our team will review the details and
                take appropriate action.
              </span>
            </div>
          </div>
        </div>
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center p-2.5 text-sm text-teal">
          <div className="rounded-xl bg-lightcyan overflow-hidden flex items-center justify-center py-3 px-8">
            <button className="relative font-semibold cursor-pointer" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManager6;
