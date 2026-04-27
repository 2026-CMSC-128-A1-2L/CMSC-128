import { FunctionComponent } from "react";
import { Icon } from "@iconify/react";

type Props = {
  onClose: () => void;
  email: string; // passed from BuildingInformation via handleManagerSend
};

// ─── Component ────────────────────────────────────────────────────────────────

const AddManager2: FunctionComponent<Props> = ({ onClose, email }) => {
  return (
    <div className="relative w-[480px] rounded-[16px] bg-white overflow-hidden flex flex-col items-center p-[32px] gap-[24px] text-center">
      {/* Icon */}
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#e0f7f4]">
        <Icon
          icon="solar:letter-bold"
          className="h-[56px] w-[56px] text-[#096c5b]"
          aria-hidden="true"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-[10px]">
        <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-black">
          Manager Invite Sent!
        </b>
        <p className="font-['Inter',sans-serif] text-[14px] leading-[20px] text-black">
          <span className="font-medium">We've notified </span>
          <b>Nathaniel Cunanan</b>
          <span className="font-medium">
            {" "}
            about your invite. The invite will expire in{" "}
          </span>
          <b>7 days</b>
          <span className="font-medium">
            . You'll be notified once they accept or decline.
          </span>
        </p>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="rounded-[12px] bg-[#e0f7f4] py-[12px] px-[32px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80"
      >
        Close
      </button>
    </div>
  );
};

export default AddManager2;
