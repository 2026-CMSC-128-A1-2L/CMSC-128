import type { SubmittedDocument } from '../../../../data/landlordTenants';
import PopupOverlay from './PopupOverlay';

type ApproveDocumentPopupProps = {
  document: SubmittedDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ApproveDocumentPopup = ({
  document,
  isOpen,
  onClose,
  onConfirm,
}: ApproveDocumentPopupProps) => {
  if (!isOpen || !document) return null;

  return (
    <PopupOverlay onClose={onClose}>
      <div className="flex w-[612px] max-h-[90vh] flex-col overflow-hidden rounded-tl-[32px] bg-white">
        <div className="w-full shrink-0 rounded-tl-[32px] bg-linear-to-b from-[#096c5b] to-[#16917c] px-[57px] py-[12px]">
          <div className="w-full py-[32px] pb-[8px]">
            <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">
              Approve Document
            </h2>
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">
              Confirm document approval
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[32px] px-[48px] pt-[32px] pb-[24px]">
          <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#001d18]">
            Approve <span className="text-[#096c5b]">{document.title}</span>? This marks the
            submission as verified for this applicant. You can still reject other documents
            separately.
          </p>
          <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#666]">
            File: <span className="font-bold text-[#2f3136]">{document.fileName}</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-[16px] px-[48px] pb-[32px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] transition-opacity hover:opacity-80 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-[12px] bg-[#cbf6ed] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80 cursor-pointer"
          >
            Confirm approval
          </button>
        </div>
      </div>
    </PopupOverlay>
  );
};

export default ApproveDocumentPopup;
