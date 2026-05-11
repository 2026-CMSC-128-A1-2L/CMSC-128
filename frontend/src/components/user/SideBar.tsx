import { useCallback, useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AtlasLogoText from '../../../assets/logo_atlas_text.svg?react';
import AtlasLogoMin from '../../../assets/atlas logo (for white bg).png';
import SideBarButton, { type SideBarButtonState } from './SideBarButton';
import { useAuthStore } from '../../store/useAuthStore';
import UserMenuPopup from './UserMenuPopup';
import { useTheme } from '../../pages/utilities/DarkMode';

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
  { key: 'home' as const, label: 'Home', iconFill: 'mdi:home', iconOut: 'mdi:home-outline', route: '/home' },
  { key: 'messages' as const, label: 'Messages', iconFill: 'material-symbols:mail', iconOut: 'material-symbols:mail-outline', route: '/direct-messages' },
  { key: 'bookmarks' as const, label: 'Bookmarks', iconFill: 'material-symbols:bookmark', iconOut: 'material-symbols:bookmark-outline', route: '/bookmark' },
  { key: 'calendar' as const, label: 'My Calendar', iconFill: 'mdi:calendar', iconOut: 'mdi:calendar-outline', route: '/my-calendar' },
  { key: 'finance' as const, label: 'Finance', iconFill: 'majesticons:creditcard', iconOut: 'majesticons:creditcard-line', route: '/finance' },
  { key: 'settings' as const, label: 'Settings', iconFill: 'tabler:settings', iconOut: 'tabler:settings', route: '/settings' },
];

const isSmallScreen = () => typeof window !== 'undefined' && window.innerWidth < 768;

