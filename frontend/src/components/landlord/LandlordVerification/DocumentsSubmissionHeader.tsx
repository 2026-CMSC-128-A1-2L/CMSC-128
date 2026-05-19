import { Icon } from '@iconify/react';
import type { VerificationStep } from '../VerificationProgress';

interface DocumentsSubmissionHeaderProps {
  uploadedCount: number;
  totalCount: number;
  canSubmit: boolean;
  isSubmitting?: boolean;
  statefulVerificationStep: VerificationStep;
  onSubmit: () => void;
}

const DocumentsSubmissionHeader = ({
  uploadedCount,
  totalCount,
  canSubmit,
  isSubmitting = false,
  statefulVerificationStep,
  onSubmit,
}: DocumentsSubmissionHeaderProps) => {
  const buttonLabel =
    isSubmitting
      ? 'Sending...'
      : statefulVerificationStep === 'reviewing'
        ? 'Resubmit'
        : 'Submit';

  return (
    <div className="flex w-full items-center gap-[24px] px-[32px]">
      <div className="flex flex-1 items-center">
        <div className="flex items-center gap-[8px]">
          <Icon
            icon="material-symbols:info-outline"
            className="h-[24px] w-[24px] text-[#2f3136]"
            aria-hidden="true"
          />
          <h2 className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] whitespace-nowrap text-[#2f3136]">
            Submit Documents
          </h2>
          <span className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-[#666]">
            {uploadedCount} out of {totalCount} Documents Uploaded
          </span>
        </div>
      </div>
      <button
        type="button"
        disabled={!canSubmit || isSubmitting}
        onClick={onSubmit}
        className={[
          'flex h-[32px] w-[96px] items-center justify-center rounded-[16px] px-[12px]',
          'font-["Inter",sans-serif] text-[14px] font-bold transition-colors duration-200',
          canSubmit && !isSubmitting
            ? 'cursor-pointer bg-[#096c5b] text-white hover:bg-[#075a4c]'
            : 'cursor-not-allowed bg-[#f1f5f9] text-[#64748b]',
        ].join(' ')}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default DocumentsSubmissionHeader;
