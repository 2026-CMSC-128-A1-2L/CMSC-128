import type { FunctionComponent } from 'react';
import cancelIcon from '../../../../assets/cancel_popup.svg';

type Props = {
  onConfirm: () => void;
  onBack: () => void;
};

const CancelApplication1: FunctionComponent<Props> = ({ onConfirm, onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto relative rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter">
      <div className="self-stretch flex flex-col items-center py-8 gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white flex items-center justify-center p-2">
            <img className="h-20 w-20" alt="Warning" src={cancelIcon} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <b className="text-2xl leading-8 text-black">Are you sure?</b>
            <p className="text-sm leading-6 font-medium text-dimgray px-4">
              Any unsaved progress within this session will be permanently lost. This action cannot
              be undone.
            </p>
          </div>
        </div>

        <div className="self-stretch flex flex-col items-center gap-3 mt-4">
          <button
            onClick={onConfirm}
            className="w-full rounded-xl bg-lightcyan py-3 px-6 text-teal font-semibold hover:bg-opacity-80 transition-all active:scale-95 border-none cursor-pointer"
          >
            Yes, Cancel
          </button>

          <button
            onClick={onBack}
            className="w-full rounded-xl py-3 px-6 bg-transparent border-none cursor-pointer transition-all active:scale-95 flex items-center justify-center"
          >
            <span className="text-sm font-bold leading-6 bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent">
              Go Back
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelApplication1;
