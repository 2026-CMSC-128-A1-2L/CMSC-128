import type { MouseEventHandler } from 'react';
import { Icon } from '@iconify/react';

export type SideBarButtonState = 'default' | 'hovered' | 'clicked';

type SideBarButtonProps = {
  icon: string;
  label: string;
  state?: SideBarButtonState;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const SideBarButton = ({ icon, label, state = 'default', onClick }: SideBarButtonProps) => {
  const active = state === 'clicked';
  const hovered = state === 'hovered';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className="group flex w-full cursor-pointer items-center gap-6 pr-5"
    >
      <span
        aria-hidden="true"
        className={[
          'h-12 w-1.5 shrink-0 rounded-sm transition-colors duration-200',
          active ? 'bg-[#096c5b]' : hovered ? 'bg-[#BEEDE1]' : 'bg-transparent group-hover:bg-[#BEEDE1]',
        ].join(' ')}
      />
      <span
        className={[
          'flex h-11 flex-1 items-center gap-2 rounded-xl px-1 transition-colors duration-200',
          !active && 'group-hover:bg-[#F0FAF6]',
        ].join(' ')}
      >
        <Icon
          icon={icon}
          className={['w-7 h-7', active ? 'text-[#096c5b]' : 'text-[#2d3748]'].join(' ')}
          aria-hidden="true"
        />
        <span className={['font-semibold text-[14px]', active ? 'text-[#096c5b]' : 'text-[#2d3748]'].join(' ')}>
          {label}
        </span>
      </span>
    </button>
  );
};

export default SideBarButton;