const SideBar = ({
  activeItem,
  onToggleDarkMode,
  onProfileClick,
  className = '',
}: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(() => isSmallScreen());
  const [isMobile, setIsMobile] = useState(() => isSmallScreen());
  const [internalHover, setInternalHover] = useState<SideBarItemKey>();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggle } = useTheme();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const username = user ? `${user.firstName} ${user.lastName}` : null;

  const resolvedActive: SideBarItemKey | undefined =
    activeItem ?? navItems.find((item) => location.pathname.startsWith(item.route))?.key;

  // Track screen-size changes
  useEffect(() => {
    const handleResize = () => {
      const small = isSmallScreen();
      setIsMobile(small);
      if (small) setCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close profile menu when sidebar collapses
  useEffect(() => {
    if (collapsed) setProfileMenuOpen(false);
  }, [collapsed]);

  // Close profile menu on outside click / escape
  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current?.contains(e.target as Node)) return;
      setProfileMenuOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setProfileMenuOpen(false); };
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, [profileMenuOpen]);

  const handleBackdropClick = () => {
    if (isMobile && !collapsed) setCollapsed(true);
  };

  const handleNavClick = () => {
    if (isMobile) setCollapsed(true);
  };

  onProfileClick = () => setProfileMenuOpen((p) => !p);

  const positionClass = isMobile
    ? 'fixed top-0 left-0 z-40 h-screen'
    : 'relative h-full min-h-screen';

  const w = collapsed ? 'w-[68px]' : 'w-[200px]';

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
          onClick={handleBackdropClick}
        />
      )}

      {/* Mobile spacer*/}
      <div className={['block md:hidden shrink-0', w].join(' ')} aria-hidden="true" />

      <div
        className={[
          'flex shrink-0 flex-col items-center border border-solid border-[#f0f0f0] dark:border-gray-700 py-8 gap-8 transition-[width] duration-200 dark:text-white',
          isMobile && !collapsed ? 'bg-white dark:bg-gray-900' : 'bg-transparent',
          positionClass,
          w,
          className,
        ].join(' ')}
      >
        {/* Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-[#f0f0f0] bg-white shadow-sm text-[#666] hover:text-teal-600 transition-colors"
        >
          <Icon
            icon={collapsed ? 'material-symbols:chevron-right-rounded' : 'material-symbols:chevron-left-rounded'}
            className="h-4 w-4"
          />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center px-4 w-full">
          {collapsed ? (
            <img src={AtlasLogoMin} className="w-7 h-7" aria-label="Atlas" />
          ) : (
            <AtlasLogoText className="fill-[#2d3748] dark:fill-white w-32 h-auto" />
          )}
        </div>

        {/* Search */}
        <div className="w-full px-4">
          {collapsed ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-gray-200 transition-colors"
              >
                <Icon icon="ic:outline-search" className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="relative w-full h-10 rounded-full bg-[#f5f5f5] flex items-center px-3 group focus-within:ring-1 focus-within:ring-teal-500/30 transition-all">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                maxLength={50}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && console.log('Searching for:', searchQuery)}
                className="flex-1 bg-transparent border-none outline-none text-[12px] font-semibold text-[#2d3748] placeholder:text-[#9ca3af] w-full pr-1"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-1 text-[#9ca3af] hover:text-[#2d3748] transition-colors"
                >
                  <Icon icon="material-symbols:close-rounded" className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                className="shrink-0 hover:scale-110 transition-transform"
                onClick={() => console.log('Searching for:', searchQuery)}
              >
                <Icon icon="ic:outline-search" className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex w-full flex-col gap-3">
          {navItems.map((item) => {
            const state: SideBarButtonState =
              item.key === resolvedActive ? 'clicked'
              : item.key === internalHover ? 'hovered'
              : 'default';

            return (
              <Link
                to={item.route}
                key={item.key}
                className="w-full relative"
                onClick={handleNavClick}
                onMouseEnter={() => setInternalHover(item.key)}
                onMouseLeave={() => setInternalHover((p) => (p === item.key ? undefined : p))}
              >
                {/* Left active bar */}
                <span
                  aria-hidden="true"
                  className={[
                    'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-[3px] bg-teal-600 transition-all duration-200',
                    state === 'clicked' ? 'h-[24px] opacity-100' : 'h-0 opacity-0',
                  ].join(' ')}
                />
                {collapsed ? (
                  <div
                    title={item.label}
                    className={[
                      'flex justify-center items-center h-11 transition-colors hover:bg-[#F0FAF6]',
                      state === 'clicked' ? 'text-teal-600' : 'text-[#2d3748] dark:text-white',
                    ].join(' ')}
                  >
                    <Icon icon={state === 'clicked' ? item.iconFill : item.iconOut} className="w-7 h-7" />
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
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={[
              'flex w-full cursor-pointer items-center hover:bg-[#F0FAF6] transition-colors',
              collapsed ? 'justify-center h-11' : 'gap-6 pr-5',
            ].join(' ')}
          >
            {!collapsed && <span className="h-11 w-2 shrink-0 rounded-sm bg-transparent" />}
            <span className="flex items-center gap-4 rounded-xl px-1">
              <Icon
                icon={isDark ? 'ph:sun-bold' : 'ph:moon-bold'}
                className="h-6 w-6 shrink-0 text-black dark:text-white"
              />
              {!collapsed && (
                <span className="font-semibold text-[14px] text-[#2d3748] dark:text-white">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              )}
            </span>
          </button>

          {/* Divider */}
          <div className="px-5 w-full">
            <div className="h-[1px] w-full bg-[#f5f5f5]" />
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative flex flex-row">
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
                <img src={user.profilePicture} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
              ) : (
                <Icon icon="bi:person-circle" className="w-7 h-7 shrink-0 text-[#2d3748] dark:text-white" />
              )}
              {!collapsed && (
                <div className="flex flex-col items-start gap-1 overflow-hidden">
                  <b className="text-[14px] text-[#2d3748] dark:text-white">{username ?? 'Sign In'}</b>
                  {!user && <span className="text-[10px] text-[#9ca3af] font-bold">to continue</span>}
                </div>
              )}
            </button>
            <div className="absolute right-0 -top-full">
              {profileMenuOpen && (
                <UserMenuPopup
                  isOpen={profileMenuOpen}
                  onViewProfile={() => { navigate('/profile-switcher'); }}
                  onLogOut={() => {}}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;