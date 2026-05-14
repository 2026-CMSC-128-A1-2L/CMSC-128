import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmTransfer1: FunctionComponent<Props> = ({ onConfirm, onClose }) => {
  return (
    <div className="w-full max-w-md mx-auto relative rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter">
      
      <div className="self-stretch flex flex-col items-center py-8 gap-6">
        {/* Warning Icon Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-orange-50 rounded-full flex items-center justify-center p-4">
            <Icon 
              icon="solar:danger-triangle-bold-duotone" 
              className="h-20 w-20 text-orange-500" 
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center gap-2">
            <b className="text-2xl leading-8 text-black">Are you sure?</b>
            <p className="text-sm leading-6 font-medium text-dimgray px-4">
              Kindly double check all the information you have provided <br />
              before finalizing this application.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="self-stretch flex flex-col gap-3 mt-4">
          {/* Primary Action */}
          <button
            className="w-full rounded-xl bg-teal py-4 px-6 text-white font-bold hover:brightness-110 transition-all active:scale-95 border-none cursor-pointer shadow-sm"
            onClick={onConfirm}
          >
            Yes, finalize lease transfer
          </button>

          {/* Cancel Action */}
          <button
            className="w-full rounded-xl bg-transparent py-3 px-6 text-crimson font-semibold hover:bg-red-50 transition-all border-none cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransfer1;