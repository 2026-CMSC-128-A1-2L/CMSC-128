import type { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import type { SubmittedDocument } from '../../../data/landlordTenants';

export type DocumentReviewStatus = 'pending' | 'approved' | 'rejected';

type SubmittedDocumentCardProps = {
  document: SubmittedDocument;
  onView?: (document: SubmittedDocument) => void;
  /** When false, only the view (eye) control is shown (validated tenant documents). Default true. */
  showMoreMenu?: boolean;
  onMoreOptions?: (document: SubmittedDocument) => void;
  actionMenu?: ReactNode;
  /** When set, shows status and hides the more menu for non-pending items. */
  reviewStatus?: DocumentReviewStatus;
};

const kindIcon: Record<SubmittedDocument['kind'], string> = {
  image: 'material-symbols:image-outline-rounded',
  pdf: 'mdi:file-document-outline',
  other: 'mdi:file-outline',
};

const SubmittedDocumentCard = ({
  document,
  onView,
  showMoreMenu = true,
  onMoreOptions,
  actionMenu,
  reviewStatus = 'pending',
}: SubmittedDocumentCardProps) => {
  const menuAllowed = showMoreMenu && reviewStatus === 'pending';

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
          {reviewStatus === 'approved' && (
            <span className="rounded-full bg-[#e8f7f4] px-[10px] py-[2px] font-['Inter',sans-serif] text-[11px] font-bold text-[#096c5b]">
              Approved
            </span>
          )}
          {reviewStatus === 'rejected' && (
            <span className="rounded-full bg-[#fef2f2] px-[10px] py-[2px] font-['Inter',sans-serif] text-[11px] font-bold text-[#dc2626]">
              Rejected
            </span>
          )}
        </div>

        <div
          className={[
            'flex shrink-0 items-center',
            menuAllowed ? 'w-[72px] gap-[24px]' : 'w-[24px] justify-end',
          ].join(' ')}
        >
          <button
            type="button"
            onClick={() => onView?.(document)}
            aria-label={`View ${document.title}`}
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
          >
            <Icon icon="iconamoon:eye" className="h-[24px] w-[24px]" aria-hidden="true" />
          </button>
          {menuAllowed && (
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
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onView?.(document)}
        className="flex w-full items-center gap-[16px] overflow-hidden py-[12px] text-left transition-colors duration-200 hover:text-[#096c5b] focus:outline-none cursor-pointer"
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
