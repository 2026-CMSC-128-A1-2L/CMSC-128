import type { MouseEventHandler, ReactNode } from 'react';

export type SideBarAdminButtonState = 'default' | 'hovered' | 'clicked';

type SideBarAdminButtonProps = {
  icon: ReactNode;
  label: string;
  collapsed?: boolean;
  state?: SideBarAdminButtonState;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const getStateClasses = (state: SideBarAdminButtonState): string => {
  if (state === 'clicked') {
    return 'bg-[#BEEDE1] border-[5px] border-[#9DDCCB]';
  }

  if (state === 'hovered') {
    return 'bg-[#E1F7F0] border-[5px] border-[#BEEDE1]';
  }

  return 'bg-transparent border-[5px] border-transparent hover:bg-[#EAF9F4] hover:border-[#C8EEE3]';
};

const SideBarAdminButton = ({
  icon,
  label,
  collapsed = false,
  state = 'default',
  onClick,
}: SideBarAdminButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={collapsed ? label : undefined}
      className={[
        'h-[68px] cursor-pointer rounded-[10px] transition-all duration-300 ease-in-out',
        'flex items-center text-left',
        collapsed ? 'w-[84px] justify-center px-0' : 'w-[290px] gap-[18px] px-[12px]',
        getStateClasses(state),
      ].join(' ')}
    >
      <span className="flex h-[42px] w-[37px] items-center justify-center text-black">{icon}</span>
      <span
        className={[
          "font-['Outfit',sans-serif] text-[32px] font-semibold leading-[1.5] text-black",
          'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
          collapsed ? 'max-w-0 opacity-0' : 'max-w-[220px] opacity-100',
        ].join(' ')}
      >
        {label}
      </span>
    </button>
  );
};

export default SideBarAdminButton;
