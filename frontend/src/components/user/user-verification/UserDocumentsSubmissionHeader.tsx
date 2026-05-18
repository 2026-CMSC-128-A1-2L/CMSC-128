import { Icon } from '@iconify/react';

interface UserDocumentsSubmissionHeaderProps {
  uploadedCount: number;
  totalCount: number;
  canSubmit: boolean;
  isSubmitting?: boolean;
  onSubmit: () => void;
}

const UserDocumentsSubmissionHeader = ({
  uploadedCount,
  totalCount,
  canSubmit,
  isSubmitting = false,
  onSubmit,
}: UserDocumentsSubmissionHeaderProps) => {
  return (
    <div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 shrink-0 text-[24px]">
      <div className="flex-1 flex items-center">
        <div className="flex items-center gap-2 text-[#2F3136] dark:text-[#edf6f4]">
          <Icon icon="material-symbols:info-outline" className="w-6 h-6" />
          <b className="relative leading-8">Submit Documents</b>
          <b className="relative text-num-14 text-dimgray dark:text-[#a4acba]">
            {uploadedCount} out of {totalCount} Documents Uploaded
          </b>
        </div>
      </div>
      <button
        type="button"
        disabled={!canSubmit || isSubmitting}
        onClick={onSubmit}
        className={[
          'flex h-[32px] w-[96px] items-center justify-center rounded-[16px] px-[12px]',
          'font-["Inter",sans-serif] text-[14px] font-bold transition-colors duration-200',
          canSubmit
            ? 'cursor-pointer bg-[#096c5b] text-white hover:bg-[#075a4c] dark:bg-[#1c5b4b] dark:text-[#edf6f4] dark:hover:bg-[#24705d]'
            : 'cursor-not-allowed bg-[#f1f5f9] text-[#64748b] dark:bg-[#202327] dark:text-[#8d95a3]',
        ].join(' ')}
      >
        {isSubmitting ? 'Sending' : 'Submit'}
      </button>
    </div>
  );
};

export default UserDocumentsSubmissionHeader;
