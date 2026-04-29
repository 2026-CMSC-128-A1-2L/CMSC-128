import type { FunctionComponent } from 'react';
import successIcon from '../../../../assets/reportSuccess.svg';

type Props = {
  onContinue: () => void;
};

const FinalizeApplication: FunctionComponent<Props> = ({ onContinue }) => {
  return (
    <div className="w-full max-w-md mx-auto relative rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter">
      {/* Content Container */}
      <div className="self-stretch flex flex-col items-center py-8 gap-6">
        {/* Success Icon */}
        <div className="bg-white flex items-center justify-center p-2">
          <img className="h-20 w-20" alt="Success" src={successIcon} />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center gap-3">
          <b className="text-2xl leading-8 text-black px-2">
            You are a step closer to your new home!
          </b>

          <div className="text-sm leading-6 text-dimgray px-4 font-medium">
            <p>
              You have successfully secured a slot at{' '}
              <span className="text-teal font-bold">One Sapphire Place</span>.
            </p>

            <p className="mt-4">
              To keep your unit, submit all required documents within{' '}
              <span className="inline-block font-bold bg-linear-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent">
                7 days
              </span>
              . Unconfirmed slots will be automatically released after this period.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="self-stretch mt-4 px-2">
          <button
            onClick={onContinue}
            className="w-full rounded-xl bg-lightcyan py-3 px-6 text-teal font-semibold hover:bg-opacity-80 transition-all active:scale-95 border-none cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalizeApplication;
