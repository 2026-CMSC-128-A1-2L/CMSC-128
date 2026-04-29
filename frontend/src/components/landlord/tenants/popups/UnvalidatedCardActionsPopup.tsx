type UnvalidatedCardActionsPopupProps = {
  isOpen: boolean;
  onMessage: () => void;
  onRequestInterview: () => void;
  onRemoveRequest: () => void;
};

const baseItemClass =
  "text-left font-['Inter',sans-serif] text-[14px] font-medium text-black hover:text-[#096c5b]";

const UnvalidatedCardActionsPopup = ({
  isOpen,
  onMessage,
  onRequestInterview,
  onRemoveRequest,
}: UnvalidatedCardActionsPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-[8px] top-[52px] z-5 flex min-w-[176px] flex-col gap-[10px] rounded-[12px] border border-solid border-[#f0f0f0] bg-white px-[16px] py-[12px] shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
      <button type="button" onClick={onMessage} className={baseItemClass}>
        Message
      </button>
      <button type="button" onClick={onRequestInterview} className={baseItemClass}>
        Request Interview
      </button>
      <button type="button" onClick={onRemoveRequest} className={baseItemClass}>
        Remove Request
      </button>
    </div>
  );
};

export default UnvalidatedCardActionsPopup;
