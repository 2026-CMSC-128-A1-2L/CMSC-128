import { type FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

// ─── Props ────────────────────────────────────────────────────────────────────

interface RegistrationVerificationProps {
  onNextClick: () => void;
  onBackClick: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const RegistrationVerification: FunctionComponent<RegistrationVerificationProps> = ({
  onNextClick,
  onBackClick,
}) => {
  return (
    <div className="flex-1 w-full relative overflow-hidden flex items-start justify-center text-left text-num-14 text-dimgray font-inter">
      <div className="w-[620px] rounded-xl border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start pt-3 px-4 pb-5 gap-6">
        <div className="w-full flex flex-col items-start p-3 box-border gap-3">
          {/* Title */}
          <div className="self-stretch flex items-center text-center text-[18px] text-black">
            <b className="relative tracking-[-0.01em]">Get ready for verification!</b>
          </div>

          {/* Subtitle */}
          <div className="self-stretch flex items-center justify-center text-black">
            <div className="flex-1 relative leading-6 font-medium">
              To list properties on ATLAS, your account needs to be verified by an admin. Here's
              what you'll need to prepare!
            </div>
          </div>

          {/* Info banner */}
          <div className="self-stretch rounded-xl bg-lightcyan border-teal-100 border-solid border box-border flex items-center py-0 px-6 gap-6 text-[12px] text-darkslategray font-lora">
            <Icon icon="material-symbols:info-outline-rounded" className="h-6 w-6 shrink-0 my-4" />
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="flex-1 relative tracking-[0.02em] font-semibold">
                <span>No uploads required right now. </span>
                <span className="text-teal-200">
                  This checklist is just to help you know what to prepare. You can submit documents
                  from your dashboard after your account is created.
                </span>
              </div>
            </div>
          </div>

          {/* Documents count */}
          <div className="self-stretch flex items-center justify-between gap-3.5 text-center">
            <b className="relative">Documents needed</b>
            <div className="h-0.5 flex-1 rounded-[100px] bg-whitesmoke" />
            <b className="relative">0/2</b>
          </div>

          {/* Valid ID */}
          <div className="self-stretch h-[60px] rounded-xl bg-aliceblue border-whitesmoke border-solid border box-border flex flex-col items-start justify-center py-0 px-6 gap-1">
            <div className="self-stretch flex items-center justify-center">
              <b className="flex-1 relative">Valid ID</b>
            </div>
            <div className="self-stretch flex items-center justify-center text-[12px] font-lora">
              <div className="flex-1 relative tracking-[0.02em] font-semibold">
                e.g. Passport, Driver’s License, etc.
              </div>
            </div>
          </div>
          <div className="self-stretch h-[60px] rounded-xl bg-aliceblue border-whitesmoke border-solid border box-border flex flex-col items-start justify-center py-0 px-6 gap-1">
            <div className="self-stretch flex items-center justify-center">
              <b className="flex-1 relative">Business Permit</b>
            </div>
            <div className="self-stretch flex items-center justify-center text-[12px] font-lora">
              <div className="flex-1 relative tracking-[0.02em] font-semibold">
                Current and valid local government permit to operate a rental business
              </div>
            </div>
          </div>
        </div>

        {/* Back / Proceed */}
        <div className="self-stretch overflow-hidden flex items-center justify-center py-0 px-2.5 gap-2.5 text-center">
          <button
            type="button"
            onClick={onBackClick}
            className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer text-dimgray hover:opacity-70 transition-opacity"
          >
            <b className="relative">Back</b>
          </button>
          <button
            type="button"
            onClick={onNextClick}
            className="rounded-[45px] flex items-center justify-center py-2 px-8 gap-2.5 cursor-pointer text-white hover:opacity-90 transition-opacity"
            style={{ background: '#1a5c50' }}
          >
            <Icon icon="material-symbols-light:owl-rounded" className="h-6 w-6" />
            <b className="relative">Proceed</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationVerification;
