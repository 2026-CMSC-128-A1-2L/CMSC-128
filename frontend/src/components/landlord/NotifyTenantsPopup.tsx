// NotifyTenantsPopup.tsx
import { type FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NotifyTenantsPopup: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex w-[480px] flex-col items-center overflow-hidden rounded-[26px] bg-white max-h-[90vh]">

        {/* Header */}
        <div className="w-full bg-linear-to-b from-[#096c5b] to-[#16917c] px-[46px] py-[10px] shrink-0">
          <div className="flex flex-col items-start pt-[26px] pb-[6px] gap-[4px]">
            <b className="font-['Poppins',sans-serif] text-[28px] text-white">Notify Tenants</b>
            <b className="font-['Inter',sans-serif] text-[15px] tracking-[-0.01em] text-[#e8f4f8]">
              Payment reminder
            </b>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex w-full flex-col items-center overflow-y-auto flex-1 px-[46px] pt-[32px]">

          {/* Success icon */}
          <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#cbf6ed] text-[#096c5b]">
            <Icon icon="mdi:check-circle-outline" className="h-[52px] w-[52px]" />
          </span>

          {/* Message */}
          <div className="flex w-full flex-col items-center gap-[10px] pt-[24px] pb-[8px] text-center">
            <h2 className="font-['Inter',sans-serif] text-[20px] font-bold text-[#001d18]">
              Tenants Notified
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] font-medium leading-[22px] text-[#666]">
              All your tenants have been successfully informed of their pending payments. They will receive a notification shortly.
            </p>
          </div>

          {/* Footer button — inline with scroll */}
          <div className="flex items-center justify-center gap-[13px] pt-[16px] pb-[42px]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[10px] bg-[#e0f7f4] py-[6px] px-[20px] font-['Inter',sans-serif] text-[13px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80"
            >
              Got it
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotifyTenantsPopup;