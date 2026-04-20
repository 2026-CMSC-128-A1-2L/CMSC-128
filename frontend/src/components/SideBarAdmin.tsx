import { useEffect, useState, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SideBarAdminButton from './SideBarAdminButton';
import SideBarAdminMessagesView, {
  type MessageItem,
} from './SideBarAdminMessagesView';

export type SideBarAdminMode = 'expanded' | 'minimized';
export type SideBarAdminView = 'nav' | 'messages_tab';
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

const SideBarAdmin = ({
  mode,
  activeItem = 'analytics',
  hoveredItem,
  onItemClick,
  onSignOut,
  className = '',
  initialView = 'nav',
  messages = defaultMessages,
  activeMessageId,
  onSelectMessage,
  onBackFromMessages,
  onViewArchivedMessages,
}: SideBarAdminProps) => {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState<SideBarAdminMode>(mode ?? 'expanded');
  const [view, setView] = useState<SideBarAdminView>(initialView);

  useEffect(() => {
    if (mode) {
      setCurrentMode(mode);
    }
  }, [mode]);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const collapsed = currentMode === 'minimized';
  const isMessagesTab = view === 'messages_tab';

  const toggleSidebarMode = () => {
    setCurrentMode((prev) => (prev === 'expanded' ? 'minimized' : 'expanded'));
  };

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

  return (
    <aside
      className={[
        'relative h-auto min-h-full shrink-0 overflow-hidden',
        'transition-[width] duration-300 ease-in-out',
        // In messages tab view we always keep the full width so the tab panel fits.
        isMessagesTab ? 'w-[336px]' : collapsed ? 'w-[108px]' : 'w-[336px]',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'relative z-10 flex min-h-full w-full flex-col rounded-r-[20px] bg-[#ebebeb]',
          'shadow-[0_4px_100px_rgba(0,0,0,0.25)]',
          'transition-[padding] duration-300 ease-in-out',
          isMessagesTab
            ? 'px-0 pb-0 pt-0'
            : collapsed
              ? 'px-[12px] pb-[36px] pt-[24px]'
              : 'px-[17px] pb-[35px] pt-[24px]',
        ].join(' ')}
      >
        {/* Layered content: nav view + messages tab view cross-fade/slide */}
        <div className="relative flex min-h-[1024px] flex-1">
          {/* NAV VIEW */}
          <div
            aria-hidden={isMessagesTab}
            className={[
              'absolute inset-0 flex flex-col',
              'transition-[transform,opacity] duration-300 ease-out',
              isMessagesTab
                ? 'pointer-events-none -translate-x-6 opacity-0'
                : 'translate-x-0 opacity-100',
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
                      <Icon
                        icon={item.iconName}
                        className="h-[34px] w-[34px]"
                        aria-hidden="true"
                      />
                    }
                    label={item.label}
                    collapsed={collapsed}
                    state={state}
                    onClick={() => handleNavItemClick(item)}
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
                'flex h-[68px] cursor-pointer items-center rounded-[10px] border-[5px] border-transparent text-black transition-all duration-300 ease-in-out',
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

          {/* MESSAGES TAB VIEW */}
          <div
            aria-hidden={!isMessagesTab}
            className={[
              'absolute inset-0 flex flex-col',
              'transition-[transform,opacity] duration-300 ease-out',
              isMessagesTab
                ? 'translate-x-0 opacity-100'
                : 'pointer-events-none translate-x-6 opacity-0',
            ].join(' ')}
          >
            <SideBarAdminMessagesView
              messages={messages}
              activeMessageId={activeMessageId}
              onSelectMessage={handleSelectMessage}
              onBack={handleBackFromMessages}
              onViewArchived={onViewArchivedMessages}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBarAdmin;
