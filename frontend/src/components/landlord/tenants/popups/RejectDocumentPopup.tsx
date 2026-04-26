import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import type { SubmittedDocument } from '../../../../data/landlordTenants';
import PopupOverlay from './PopupOverlay';
import ReportOption from './ReportOption';

type RejectDocumentPopupProps = {
  document: SubmittedDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const RejectDocumentPopup = ({ document, isOpen, onClose, onConfirm }: RejectDocumentPopupProps) => {
  const [checked, setChecked] = useState({
    unreadable: true,
    incorrect: true,
    other: false,
  });
  const [otherReason, setOtherReason] = useState('');

  const allSelected = useMemo(
    () => checked.unreadable && checked.incorrect && checked.other,
    [checked],
  );

  const closeAll = () => {
    setChecked({ unreadable: true, incorrect: true, other: false });
    setOtherReason('');
    onClose();
  };

  if (!isOpen || !document) return null;

  return (
    <PopupOverlay onClose={closeAll}>
      <div className="flex w-[612px] flex-col items-center gap-[42px] rounded-tl-[32px] bg-white pb-[32px]">
        <div className="flex w-full flex-col">
          <div className="rounded-tl-[32px] bg-gradient-to-b from-[#096c5b] to-[#16917c] px-[57px] py-[12px]">
            <div className="w-full py-[32px] pb-[8px]">
              <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">
                Reject Document
              </h2>
              <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">
                Reject submitted document
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-[48px] px-[48px] pt-[32px] pb-[20px]">
            <p className="px-[8px] font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#001d18]">
              {`You are rejecting ${document.title}. Please select all that apply:`}
            </p>

            <div className="flex flex-col gap-[12px]">
              <div className="flex items-end pr-[22px]">
                <span className="flex-1 font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
                  Grounds for rejection
                </span>
                <div className="flex items-center gap-[11px]">
                  <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#64748b]">
                    Select All
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setChecked({
                        unreadable: !allSelected,
                        incorrect: !allSelected,
                        other: !allSelected,
                      })
                    }
                    className={[
                      'flex h-[24px] w-[24px] items-center justify-center rounded-[4px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]',
                      allSelected ? 'bg-[#096c5b] text-white' : 'bg-[#f2f2f2] text-transparent',
                    ].join(' ')}
                  >
                    <Icon icon="material-symbols:check-rounded" className="h-[18px] w-[18px]" />
                  </button>
                </div>
              </div>

              <ReportOption
                title="Document is unreadable"
                description="Submission is blurry and cannot be read."
                checked={checked.unreadable}
                onToggle={() => setChecked((prev) => ({ ...prev, unreadable: !prev.unreadable }))}
              />
              <ReportOption
                title="Incorrect document"
                description="Submission does not match requirements."
                checked={checked.incorrect}
                onToggle={() => setChecked((prev) => ({ ...prev, incorrect: !prev.incorrect }))}
              />
              <ReportOption
                title="Other"
                checked={checked.other}
                onToggle={() => setChecked((prev) => ({ ...prev, other: !prev.other }))}
                withReasonInput
                reason={otherReason}
                onReasonChange={setOtherReason}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            onClick={closeAll}
            className="rounded-[12px] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              closeAll();
            }}
            className="rounded-[12px] bg-[#cbf6ed] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b]"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </PopupOverlay>
  );
};

export default RejectDocumentPopup;
