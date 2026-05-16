import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import success from '../../../../assets/reportSuccess.svg';

type Props = {
  onClose: () => void;
};

const ConfirmReview: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto relative rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter">
      <div className="self-stretch flex flex-col items-center py-8 gap-6">
        {/* Success Icon Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-lightcyan/20 rounded-full flex items-center justify-center p-4">
            {/* If you prefer your SVG: */}
            <img className="h-20 w-20" alt="Success" src={success} />

            {/* Alternatively, using an iconify star/check:
            <Icon icon="solar:star-bold-duotone" className="h-20 w-20 text-teal" /> 
            */}
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center gap-2">
            <b className="text-2xl leading-8 text-black">Review Posted!</b>
            <p className="text-sm leading-6 font-medium text-dimgray">
              Thank you for sharing your experience. <br />
              Your feedback helps other students make better housing choices.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="self-stretch mt-4">
          <button
            className="w-full rounded-xl bg-teal py-4 px-6 text-white font-bold hover:bg-darkgreen transition-all active:scale-95 border-none cursor-pointer shadow-sm"
            onClick={onClose}
          >
            Back to Dorm Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReview;
