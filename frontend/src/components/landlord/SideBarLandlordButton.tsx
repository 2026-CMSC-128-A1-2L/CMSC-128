import type { MouseEventHandler } from 'react';
import { Icon } from '@iconify/react';

export type SideBarLandlordButtonState = 'default' | 'hovered' | 'clicked';

type SideBarLandlordButtonProps = {
  icon: string;
  label: string;
  state?: SideBarLandlordButtonState;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconClassName?: string;
};

const getHighlightClasses = (state: SideBarLandlordButtonState): string => {
  if (state === 'clicked') return 'bg-[#096c5b] opacity-100 dark:bg-[#72cbb8]';
  return 'bg-[#096c5b] opacity-0 dark:bg-[#72cbb8]';
};

const getTextClasses = (state: SideBarLandlordButtonState): string => {
  if (state === 'clicked') return 'text-[#096c5b] dark:text-[#72cbb8]';
  return 'text-[#001d18] dark:text-[#d7e0ef]';
};

const SideBarLandlordButton = ({
  icon,
  label,
  state = 'default',
  onClick,
  iconClassName = 'h-[24px] w-[24px]',
}: SideBarLandlordButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={state === 'clicked' ? 'page' : undefined}
      className={[
        'group flex w-[180px] cursor-pointer items-center gap-[24px] pr-[20px]',
        'transition-colors duration-200 ease-in-out',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'h-[44px] w-[8px] shrink-0 rounded-[4px] transition-colors duration-200 ease-in-out',
          getHighlightClasses(state),
          '',
        ].join(' ')}
      />

      <span
        className={[
          'flex h-[44px] flex-1 items-center gap-[16px] rounded-[12px] px-[4px]',
          'transition-colors duration-200 ease-in-out',
          state === 'default' ? 'group-hover:bg-[#F0FAF6] dark:group-hover:bg-[#17201d]' : '',
        ].join(' ')}
      >
        <span
          className={[
            'flex h-[24px] w-[24px] shrink-0 items-center justify-center',
            'transition-colors duration-200 ease-in-out',
            getTextClasses(state),
          ].join(' ')}
        >
          <Icon icon={icon} className={iconClassName} aria-hidden="true" />
        </span>
        <span
          className={[
            "font-['Inter',sans-serif] text-[14px] font-semibold leading-[normal]",
            'transition-colors duration-200 ease-in-out',
            getTextClasses(state),
          ].join(' ')}
        >
          {label}
        </span>
      </span>
    </button>
  );
};

export default SideBarLandlordButton;
