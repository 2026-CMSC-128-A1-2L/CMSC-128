import { Icon } from '@iconify/react';

interface UserDocumentsSubmissionHeaderProps {
  uploadedCount: number;
  totalCount: number;
  canSubmit: boolean;
  onSubmit: () => void;
}

const UserDocumentsSubmissionHeader = ({
  uploadedCount,
  totalCount,
  canSubmit,
  onSubmit,
}: UserDocumentsSubmissionHeaderProps) => {
  return (
    <div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 shrink-0 text-[24px]">
      <div className="flex-1 flex items-center">
        <div className="flex items-center gap-2 text-[#2F3136]">
          <Icon icon="material-symbols:info-outline" className="w-6 h-6" />
          <b className="relative leading-8">Submit Documents</b>
          <b className="relative text-num-14 text-dimgray">
            {uploadedCount} out of {totalCount} Documents Uploaded
          </b>
        </div>
      </div>
      <button
        type="button"
        disabled={!canSubmit}
        onClick={onSubmit}
        className="h-8 w-24 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-num-12 box-border text-num-14 text-slategray hover:bg-lightcyan-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border shrink-0">
          <b className="relative">Submit</b>
        </div>
      </button>
    </div>
  );
};

export default UserDocumentsSubmissionHeader;
