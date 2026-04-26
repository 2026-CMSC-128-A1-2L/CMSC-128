import type { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import type { SubmittedDocument } from '../../../data/landlordTenants';

type SubmittedDocumentCardProps = {
  document: SubmittedDocument;
  onView?: (document: SubmittedDocument) => void;
  onMoreOptions?: (document: SubmittedDocument) => void;
  actionMenu?: ReactNode;
};

const kindIcon: Record<SubmittedDocument['kind'], string> = {
  image: 'material-symbols:image-outline-rounded',
  pdf: 'mdi:file-document-outline',
  other: 'mdi:file-outline',
};

const SubmittedDocumentCard = ({
  document,
  onView,
  onMoreOptions,
  actionMenu,
}: SubmittedDocumentCardProps) => {
  return (
    <div className="relative flex w-full flex-col items-start justify-center gap-[10px] overflow-hidden rounded-[16px] border border-solid border-[#f0f0f0] bg-white px-[32px] py-[10px]">
      <div className="flex w-full items-center justify-between pr-[24px]">
        <div className="flex min-w-0 flex-1 items-center gap-[16px]">
          <h3 className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-[#2f3136]">
            {document.title}
          </h3>
          {document.descriptor && (
            <span className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-[#666]">
              {document.descriptor}
            </span>
          )}
        </div>

        <div className="flex w-[72px] shrink-0 items-center gap-[24px]">
          <button
            type="button"
            onClick={() => onView?.(document)}
            aria-label={`View ${document.title}`}
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
          >
            <Icon icon="iconamoon:eye" className="h-[24px] w-[24px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onMoreOptions?.(document)}
            aria-label={`More options for ${document.title}`}
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
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
        onClick={() => onView?.(document)}
        className="flex w-full items-center gap-[16px] overflow-hidden py-[12px] text-left transition-colors duration-200 hover:text-[#096c5b] focus:outline-none"
      >
        <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center text-[#2f3136]">
          <Icon icon={kindIcon[document.kind]} className="h-[52px] w-[52px]" aria-hidden="true" />
        </span>
        <span className="flex flex-col items-start justify-center gap-[8px] whitespace-nowrap">
          <span className="font-['Inter',sans-serif] text-[14px] font-bold text-black">
            {document.fileName}
          </span>
          <span className="font-['Lora',serif] text-[12px] font-semibold tracking-[0.24px] text-[#64748b]">
            {`Submitted: ${document.submittedAt}`}
          </span>
        </span>
      </button>
      {actionMenu}
    </div>
  );
};

export default SubmittedDocumentCard;
