import { Icon } from '@iconify/react';

type ReportOptionProps = {
  title: string;
  description?: string;
  checked: boolean;
  onToggle: () => void;
  withReasonInput?: boolean;
  reason?: string;
  onReasonChange?: (value: string) => void;
};

const ReportOption = ({
  title,
  description,
  checked,
  onToggle,
  withReasonInput = false,
  reason = '',
  onReasonChange,
}: ReportOptionProps) => {
  return (
    <div className="flex w-full flex-col gap-[12px] rounded-[12px] px-[24px] py-[12px]">
      <div className="flex w-full items-center gap-[16px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
          <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#001d18]">
            {title}
          </span>
          {description && (
            <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#666]">
              {description}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${checked ? 'Uncheck' : 'Check'} ${title}`}
          className={[
            'flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]',
            checked ? 'bg-[#096c5b] text-white' : 'bg-[#f2f2f2] text-transparent',
          ].join(' ')}
        >
          <Icon icon="material-symbols:check-rounded" className="h-[18px] w-[18px] cursor-pointer" />
        </button>
      </div>

      {withReasonInput && checked && (
        <textarea
          rows={3}
          value={reason}
          onChange={(event) => onReasonChange?.(event.target.value)}
          placeholder="Reason for rejection (optional)"
          className="w-full resize-none rounded-[16px] border border-solid border-[#f0f0f0] bg-white px-[16px] py-[12px] font-['Inter',sans-serif] text-[14px] font-medium text-[#001d18] outline-none placeholder:text-[rgba(0,0,0,0.38)] focus:border-[#096c5b]/40"
        />
      )}
    </div>
  );
};

export default ReportOption;
