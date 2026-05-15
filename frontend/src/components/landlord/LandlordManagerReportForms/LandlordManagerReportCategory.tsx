import type { FunctionComponent, KeyboardEvent } from 'react';

export type ReportItem = {
  key: string;
  title: string;
  desc?: string;
};

export type ReportCategory = {
  key: string;
  title: string;
  items: ReportItem[];
};

type Props = {
  managerName: string;
  managerEmail: string;
  category: ReportCategory;
  selected: Set<string>;
  isFirstStep: boolean;
  isLastCategory: boolean;
  onToggle: (itemKey: string) => void;
  onToggleAll: () => void;
  onBack: () => void;
  onNext: () => void;
  type?: 'manager' | 'tenant';
};

const CheckSvg = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M20 6L9 17l-5-5"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Checkbox: FunctionComponent<{ active: boolean; onToggle: () => void; ariaLabel?: string }> = ({
  active,
  onToggle,
  ariaLabel,
}) => (
  <span
    role="checkbox"
    tabIndex={0}
    aria-checked={active}
    aria-label={ariaLabel}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    onKeyDown={(e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }
    }}
    className={[
      'inline-flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] transition-colors',
      active
        ? 'bg-[#096c5b] shadow-[0_0_2px_rgba(0,0,0,0.25)] dark:bg-[#12342e]'
        : 'bg-[#f0f0f0] shadow-[0_0_2px_rgba(0,0,0,0.25)] dark:bg-[#1f2022] dark:border dark:border-[#303331]',
    ].join(' ')}
  >
    {active ? <CheckSvg size={14} /> : null}
  </span>
);

const LandlordManagerReportCategory: FunctionComponent<Props> = ({
  managerName,
  managerEmail,
  category,
  selected,
  isFirstStep,
  isLastCategory,
  onToggle,
  onToggleAll,
  onCancel,
  onBack,
  onNext,
  type = 'manager',
}) => {
  const allChecked = category.items.every((item) => selected.has(item.key));

  return (
    <div className="relative flex max-h-[90vh] w-[612px] flex-col items-center overflow-hidden rounded-[26px] bg-white dark:bg-[#141515]">
      {/* Header */}
      <div
        className="flex w-full flex-col items-start justify-center pl-[57px] pr-[32px] py-[12px]"
        style={{
          backgroundImage:
            'linear-gradient(180.76181469696922deg, rgb(9, 108, 91) 1.4032%, rgb(22, 145, 124) 96.96%)',
        }}
      >
        <div className="flex w-full flex-col items-start justify-center pb-[8px] pt-[32px]">
          <b className="font-['Poppins',sans-serif] text-[32px] leading-[normal] text-white">
            {type === 'tenant' ? 'Report Tenant' : 'Report Manager'}
          </b>
          <b className="font-['Inter',sans-serif] text-[18px] leading-[normal] tracking-[-0.18px] text-[#f1f5f9]">
            Report your {type === 'tenant' ? 'tenant' : 'dorm manager'}
          </b>
        </div>
      </div>

      {/* Body */}
      <div className="flex w-full flex-1 flex-col gap-[48px] overflow-y-auto px-[48px] pt-[32px] pb-[20px]">
        <div className="flex w-full flex-col gap-[12px]">
          <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
            Email Address
          </span>
          <div className="flex h-[48px] w-full items-center rounded-[12px] border border-solid border-[#f0f0f0] dark:border-[#303331] px-[16px] py-[4px]">
            <span className="font-['Inter',sans-serif] text-[14px] font-medium leading-[24px] text-[#64748b] dark:text-[#d7e0ef]">
              {managerEmail}
            </span>
          </div>
          <div className="flex w-full items-center justify-center px-[8px]">
            <p className="flex-1 font-['Inter',sans-serif] text-[18px] font-bold leading-[normal] tracking-[-0.18px] text-black dark:text-[#d7e0ef]">
              You are reporting {managerName}. Please select all that apply:
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-[12px]">
          <div className="flex w-full items-end pr-[22px]">
            <span className="flex-1 font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
              {category.title}
            </span>
            <div className="flex items-center gap-[11px]">
              <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#64748b] dark:text-[#a4acba]">
                Select All
              </span>
              <Checkbox
                active={allChecked}
                onToggle={onToggleAll}
                ariaLabel={`Select all in ${category.title}`}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-[8px]">
            {category.items.map((item) => {
              const active = selected.has(item.key);
              const hasDesc = !!item.desc;
              return (
                <div
                  key={item.key}
                  role="button"
                  tabIndex={0}
                  onClick={() => onToggle(item.key)}
                  onKeyDown={(e: KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onToggle(item.key);
                    }
                  }}
                  className={[
                    'flex w-full cursor-pointer items-center gap-[16px] rounded-[12px] py-[12px] pl-[24px] pr-[22px] text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#096c5b]/40',
                    active ? 'bg-[#f0fdf9] dark:bg-[#1f3a34]' : 'hover:bg-[#fafafa] dark:hover:bg-[#1f2022]',
                  ].join(' ')}
                >
                  <div className="flex flex-1 flex-col gap-[4px]">
                    <span className="font-['Inter',sans-serif] text-[14px] font-bold text-black dark:text-[#d7e0ef]">
                      {item.title}
                    </span>
                    {hasDesc && (
                      <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#666] dark:text-[#a4acba]">
                        {item.desc}
                      </span>
                    )}
                  </div>
                  <Checkbox active={active} onToggle={() => onToggle(item.key)} ariaLabel={item.title} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex w-full items-center justify-center gap-[16px] pb-[32px] pt-[16px]">
        {isFirstStep ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[12px] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] dark:text-red-400 transition-opacity hover:opacity-70"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="rounded-[12px] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#666] dark:text-[#a4acba] transition-opacity hover:opacity-70"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80"
        >
          {isLastCategory ? 'Continue' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default LandlordManagerReportCategory;
