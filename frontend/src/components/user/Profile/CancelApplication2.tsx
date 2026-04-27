import type { FunctionComponent } from 'react';
import success from '../../../../assets/reportSuccess.svg';

type Props = {
  onClose: () => void;
};

const CancelApplication2: FunctionComponent<Props> = ({ onClose }) => {
  return (
    // Removed fixed h-[500px], used w-full and max-w-md to keep it contained
    <div className="w-full max-w-md mx-auto relative rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter">
      
      {/* Container for content - removed fixed height and px-2.5 for better spacing */}
      <div className="self-stretch flex flex-col items-center py-8 gap-6">
        
        {/* Success Icon Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white flex items-center justify-center p-2">
            <img className="h-20 w-20" alt="Success" src={success} />
          </div>
          
          {/* Text Section */}
          <div className="flex flex-col items-center gap-2">
            <b className="text-2xl leading-8 text-black">Cancellation Confirmed.</b>
            <p className="text-sm leading-6 font-medium text-dimgray">
              Your cancellation has been processed successfully. <br />
              You can now apply for a new listing.
            </p>
          </div>
        </div>

        {/* Button Section - removed flex-1 to prevent stretching */}
        <div className="self-stretch mt-4">
          <button 
            className="w-full rounded-xl bg-lightcyan py-3 px-6 text-teal font-semibold hover:bg-opacity-80 transition-all active:scale-95 border-none cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CancelApplication2;