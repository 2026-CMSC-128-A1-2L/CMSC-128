import React, { FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';

const Payments: FunctionComponent = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Independent states for each form
  const [isGcashOpen, setIsGcashOpen] = useState<boolean>(false);
  const [isBankOpen, setIsBankOpen] = useState<boolean>(false);

  // Handle toggling the main switch
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    // Reset both forms if the user collapses the main section
    if (isExpanded) {
      setIsGcashOpen(false);
      setIsBankOpen(false);
    }
  };

  // Helper function to render the form to avoid code duplication
  const renderDetailsForm = (title: string, accountLabel: string, onCancel: () => void) => (
    <div className="flex-1 w-full relative flex flex-col items-start justify-center gap-4 text-left text-num-14 text-teal font-inter">
      {/* Form Header */}
      <div className="self-stretch flex items-center gap-2.5 text-[17.7px]">
        <div className="flex-1 flex items-center justify-center">
          <b className="flex-1 relative tracking-[-0.01em]">{title}</b>
        </div>
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center p-2.5 text-center text-num-14 cursor-pointer hover:opacity-75 transition-opacity"
          onClick={onCancel}
        >
          <div className="relative leading-6 font-medium text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Cancel
          </div>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="self-stretch flex items-start gap-10 text-gray">
        <div className="flex-1 flex flex-col items-start gap-3">
          <b className="relative">Name</b>
          <div className="self-stretch rounded-xl bg-aliceblue border-whitesmoke border-solid border-[1px] flex flex-col items-start justify-center py-3 px-4 text-slategray">
            <div className="relative leading-6 font-medium">Aa</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start gap-3">
          <b className="self-stretch h-[15.2px] relative flex items-center shrink-0">
            {accountLabel}
          </b>
          <div className="self-stretch rounded-xl bg-aliceblue border-whitesmoke border-solid border-[1px] flex flex-col items-start justify-center py-3 px-4 text-slategray">
            <div className="relative leading-6 font-medium">09</div>
          </div>
        </div>
      </div>

      {/* QR Upload Area */}
      <div className="self-stretch rounded-2xl border-dimgray border-dashed border-[1px] overflow-hidden flex items-center py-3 px-4 text-black cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="h-16 flex items-center gap-6">
          <div className="h-16 w-16 relative rounded-md flex items-center justify-center overflow-hidden">
            <Icon icon="icons8:upload-2" className="w-full h-full" />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <b className="relative">Upload QR</b>
            <div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">
              .jpg or .png less than 500KB
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`w-full relative rounded-[11.8px] flex flex-col items-start py-4 px-3 box-border [transform:_rotate(-0.3deg)] [transform-origin:0_0] text-left text-[17.7px] font-inter transition-all ${isExpanded ? 'gap-[15.7px] text-teal-200' : 'text-teal'
        }`}
    >
      {/* 1. Header & Toggle Switch (Always Visible) */}
      <div className="self-stretch flex items-center justify-between gap-5">
        <b className="h-[20.7px] w-[171.1px] relative tracking-[-0.01em] flex items-center shrink-0">
          Cashless Payment
        </b>
        <div
          className="h-[30.5px] w-[64.9px] relative cursor-pointer"
          onClick={handleToggle}
        >
          <div
            className={`absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[19.67px] transition-colors ${isExpanded ? 'bg-teal-100' : 'bg-silver'
              }`}
          />
          <div
            className={`absolute h-[80.66%] w-[37.9%] top-[9.67%] bottom-[9.67%] shadow-[0px_3.9339709281921387px_3.93px_rgba(0,_0,_0,_0.25)] rounded-[50%] bg-white transition-all ${isExpanded
              ? 'right-[6.03%] left-[56.07%]'
              : 'right-[56.03%] left-[6.06%]'
              }`}
          />
        </div>
      </div>

      {/* 2. Expanded Content */}
      {isExpanded && (
        <>
          <div className="flex flex-col items-start gap-[30px] text-slategray w-full">

            {/* GCash Section */}
            {!isGcashOpen ? (
              <div
                className="flex items-center [transform:_rotate(0.2deg)] cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => setIsGcashOpen(true)}
              >
                <b className="relative tracking-[-0.01em]">Add GCash Details</b>
              </div>
            ) : (
              renderDetailsForm('Add GCash Details', 'GCash Number', () => setIsGcashOpen(false))
            )}

            {/* Bank Section */}
            {!isBankOpen ? (
              <div
                className="flex items-center [transform:_rotate(0.2deg)] cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => setIsBankOpen(true)}
              >
                <b className="relative tracking-[-0.01em]">Add Bank Details</b>
              </div>
            ) : (
              renderDetailsForm('Add Bank Details', 'Account Number', () => setIsBankOpen(false))
            )}

          </div>
        </>
      )}
    </div>
  );
};

export default Payments;
