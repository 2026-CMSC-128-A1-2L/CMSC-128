import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import successIcon from '../../../../assets/reportSuccess.svg';

type Props = {
  onClose: () => void;
};

const ConfirmTransfer2: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto relative rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter">
      <div className="self-stretch flex flex-col items-center py-8 gap-6">
        {/* Success Icon Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-lightcyan/20 rounded-full flex items-center justify-center p-4">
            <img className="h-20 w-20" alt="Success" src={successIcon} />
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center gap-2">
            <b className="text-2xl leading-8 text-black">Application Successful</b>
            <div className="text-sm leading-6 font-medium text-dimgray px-4">
              <p>You have successfully finalized your application.</p>
              <p className="mt-2">
                Your application will be reviewed within{' '}
                <span className="font-bold text-[#c29722]">48 - 72 hours</span> by the landlord.
                Notifications will be sent to keep you posted.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="self-stretch mt-4">
          <button
            className="w-full rounded-xl bg-teal py-4 px-6 text-white font-bold hover:brightness-110 transition-all active:scale-95 border-none cursor-pointer shadow-sm"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransfer2;
