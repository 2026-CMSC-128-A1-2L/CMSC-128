import { useCallback, useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AtlasLogoText from '../../../assets/logo_atlas_text.svg?react';
import AtlasLogoMin from '../../../assets/footer_logo.svg?react';
import SideBarButton, { type SideBarButtonState } from './SideBarButton';
import { useAuthStore } from '../../store/useAuthStore';
import UserMenuPopup from './UserMenuPopup';
import SignInPopUp from '../general/SignInPopUp';
import { useTheme } from '../../pages/utilities/DarkMode';
import { useUnreadCommunicationCount } from '../../hooks/useUnreadCommunicationCount';

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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [signInPopupOpen, setSignInPopupOpen] = useState(false);
  const [darkModeIconSpinning, setDarkModeIconSpinning] = useState(false);
  const [profileMenuPosition, setProfileMenuPosition] = useState({
    left: 0,
    bottom: 0,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { isDark, toggle } = useTheme();
  const { user, logout } = useAuthStore();
  const unreadCommunicationCount = useUnreadCommunicationCount();

  const username = user ? `${user.firstName} ${user.lastName}` : null;

  const resolvedActive: SideBarItemKey | undefined =
    activeItem ?? navItems.find((item) => location.pathname.startsWith(item.route))?.key;

  const updateProfileMenuPosition = useCallback(() => {
    const profileButton = profileButtonRef.current;
    if (!profileButton) return;

    const rect = profileButton.getBoundingClientRect();

    setProfileMenuPosition({
      left: rect.right + 8,
      bottom: window.innerHeight - rect.bottom,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const small = isSmallScreen();
      setIsMobile(small);
      if (small) setCollapsed(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (collapsed) {
      setProfileMenuOpen(false);
    }
  }, [collapsed]);

  useEffect(() => {
    if (!profileMenuOpen) return;

    updateProfileMenuPosition();

    const handleWindowChange = () => updateProfileMenuPosition();

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (profileButtonRef.current?.contains(target) || profileMenuRef.current?.contains(target)) {
        return;
      }

      setProfileMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleWindowChange);
    window.addEventListener('scroll', handleWindowChange, true);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleWindowChange);
      window.removeEventListener('scroll', handleWindowChange, true);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileMenuOpen, updateProfileMenuPosition]);

  const handleProfileClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onProfileClick?.(event);

    if (!user) {
      setProfileMenuOpen(false);
      setSignInPopupOpen(true);
      return;
    }

    setSignInPopupOpen(false);
    updateProfileMenuPosition();
    setProfileMenuOpen((open) => !open);
  };

  const handleLogout = async () => {
    await logout();
    setProfileMenuOpen(false);
    navigate('/', { replace: true });
  };

  const handleDarkModeClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setDarkModeIconSpinning(true);

    if (onToggleDarkMode) {
      onToggleDarkMode(event);
      return;
    }

    toggle();
  };

  const handleBackdropClick = () => {
    if (isMobile && !collapsed) {
      setCollapsed(true);
    }
  };

  const handleNavClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const positionClass = isMobile
    ? 'fixed top-0 left-0 z-40 h-screen'
    : 'relative h-full min-h-screen';

  const widthClass = collapsed ? 'w-[68px]' : 'w-[200px]';

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
          onClick={handleBackdropClick}
        />
      )}

      <div className={['block md:hidden shrink-0', widthClass].join(' ')} aria-hidden="true" />

      <div
        className={[
          'flex shrink-0 flex-col items-center overflow-visible border-r border-solid border-[#f0f0f0] py-8 gap-8 transition-[width] duration-200 text-[#2d3748] dark:border-[#303331] dark:text-[#d7e0ef]',
          isMobile && !collapsed ? 'bg-white dark:bg-[#101111]' : 'bg-transparent',
          positionClass,
          widthClass,
          className,
        ].join(' ')}
      >
        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-[#f0f0f0] bg-white shadow-sm text-[#666] hover:text-teal-600 transition-colors dark:border-[#303331] dark:bg-[#1f2022] dark:text-[#d7e0ef] dark:hover:text-[#72cbb8] cursor-pointer"
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

        <div className="flex items-center justify-center px-4 w-full">
          <Link
            to="/"
            className="flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
            aria-label="Atlas landing page"
          >
            {collapsed ? (
              <AtlasLogoMin
                className="w-7 h-7 fill-[#2d3748] dark:fill-[#d7e0ef]"
                aria-label="Atlas"
              />
            ) : (
              <AtlasLogoText className="w-32 h-auto fill-[#2d3748] dark:fill-[#d7e0ef]" />
            )}
          </Link>
        </div>

        {/* Search section is currently disabled */}
        {/* <div className="w-full px-4">
          {collapsed ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-gray-200 transition-colors dark:bg-[#242526] dark:text-[#aeb6c6] dark:hover:bg-[#2d302f] cursor-pointer"
              >
                <Icon icon="ic:outline-search" className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="relative w-full h-10 rounded-full bg-[#f5f5f5] flex items-center px-3 group focus-within:ring-1 focus-within:ring-teal-500/30 transition-all dark:bg-[#242526] dark:text-[#d7e0ef] dark:focus-within:ring-[#72cbb8]/30">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                maxLength={50}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" &&
                  console.log("Searching for:", searchQuery)
                }
                className="flex-1 bg-transparent border-none outline-none text-[12px] font-semibold text-[#2d3748] placeholder:text-[#9ca3af] w-full pr-1 dark:text-[#d7e0ef] dark:placeholder:text-[#a4acba]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mr-1 text-[#9ca3af] hover:text-[#2d3748] transition-colors dark:hover:text-white cursor-pointer"
                >
                  <Icon
                    icon="material-symbols:close-rounded"
                    className="w-4 h-4"
                  />
                </button>
              )}
              <button
                type="button"
                className="shrink-0 hover:scale-110 transition-transform cursor-pointer"
                onClick={() => console.log("Searching for:", searchQuery)}
              >
                <Icon icon="ic:outline-search" className="w-5 h-5" />
              </button>
            </div>
          )}
        </div> */}

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
                className="w-full relative"
                onClick={handleNavClick}
                onMouseEnter={() => setInternalHover(item.key)}
                onMouseLeave={() =>
                  setInternalHover((previous) => (previous === item.key ? undefined : previous))
                }
              >
                <span
                  aria-hidden="true"
                  className={[
                    'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-[3px] bg-teal-600 transition-all duration-200 dark:bg-[#72cbb8]',
                    state === 'clicked' ? 'h-[24px] opacity-100' : 'h-0 opacity-0',
                  ].join(' ')}
                />

                {collapsed ? (
                  <div
                    title={item.label}
                    className={[
                      'flex justify-center items-center h-11 transition-colors hover:bg-[#F0FAF6] dark:hover:bg-[#17201d]',
                      state === 'clicked'
                        ? 'text-teal-600 dark:text-[#72cbb8]'
                        : 'text-[#2d3748] dark:text-[#d7e0ef]',
                    ].join(' ')}
                  >
                    <Icon
                      icon={state === 'clicked' ? item.iconFill : item.iconOut}
                      className="w-7 h-7"
                    />
                    {item.key === 'messages' && unreadCommunicationCount > 0 && (
                      <span className="absolute right-4 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d94141] px-1.5 text-[10px] font-bold leading-none text-white shadow-sm">
                        {unreadCommunicationCount > 99 ? '99+' : unreadCommunicationCount}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <SideBarButton
                      icon={state === 'clicked' ? item.iconFill : item.iconOut}
                      label={item.label}
                      state={state}
                    />
                    {item.key === 'messages' && unreadCommunicationCount > 0 && (
                      <span className="absolute right-5 top-1/2 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#d94141] px-1.5 text-[10px] font-bold leading-none text-white shadow-sm">
                        {unreadCommunicationCount > 99 ? '99+' : unreadCommunicationCount}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 w-full flex-col justify-end gap-3">
          <button
            type="button"
            onClick={handleDarkModeClick}
            aria-label="Toggle dark mode"
            className={[
              'flex w-full cursor-pointer items-center hover:bg-[#F0FAF6] transition-colors dark:hover:bg-[#17201d]',
              collapsed ? 'justify-center h-11' : 'gap-6 pr-5',
            ].join(' ')}
          >
            {!collapsed && (
              <span className="h-11 w-2 shrink-0 rounded-sm bg-transparent cursor-pointer" />
            )}

            <span className="flex items-center gap-4 rounded-xl px-1">
              <Icon
                icon="gg:dark-mode"
                onAnimationEnd={() => setDarkModeIconSpinning(false)}
                className={[
                  'h-6 w-6 shrink-0 text-[#001d18] dark:text-white',
                  darkModeIconSpinning ? 'dark-mode-icon-turn' : '',
                ].join(' ')}
              />

              {!collapsed && (
                <span className="font-semibold text-[14px] text-[#2d3748] dark:text-[#d7e0ef]">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              )}
            </span>
          </button>

          <div className="px-5 w-full">
            <div className="h-[1px] w-full bg-[#f5f5f5] dark:bg-[#303331]" />
          </div>

          <div className="relative flex flex-row">
            <button
              ref={profileButtonRef}
              type="button"
              onClick={handleProfileClick}
              aria-label={username ?? 'Sign In'}
              className={[
                'flex w-full cursor-pointer items-center overflow-hidden hover:bg-[#F0FAF6] transition-colors dark:hover:bg-[#17201d]',
                collapsed ? 'justify-center py-2' : 'gap-2 pl-8 pr-5 py-2.5',
              ].join(' ')}
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover shrink-0 cursor-pointer"
                />
              ) : (
                <Icon
                  icon="bi:person-circle"
                  className="w-7 h-7 shrink-0 text-[#2d3748] dark:text-[#d7e0ef]"
                />
              )}

              {!collapsed && (
                <div className="flex flex-col items-start gap-1 overflow-hidden">
                  <b
                    title={username ?? undefined}
                    className="text-[14px] text-[#2d3748] dark:text-[#d7e0ef] truncate max-w-[110px] block"
                  >
                    {username ?? 'Sign In'}
                  </b>

                  {user ? (
                    <span className="flex items-center gap-[4px]">
                      {user.status === 'verified' ? (
                        <>
                          <span className="bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text font-inter text-[10px] font-bold leading-normal whitespace-nowrap text-transparent">
                            Verified
                          </span>
                          <Icon
                            icon="material-symbols:verified"
                            className="h-[10px] w-[10px] text-[#0c8873] dark:text-[#72cbb8]"
                          />
                        </>
                      ) : (
                        <>
                          <span className="bg-gradient-to-b from-[#e0a825] to-[#c48a1a] bg-clip-text font-inter text-[10px] font-bold leading-normal whitespace-nowrap text-transparent">
                            Unverified
                          </span>
                          <Icon
                            icon="material-symbols:warning-rounded"
                            className="h-[10px] w-[10px] text-[#c48a1a] dark:text-[#e0a825]"
                          />
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#9ca3af] font-bold dark:text-[#a4acba]">
                      to continue
                    </span>
                  )}
                </div>
              )}
            </button>

            {profileMenuOpen &&
              user &&
              createPortal(
                <div
                  ref={profileMenuRef}
                  className="fixed z-[2147483647]"
                  style={{
                    left: profileMenuPosition.left,
                    bottom: profileMenuPosition.bottom,
                  }}
                >
                  <UserMenuPopup
                    isOpen={profileMenuOpen}
                    onViewProfile={() => {
                      setProfileMenuOpen(false);
                      navigate('/profile-switcher');
                    }}
                    onLogOut={handleLogout}
                  />
                </div>,
                document.body,
              )}
          </div>
        </div>
      </div>

      {signInPopupOpen &&
        createPortal(
          <SignInPopUp isOpen={signInPopupOpen} onClose={() => setSignInPopupOpen(false)} />,
          document.body,
        )}
    </>
  );
};

export default SideBar;
