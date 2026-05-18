type FileActionPopupProps = {
  isOpen: boolean;
  onApprove: () => void;
  onReject: () => void;
};

const FileActionPopup = ({ isOpen, onApprove, onReject }: FileActionPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-[8px] top-[44px] z-5 flex min-w-[140px] flex-col gap-[10px] rounded-[12px] border border-solid border-[#f0f0f0] bg-white px-[16px] py-[12px] shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
      <button
        type="button"
        onClick={onApprove}
        className="text-left font-['Inter',sans-serif] text-[14px] font-medium text-black hover:text-[#096c5b] cursor-pointer"
      >
        Approve
      </button>
      <button
        type="button"
        onClick={onReject}
        className="text-left font-['Inter',sans-serif] text-[14px] font-medium text-black hover:text-[#ef4444] cursor-pointer"
      >
        Reject
      </button>
    </div>
  );
};

export default FileActionPopup;
