import { useState, type MouseEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AtlasLogoText from '../../../assets/logo_atlas_text.svg?react';
import AtlasLogoMin from '../../../assets/atlas logo (for white bg).png';
import SideBarButton, { type SideBarButtonState } from './SideBarButton';
import { useAuthStore } from '../../store/useAuthStore';

export type SideBarItemKey =
  | 'home'
  | 'messages'
  | 'bookmarks'
  | 'calendar'
  | 'finance'
  | 'settings';

type UserInfo = { name?: string; signedIn?: boolean; avatarUrl?: string };

type SideBarProps = {
  activeItem?: SideBarItemKey;
  onToggleDarkMode?: MouseEventHandler<HTMLButtonElement>;
  onProfileClick?: MouseEventHandler<HTMLButtonElement>;
  user?: UserInfo;
  className?: string;
};

const navItems = [
  {
    key: 'home' as const,
    label: 'Home',
    iconFill: 'mdi:home',
    iconOut: 'mdi:home-outline',
    route: '/home',
  },
  {
    key: 'messages' as const,
    label: 'Messages',
    iconFill: 'material-symbols:mail',
    iconOut: 'material-symbols:mail-outline',
    route: '/direct-messages',
  },
  {
    key: 'bookmarks' as const,
    label: 'Bookmarks',
    iconFill: 'material-symbols:bookmark',
    iconOut: 'material-symbols:bookmark-outline',
    route: '/bookmark',
  },
  {
    key: 'calendar' as const,
    label: 'My Calendar',
    iconFill: 'mdi:calendar',
    iconOut: 'mdi:calendar-outline',
    route: '/my-calendar',
  },
  {
    key: 'finance' as const,
    label: 'Finance',
    iconFill: 'majesticons:creditcard',
    iconOut: 'majesticons:creditcard-line',
    route: '/finance',
  },
  {
    key: 'settings' as const,
    label: 'Settings',
    iconFill: 'tabler:settings',
    iconOut: 'tabler:settings',
    route: '/settings',
  },
];

const SideBar = ({
  activeItem,
  onToggleDarkMode,
  onProfileClick,
  className = '',
}: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [internalHover, setInternalHover] = useState<SideBarItemKey>();
  const location = useLocation();

  const resolvedActive: SideBarItemKey | undefined =
    activeItem ?? navItems.find((item) => location.pathname.startsWith(item.route))?.key;

  const { user } = useAuthStore();
  const username = user ? `${user.firstName} ${user.lastName}` : null;

  return (
    <div
      className={[
        'h-full relative flex shrink-0 flex-col items-center border border-solid border-[#f0f0f0] py-8 gap-8 transition-[width] duration-200 min-h-screen',
        collapsed ? 'w-[68px]' : 'w-[200px]',
        className,
      ].join(' ')}
    >
      {/* Toggle */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#f0f0f0] bg-white shadow-sm text-[#666] hover:text-teal-600 transition-colors"
      >
        <Icon
          icon={
            collapsed
              ? 'material-symbols:chevron-right-rounded'
              : 'material-symbols:chevron-left-rounded'
          }
          className="h-4 w-4"
        />
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center px-4 w-full">
        {collapsed ? (
          <img src={AtlasLogoMin} className="w-7 h-7 text-[#2d3748]" aria-label="Atlas" />
        ) : (
          <AtlasLogoText className="fill-[#2d3748] w-32 h-auto" />
        )}
      </div>

      {/* Search */}
      <div className="w-full px-4">
        {collapsed ? (
          <div className="flex justify-center">
            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-gray-200 transition-colors"
            >
              <Icon icon="heroicons:magnifying-glass" className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="w-full h-10 rounded-full bg-[#f5f5f5] flex items-center py-1 px-3 text-[10px]">
            <div className="flex-1 font-semibold text-[#2d3748]">Search</div>
              <Icon  icon="heroicons:magnifying-glass-circle-solid" className="w-8 h-8 text-darkolivegreen" />  
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex w-full flex-col gap-3">
        {navItems.map((item) => {
          const state: SideBarButtonState =
            item.key === resolvedActive
              ? 'clicked'
              : item.key === internalHover
                ? 'hovered'
                : 'default';

          return (
            <Link
              to={item.route}
              key={item.key}
              className="w-full"
              onMouseEnter={() => setInternalHover(item.key)}
              onMouseLeave={() => setInternalHover((p) => (p === item.key ? undefined : p))}
            >
              {collapsed ? (
                <div
                  title={item.label}
                  className={[
                    'flex justify-center items-center h-11 transition-colors hover:bg-[#F0FAF6]',
                    state === 'clicked' ? 'text-teal-600' : 'text-[#2d3748]',
                  ].join(' ')}
                >
                  <Icon
                    icon={state === 'clicked' ? item.iconFill : item.iconOut}
                    className="w-7 h-7"
                  />
                </div>
              ) : (
                <SideBarButton
                  icon={state === 'clicked' ? item.iconFill : item.iconOut}
                  label={item.label}
                  state={state}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-1 w-full flex-col justify-end gap-3">
        {/* Dark mode */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className={[
            'flex w-full cursor-pointer items-center hover:bg-[#F0FAF6] transition-colors',
            collapsed ? 'justify-center h-11' : 'gap-6 pr-5',
          ].join(' ')}
        >
          {!collapsed && <span className="h-11 w-2 shrink-0 rounded-sm bg-transparent" />}
          <span className="flex items-center gap-4 rounded-xl px-1">
            <Icon icon="gg:dark-mode" className="h-6 w-6 shrink-0 text-black" />
            {!collapsed && (
              <span className="font-semibold text-[14px] text-[#2d3748]">Dark Mode</span>
            )}
          </span>
        </button>

        {/* Divider */}
        <div className="px-5 w-full">
          <div className="h-[1px] w-full bg-[#f5f5f5]" />
        </div>

        {/* Profile */}
        <button
          type="button"
          onClick={onProfileClick}
          aria-label={username ?? 'Sign In'}
          className={[
            'flex w-full cursor-pointer items-center overflow-hidden hover:bg-[#F0FAF6] transition-colors',
            collapsed ? 'justify-center py-2' : 'gap-2 pl-8 pr-5 py-2.5',
          ].join(' ')}
        >
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt=""
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
          ) : (
            <Icon icon="bi:person-circle" className="w-7 h-7 shrink-0 text-[#2d3748]" />
          )}
          {!collapsed && (
            <div className="flex flex-col items-start gap-1 overflow-hidden">
              <b className="text-[14px] text-[#2d3748]">{username ?? 'Sign In'}</b>
              {!user && <span className="text-[10px] text-[#9ca3af] font-bold">to continue</span>}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
