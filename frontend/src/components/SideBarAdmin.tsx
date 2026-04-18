import { useEffect, useState, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarAdminButton from './SideBarAdminButton';
import { Icon } from '@iconify/react';

export type SideBarAdminMode = 'expanded' | 'minimized';
export type SideBarAdminItemKey =
  | 'applications'
  | 'reports'
  | 'listings'
  | 'analytics'
  | 'messages'
  | 'announce';

type SideBarAdminProps = {
  mode?: SideBarAdminMode;
  activeItem?: SideBarAdminItemKey;
  hoveredItem?: SideBarAdminItemKey;
  onItemClick?: (item: SideBarAdminItemKey) => void;
  onSignOut?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const navItems: Array<{
  key: SideBarAdminItemKey;
  label: string;
  iconName: string;
  route: string;
}> = [
  {
    key: 'applications',
    label: 'Applications',
    iconName: 'solar:laptop-outline',
    route: '/admin/applications',
  },
  {
    key: 'reports',
    label: 'Reports',
    iconName: 'material-symbols:report',
    route: '/admin/reports',
  },
  {
    key: 'listings',
    label: 'Listings',
    iconName: 'roentgen:apartments-4-story',
    route: '/admin/listings',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    iconName: 'solar:chart-outline',
    route: '/admin/analytics',
  },
  {
    key: 'messages',
    label: 'Messages',
    iconName: 'solar:chat-round-dots-outline',
    route: '/admin/messages',
  },
  {
    key: 'announce',
    label: 'Announce',
    iconName: 'grommet-icons:announce',
    route: '/admin/announce',
  },
];

const SideBarAdmin = ({
  mode,
  activeItem = 'analytics',
  hoveredItem,
  onItemClick,
  onSignOut,
  className = '',
}: SideBarAdminProps) => {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState<SideBarAdminMode>(mode ?? 'expanded');

  useEffect(() => {
    if (mode) {
      setCurrentMode(mode);
    }
  }, [mode]);

  const collapsed = currentMode === 'minimized';

  const toggleSidebarMode = () => {
    setCurrentMode((prevMode) => (prevMode === 'expanded' ? 'minimized' : 'expanded'));
  };

  return (
    <aside
      className={`relative h-auto min-h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out ${collapsed ? 'w-[108px]' : 'w-[336px]'} ${className}`}
    >
      <div
        className={[
          'relative z-10 flex min-h-full w-full flex-col rounded-r-[20px] bg-[#ebebeb] transition-all duration-300 ease-in-out',
          'shadow-[0_4px_100px_rgba(0,0,0,0.25)]',
          collapsed ? 'px-[12px] pb-[36px] pt-[24px]' : 'px-[17px] pb-[35px] pt-[24px]',
        ].join(' ')}
      >
        <button
          type="button"
          onClick={toggleSidebarMode}
          aria-label={collapsed ? 'Expand sidebar' : 'Minimize sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Minimize sidebar'}
          className={[
            'mb-[16px] flex h-[68px] cursor-pointer items-center rounded-[10px] border-[5px] border-transparent text-black',
            collapsed ? 'w-[84px] justify-center' : 'w-full justify-end pr-[12px]',
          ].join(' ')}
        >
          <span
            className={[
              'flex h-[42px] w-[37px] items-center justify-center transition-transform duration-300 ease-in-out',
              collapsed ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          >
            <Icon
              icon="solar:hamburger-menu-outline"
              className="h-[38px] w-[38px]"
              aria-hidden="true"
            />
          </span>
        </button>

        <div className="flex flex-col gap-[12px]">
          {navItems.map((item) => {
            const state =
              item.key === activeItem
                ? 'clicked'
                : item.key === hoveredItem
                  ? 'hovered'
                  : 'default';

            return (
              <SideBarAdminButton
                key={item.key}
                icon={
                  <Icon icon={item.iconName} className="h-[34px] w-[34px]" aria-hidden="true" />
                }
                label={item.label}
                collapsed={collapsed}
                state={state}
                onClick={() => {
                  onItemClick?.(item.key);
                  navigate(item.route);
                }}
              />
            );
          })}
        </div>

        <div className="flex-1" />

        <div
          className={[
            'mx-auto mb-[24px] h-[3px] rounded-full bg-[#bebebe]',
            collapsed ? 'w-[58px]' : 'w-[276px]',
          ].join(' ')}
        />

        <button
          type="button"
          onClick={onSignOut}
          aria-label="Sign Out"
          className={[
            'flex h-[68px] items-center rounded-[10px] border-[5px] border-transparent text-black transition-all duration-300 ease-in-out',
            collapsed ? 'w-[84px] justify-center' : 'w-[290px] gap-[18px] px-[12px]',
          ].join(' ')}
        >
          <span className="flex h-[42px] w-[37px] items-center justify-center">
            <Icon icon="uil:signout" className="h-[34px] w-[34px]" aria-hidden="true" />
          </span>
          <span
            className={[
              "font-['Outfit',sans-serif] text-[32px] font-semibold leading-[1.5] text-black",
              'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100',
            ].join(' ')}
          >
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default SideBarAdmin;
