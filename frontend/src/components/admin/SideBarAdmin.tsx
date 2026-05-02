import { useCallback, useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AtlasLogo from '../../../assets/logo_atlas_text.svg?react';
import SideBarAdminButton from './SideBarAdminButton';
import SideBarAdminMessagesView, { type MessageItem } from './SideBarAdminMessagesView';

export type SideBarAdminView = 'nav' | 'messages_tab';
export type SideBarAdminItemKey =
  | 'applications'
  | 'reports'
  | 'listings'
  | 'analytics'
  | 'messages'
  | 'announce';

type AdminInfo = {
  name: string;
  role?: string;
  avatarUrl?: string;
};

type SideBarAdminProps = {
  activeItem?: SideBarAdminItemKey;
  hoveredItem?: SideBarAdminItemKey;
  onItemClick?: (item: SideBarAdminItemKey) => void;
  onSignOut?: MouseEventHandler<HTMLButtonElement>;
  onProfileClick?: MouseEventHandler<HTMLButtonElement>;
  admin?: AdminInfo;
  className?: string;
  /** Initial view of the sidebar: the nav list or the messages tab panel. */
  initialView?: SideBarAdminView;
  /** Messages to show inside the messages tab panel. */
  messages?: MessageItem[];
  /** Currently selected conversation id (controls the `clicked` card state). */
  activeMessageId?: string;
  /** Called when a message card is clicked. Defaults to navigating to /admin/messages?id=<id>. */
  onSelectMessage?: (id: string) => void;
  /** Called when the user hits Back from the messages tab view. */
  onBackFromMessages?: () => void;
  /** Called when the user taps "View Archived Messages" at the bottom of the messages tab. */
  onViewArchivedMessages?: () => void;
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

// Default mock data so the Messages Tab has something to show out-of-the-box.
const defaultMessages: MessageItem[] = [
  {
    id: 'msg-1',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: true,
  },
  {
    id: 'msg-2',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: true,
  },
  {
    id: 'msg-3',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: true,
  },
  {
    id: 'msg-4',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: false,
  },
  {
    id: 'msg-5',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: false,
  },
];

const defaultAdmin: AdminInfo = {
  name: 'Kopiko',
  role: 'Admin',
};

const SideBarAdmin = ({
  activeItem = 'analytics',
  hoveredItem,
  onItemClick,
  onSignOut,
  onProfileClick,
  admin = defaultAdmin,
  className = '',
  initialView = 'nav',
  messages = defaultMessages,
  activeMessageId,
  onSelectMessage,
  onBackFromMessages,
  onViewArchivedMessages,
}: SideBarAdminProps) => {
  const navigate = useNavigate();
  const [view, setView] = useState<SideBarAdminView>(initialView);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileMenuPlacement, setProfileMenuPlacement] = useState<'top' | 'bottom'>('top');
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const isMessagesTab = view === 'messages_tab';

  const handleNavItemClick = (item: (typeof navItems)[number]) => {
    onItemClick?.(item.key);
    if (item.key === 'messages') {
      // Swap in place. Route stays the same so the user keeps their context.
      setView('messages_tab');
      return;
    }
    navigate(item.route);
  };

  const handleBackFromMessages = () => {
    setView('nav');
    onBackFromMessages?.();
  };

  const handleSelectMessage = (id: string) => {
    if (onSelectMessage) {
      onSelectMessage(id);
      return;
    }
    // Default: go to the full messages page with the selected conversation.
    navigate(`/admin/messages?id=${encodeURIComponent(id)}`);
  };

  const resolveProfileMenuPlacement = useCallback(() => {
    if (!profileMenuRef.current) {
      return;
    }

    const menuHeight = 76;
    const menuGap = 8;
    const viewportPadding = 8;
    const profileRect = profileMenuRef.current.getBoundingClientRect();

    const canOpenBelow =
      profileRect.bottom + menuGap + menuHeight <= window.innerHeight - viewportPadding;
    setProfileMenuPlacement(canOpenBelow ? 'bottom' : 'top');
  }, []);

  const handleProfileButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!isProfileMenuOpen) {
      resolveProfileMenuPlacement();
    }
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleViewProfileClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsProfileMenuOpen(false);
    onProfileClick?.(event);
  };

  const handleSignOutClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsProfileMenuOpen(false);
    onSignOut?.(event);
  };

  useEffect(() => {
    if (!isProfileMenuOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (profileMenuRef.current?.contains(event.target as Node)) {
        return;
      }
      setIsProfileMenuOpen(false);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    const handleResize = () => {
      resolveProfileMenuPlacement();
    };

    window.addEventListener('mousedown', handleDocumentClick);
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousedown', handleDocumentClick);
      window.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [isProfileMenuOpen, resolveProfileMenuPlacement]);

  return (
    <aside
      className={[
        'flex shrink-0 overflow-hidden border border-solid border-[#f0f0f0] bg-white',
        'transition-[width] duration-300 ease-in-out',
        isMessagesTab ? 'w-[336px]' : 'w-[200px]',
        className,
      ].join(' ')}
    >
      {isMessagesTab ? (
        <SideBarAdminMessagesView
          messages={messages}
          activeMessageId={activeMessageId}
          onSelectMessage={handleSelectMessage}
          onBack={handleBackFromMessages}
          onViewArchived={onViewArchivedMessages}
        />
      ) : (
        <div className="flex min-h-screen w-full flex-col items-center gap-[32px] pt-[24px] pb-[30px]">
          <div className="flex h-[60px] w-[128px] items-center justify-center overflow-hidden">
            <AtlasLogo className="h-full w-full" aria-label="Atlas" />
          </div>

          <nav className="flex w-full flex-col gap-[12px]">
            {navItems.map((item) => {
              const state =
                item.key === activeItem
                  ? 'clicked'
                  : item.key === hoveredItem
                    ? 'hovered'
                    : 'default';

              return (
                <div key={item.key} className="duration-200 hover:bg-[#F0FAF6]">
                  <SideBarAdminButton
                    icon={item.iconName}
                    label={item.label}
                    state={state}
                    onClick={() => handleNavItemClick(item)}
                  />
                </div>
              );
            })}
          </nav>

          <div className="flex flex-1 w-full flex-col justify-end gap-[12px]">
            <div className="flex w-full flex-col items-start px-[20px]">
              <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
            </div>

            <div ref={profileMenuRef} className="relative w-full">
              {isProfileMenuOpen && (
                <div
                  className={[
                    'absolute left-[20px] z-30 flex h-[68px] w-[171px] flex-col gap-[7px] rounded-[9px] border border-solid border-[#f0f0f0] bg-[#f7f7f7] px-[11px] py-[9px] shadow-[0_4px_18px_rgba(0,0,0,0.1)]',
                    profileMenuPlacement === 'bottom'
                      ? 'top-full mt-[8px]'
                      : 'bottom-full mb-[8px]',
                  ].join(' ')}
                >
                  <button
                    type="button"
                    onClick={handleViewProfileClick}
                    className="h-[21px] w-full cursor-pointer rounded-[9px] bg-[#cbf6ed] text-center font-['Inter',sans-serif] text-[11px] font-medium text-[#096c5b] transition-colors duration-150 hover:brightness-95"
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleSignOutClick}
                    className="h-[21px] w-full cursor-pointer rounded-[9px] border border-solid border-[#f0f0f0] bg-white bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-center font-['Inter',sans-serif] text-[11px] font-medium text-transparent transition-colors duration-150 hover:bg-[#f9f9f9]"
                  >
                    Log Out
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleProfileButtonClick}
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
                aria-label={`${admin.name} profile`}
                className="flex w-[200px] cursor-pointer items-center gap-[8px] overflow-hidden pl-[32px] pr-[20px] py-[10px] transition-colors duration-200 ease-in-out hover:bg-[#F0FAF6]"
              >
                <span className="flex h-[48px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
                  {admin.avatarUrl ? (
                    <img src={admin.avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Icon icon="solar:user-bold" className="h-[28px] w-[28px]" aria-hidden="true" />
                  )}
                </span>
                <span className="flex flex-col items-start justify-center gap-[4px] overflow-hidden">
                  <span className="font-['Inter',sans-serif] text-[14px] font-bold leading-[normal] text-[#096c5b] whitespace-nowrap">
                    {admin.name}
                  </span>
                  {admin.role && (
                    <span className="flex items-center gap-[4px]">
                      <span className="bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text font-['Inter',sans-serif] text-[10px] font-bold leading-[normal] text-transparent whitespace-nowrap">
                        {admin.role}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-[13.6px] w-[12px] items-center justify-center text-[#0c8873]"
                      >
                        <Icon
                          icon="material-symbols:admin-panel-settings"
                          className="h-[10px] w-[10px]"
                        />
                      </span>
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBarAdmin;
