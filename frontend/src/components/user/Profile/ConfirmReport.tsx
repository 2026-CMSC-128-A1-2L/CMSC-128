import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import reportSuccess from '../../../../assets/reportSuccess.svg';

type Props = {
  onClose: () => void;
};

const ConfirmReport: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto relative rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter">
      <div className="self-stretch flex flex-col items-center py-8 gap-6">
        {/* Report Success Icon Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-orange-50 rounded-full flex items-center justify-center p-4">
            <img className="h-20 w-20" alt="Report Submitted" src={reportSuccess} />
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center gap-2">
            <b className="text-2xl leading-8 text-black">Report Received</b>
            <p className="text-sm leading-6 font-medium text-dimgray px-4">
              Thank you for sending this report. <br />
              Our team will investigate this report to keep the UPLB housing community safe.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="self-stretch mt-4">
          <button
            className="w-full rounded-xl bg-darkslategray-200 py-4 px-6 text-white font-bold hover:brightness-125 transition-all active:scale-95 border-none cursor-pointer shadow-sm"
            onClick={onClose}
          >
            Return to Dorm Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReport;
