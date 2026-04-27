import { type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import type { PendingApplication } from '../../../data/landlordTenants';
import TenantAvatar from './TenantAvatar';

type UnvalidatedTenantCardProps = {
  application: PendingApplication;
  detailTo: string;
  onValidate?: (application: PendingApplication) => void;
  onMoreOptions?: (application: PendingApplication) => void;
  actionMenu?: ReactNode;
};

const UnvalidatedTenantCard = ({
  application,
  detailTo,
  onValidate,
  onMoreOptions,
  actionMenu,
}: UnvalidatedTenantCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(detailTo);
  };

  const handleCardKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(detailTo);
    }
  };

  const handleValidate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (onValidate) {
      onValidate(application);
      return;
    }
    navigate(detailTo);
  };

  const handleMore = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onMoreOptions?.(application);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKey}
      aria-label={`Review application from ${application.displayName}`}
      className="group relative flex w-full cursor-pointer flex-col rounded-[16px] border border-solid border-[#f0f0f0] bg-white px-[12px] pt-[12px] pb-[24px] transition-shadow duration-200 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#096c5b]/40"
    >
      <div className="flex h-[32px] w-full items-center gap-[8px] px-[10px] py-[4px]">
        {application.reviewedByManager && (
          <>
            <span
              aria-hidden="true"
              className="flex h-[24px] w-[24px] items-center justify-center text-[#096c5b]"
            >
              <Icon icon="fluent:checkmark-circle-20-regular" className="h-[20px] w-[20px]" />
            </span>
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#096c5b]">
              Reviewed by Dorm Manager
            </span>
          </>
        )}
      </div>

      <div className="flex w-full items-center gap-[10px] px-[16px] py-[10px]">
        <TenantAvatar photoUrl={application.photoUrl} name={application.displayName} size={72} />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[8px] px-[4px] py-[8px]">
          <p className="truncate font-['Inter',sans-serif] text-[14px] font-bold text-black">
            {application.displayName}
          </p>
          <div className="flex flex-col gap-[4px] font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
            <span className="truncate">{application.unit}</span>
            <span className="truncate">{`Submitted on: ${application.submittedOn}`}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMore}
          aria-label={`More options for ${application.displayName}`}
          className="flex h-[24px] w-[12px] shrink-0 cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
        >
          <Icon
            icon="iconamoon:menu-kebab-vertical"
            className="h-[24px] w-[24px]"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-[12px] px-[16px]">
        <button
          type="button"
          onClick={handleValidate}
          className="flex cursor-pointer items-center justify-center rounded-[16px] bg-[#cbf6ed] px-[24px] py-[12px] font-['Inter',sans-serif] text-[14px] font-bold text-[#096c5b] transition-colors duration-200 hover:bg-[#b4efe1]"
        >
          Validate
        </button>
      </div>
      {actionMenu}
    </div>
  );
};

export default UnvalidatedTenantCard;
