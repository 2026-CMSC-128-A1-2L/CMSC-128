import { useRef, type ChangeEvent } from 'react';
import { Icon } from '@iconify/react';

export type DocumentStatus = 'missing' | 'uploaded' | 'accepted' | 'rejected';

type DocumentUploadCardProps = {
  title: string;
  acceptedHint: string;
  accept?: string;
  status: DocumentStatus;
  fileName?: string;
  onFileSelected?: (file: File) => void;
  onView?: () => void;
  onMoreOptions?: () => void;
};

const getStatusLabel = (status: DocumentStatus): { label: string; gradientClass: string } => {
  switch (status) {
    case 'missing':
      return {
        label: 'Missing',
        gradientClass: 'from-[#c00f0f] to-[#e44f4f]',
      };
    case 'rejected':
      return {
        label: 'Rejected',
        gradientClass: 'from-[#c00f0f] to-[#e44f4f]',
      };
    case 'uploaded':
      return {
        label: 'Uploaded',
        gradientClass: 'from-[#5dc2a8] to-[#0c8873]',
      };
    case 'accepted':
      return {
        label: 'Accepted',
        gradientClass: 'from-[#5dc2a8] to-[#0c8873]',
      };
  }
};

const DocumentUploadCard = ({
  title,
  acceptedHint,
  accept,
  status,
  fileName,
  onFileSelected,
  onView,
  onMoreOptions,
}: DocumentUploadCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { label, gradientClass } = getStatusLabel(status);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <div className="flex w-full max-w-[916px] flex-col items-start justify-center gap-[10px] overflow-hidden rounded-[16px] border border-solid border-[#f0f0f0] bg-white px-[32px] py-[10px]">
      <div className="flex w-full items-center justify-between pr-[24px]">
        <div className="flex flex-1 items-center gap-[16px]">
          <h3 className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-[#2f3136]">
            {title}
          </h3>
          <span
            className={[
              'flex h-[32px] w-[96px] items-center justify-center rounded-[16px] bg-white px-[12px]',
              'bg-clip-text bg-linear-to-b font-["Inter",sans-serif] text-[14px] font-bold text-transparent whitespace-nowrap',
              gradientClass,
            ].join(' ')}
          >
            {label}
          </span>
        </div>
        <div className="flex w-[72px] items-center gap-[24px]">
          <button
            type="button"
            onClick={onView}
            aria-label={`View ${title}`}
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#2f3136]"
          >
            <Icon icon="iconamoon:eye" className="h-[24px] w-[24px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onMoreOptions}
            aria-label={`More options for ${title}`}
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#2f3136]"
          >
            <Icon
              icon="qlementine-icons:menu-dots-16"
              className="h-[24px] w-[24px]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="flex w-full max-w-[852px] cursor-pointer items-center overflow-hidden rounded-[16px] border border-dashed border-[#666] px-[16px] py-[12px] transition-colors duration-200 hover:bg-[#f9fafb]"
      >
        <div className="flex h-[64px] items-center gap-[24px]">
          <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center text-[#666]">
            <Icon icon="icons8:upload-2" className="h-[64px] w-[64px]" aria-hidden="true" />
          </span>
          <div className="flex flex-col items-start justify-center gap-[8px] text-left whitespace-nowrap">
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-black">
              {fileName || 'Upload the document'}
            </span>
            <span className="font-['Lora',serif] text-[12px] font-semibold tracking-[0.24px] text-[#64748b]">
              {acceptedHint}
            </span>
          </div>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default DocumentUploadCard;
