import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import PopupOverlay from './PopupOverlay';
import ReportOption from './ReportOption';

type RemoveFlowStep = 'select' | 'confirm' | 'success';

type RemoveTenantPopupProps = {
  targetName: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const RemoveTenantPopup = ({ targetName, isOpen, onClose }: RemoveTenantPopupProps) => {
  const [step, setStep] = useState<RemoveFlowStep>('select');
  const [checked, setChecked] = useState({
    backedOut: true,
    noDocuments: true,
    other: false,
  });
  const [otherReason, setOtherReason] = useState('');

  const reset = () => {
    setStep('select');
    setChecked({ backedOut: true, noDocuments: true, other: false });
    setOtherReason('');
  };

  const closeAll = () => {
    reset();
    onClose();
  };

  const allSelected = useMemo(
    () => checked.backedOut && checked.noDocuments && checked.other,
    [checked],
  );

  if (!isOpen || !targetName) return null;

  return (
    <PopupOverlay onClose={closeAll}>
      {step === 'success' ? (
        <div className="flex w-[480px] flex-col items-start gap-[24px] overflow-hidden rounded-[16px] bg-white p-[32px]">
          <div className="flex w-full flex-col items-center gap-[24px] px-[10px] pt-[65px] pb-[24px]">
            <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#cbf6ed] text-[#096c5b]">
              <Icon icon="mdi:check-circle-outline" className="h-[52px] w-[52px]" />
            </span>
            <div className="flex w-full flex-col items-center gap-[10px] p-[10px] text-center text-[#001d18]">
              <h2 className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px]">
                Request Sent
              </h2>
              <p className="font-['Inter',sans-serif] text-[14px] font-medium leading-[20px]">
                Your request for tenant removal has been received. We will verify and notify you
                once it has been approved.
              </p>
            </div>
            <button
              type="button"
              onClick={closeAll}
              className="rounded-[12px] bg-[#cbf6ed] px-[32px] py-[12px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b]"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-[612px] flex-col items-center rounded-[32px] bg-white overflow-hidden max-h-[90vh]">
          {/* Header */}
          <div className="w-full bg-linear-to-b from-[#096c5b] to-[#16917c] px-[57px] py-[12px] shrink-0">
            <div className="w-full py-[32px] pb-[8px]">
              <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">
                Remove Tenant
              </h2>
              <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">
                Remove tenant application
              </p>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex w-full flex-col overflow-y-auto flex-1">
            {step === 'select' ? (
              <div className="flex w-full flex-col gap-[48px] px-[48px] pt-[32px] pb-[20px]">
                <p className="px-[8px] font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#001d18]">
                  {`You are removing ${targetName}. Please select all that apply:`}
                </p>
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-end pr-[22px]">
                    <span className="flex-1 font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
                      Grounds for removal
                    </span>
                    <div className="flex items-center gap-[11px]">
                      <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#64748b]">
                        Select All
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setChecked({
                            backedOut: !allSelected,
                            noDocuments: !allSelected,
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
                    title="Applicant has backed out"
                    description="The applicant has notified of their cancellation."
                    checked={checked.backedOut}
                    onToggle={() => setChecked((prev) => ({ ...prev, backedOut: !prev.backedOut }))}
                  />
                  <ReportOption
                    title="Applicant has failed to submit any document"
                    description="The period of submission of documents has passed."
                    checked={checked.noDocuments}
                    onToggle={() =>
                      setChecked((prev) => ({ ...prev, noDocuments: !prev.noDocuments }))
                    }
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
            ) : (
              <div className="flex w-full px-[48px] pt-[32px] pb-[20px]">
                <div className="flex w-full items-center justify-center gap-[10px] px-[8px]">
                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    className="mt-[4px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] bg-[#096c5b] text-white"
                  >
                    <Icon icon="material-symbols:check-rounded" className="h-[14px] w-[14px]" />
                  </button>
                  <p className="text-center font-['Inter',sans-serif] text-[14px] font-medium leading-[25px] text-[#001d18]">
                    I declare that all information and reports submitted are{' '}
                    <span className="font-bold text-[#096c5b]">truthful</span>,{' '}
                    <span className="font-bold text-[#096c5b]">complete</span>, and{' '}
                    <span className="font-bold text-[#096c5b]">based on verified facts</span> to the
                    best of my knowledge. I acknowledge that any false or misleading information may
                    lead to consequences in accordance with applicable rules and regulations.
                  </p>
                </div>
              </div>
            )}

            {/* Footer buttons — inline with scroll */}
            <div className="flex items-center justify-center gap-[16px] pt-[8px] pb-[42px]">
              <button
                type="button"
                onClick={closeAll}
                className="rounded-[12px] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep((prev) => (prev === 'select' ? 'confirm' : 'success'))}
                className="rounded-[12px] bg-[#cbf6ed] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b]"
              >
                {step === 'select' ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PopupOverlay>
  );
};

export default RemoveTenantPopup;
