import { useState, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AtlasLogo from '../../../assets/logo_atlas_text.svg?react';
import AtlasLogoMin from '../../../assets/atlas logo (for white bg).png';
import SideBarLandlordButton from './SideBarLandlordButton';

export type SideBarLandlordItemKey =
  | 'dashboard' | 'messages' | 'properties' | 'managers'
  | 'tenants' | 'visits' | 'finance' | 'settings';

type UserInfo = { name: string; verified?: boolean; avatarUrl?: string };

type SideBarLandlordProps = {
  activeItem?: SideBarLandlordItemKey;
  hoveredItem?: SideBarLandlordItemKey;
  onItemClick?: (item: SideBarLandlordItemKey) => void;
  onAddListing?: MouseEventHandler<HTMLButtonElement>;
  onToggleDarkMode?: MouseEventHandler<HTMLButtonElement>;
  onProfileClick?: MouseEventHandler<HTMLButtonElement>;
  user?: UserInfo;
  className?: string;
};

const navItems = [
  { key: 'dashboard' as const, label: 'Dashboard',   icon: 'solar:home-2-outline',       route: '/landlord/dashboard' },
  { key: 'messages'  as const, label: 'Messages',    icon: 'ic:outline-mail',             route: '/landlord/messages' },
  { key: 'properties'as const, label: 'Properties',  icon: 'fluent:pen-16-regular',       route: '/landlord/properties' },
  { key: 'managers'  as const, label: 'Managers',    icon: 'hugeicons:id',                route: '/landlord/managers' },
  { key: 'tenants'   as const, label: 'My Tenants',  icon: 'tabler:user-search',          route: '/landlord/tenants' },
  { key: 'visits'    as const, label: 'Visits',      icon: 'solar:calendar-outline',      route: '/landlord/visits' },
  { key: 'finance'   as const, label: 'Finance',     icon: 'solar:card-outline',          route: '/landlord/finance' },
  { key: 'settings'  as const, label: 'Settings',    icon: 'solar:settings-outline',      route: '/landlord/settings' },
];

const defaultUser: UserInfo = { name: 'Quevin', verified: true };

const SideBarLandlord = ({
  activeItem, hoveredItem, onItemClick, onAddListing,
  onToggleDarkMode, onProfileClick, user = defaultUser, className = '',
}: SideBarLandlordProps) => {
  const navigate = useNavigate();
  const [internalHover, setInternalHover] = useState<SideBarLandlordItemKey>();
  const [collapsed, setCollapsed] = useState(false);

  const handleItemClick = (item: typeof navItems[number]) => {
    onItemClick ? onItemClick(item.key) : navigate(item.route);
  };

  const w = collapsed ? 'w-[68px]' : 'w-[200px]';

  return (
    <aside className={[
      'h-full relative flex shrink-0 flex-col items-center gap-[32px] border border-solid border-[#f0f0f0] pt-[24px] pb-[30px] transition-[width] duration-200 min-h-screen',
      w, className,
    ].join(' ')}>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-[12px] top-[24px] z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white shadow-sm text-[#666] hover:text-[#096c5b] transition-colors"
      >
        <Icon
          icon={collapsed ? 'material-symbols:chevron-right-rounded' : 'material-symbols:chevron-left-rounded'}
          className="h-[16px] w-[16px]"
        />
      </button>

      {/* Logo */}
      <div className="flex h-[40px] items-center justify-center overflow-hidden">
        {collapsed
          ? <img className="h-[28px] w-[28px] text-[#096c5b]" aria-label="Atlas" src={AtlasLogoMin}/>
          : <AtlasLogo className="h-full w-[128px]" aria-label="Atlas" />
        }
      </div>

      <div className="flex w-full flex-col gap-[32px]">
        {/* Add listing button */}
        <div className={collapsed ? 'flex justify-center' : 'pl-[32px] pr-[16px]'}>
          {collapsed ? (
            <button
              type="button"
              onClick={onAddListing}
              aria-label="Add new listing"
              className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#096c5b] text-white hover:bg-[#075a4c] transition-colors"
            >
              <Icon icon="material-symbols:add-rounded" className="h-[20px] w-[20px]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onAddListing}
              className="flex w-full cursor-pointer items-center overflow-hidden rounded-[100px] bg-[#f0f0f0] pl-[17px] pr-[12px] hover:bg-[#e6e6e6] transition-colors"
            >
              <span className="flex flex-1 items-start overflow-hidden py-[10px]">
                <span className="font-['Inter'] text-[10px] font-semibold whitespace-nowrap text-[#666]">
                  Add New Listing
                </span>
              </span>
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#096c5b] text-white">
                <Icon icon="material-symbols:add-rounded" className="h-[24px] w-[24px]" />
              </span>
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-[12px]">
          {navItems.map((item) => {
            const effective = hoveredItem ?? internalHover;
            const state = item.key === activeItem ? 'clicked' : item.key === effective ? 'hovered' : 'default';
            return (
              <div
                key={item.key}
                onMouseEnter={() => setInternalHover(item.key)}
                onMouseLeave={() => setInternalHover(p => p === item.key ? undefined : p)}
                className="hover:bg-[#F0FAF6] transition-colors duration-150"
                title={collapsed ? item.label : undefined}
              >
                {collapsed ? (
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    aria-label={item.label}
                    className={[
                      'flex h-[44px] w-full items-center justify-center',
                      state === 'clicked' ? 'text-[#096c5b]' : 'text-[#666]',
                    ].join(' ')}
                  >
                    <Icon icon={item.icon} className="h-[20px] w-[20px]" />
                  </button>
                ) : (
                  <SideBarLandlordButton
                    icon={item.icon}
                    label={item.label}
                    state={state}
                    onClick={() => handleItemClick(item)}
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="flex flex-1 w-full flex-col justify-end gap-[12px]">
        {/* Dark mode */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className={[
            'flex cursor-pointer items-center transition-colors hover:bg-[#F0FAF6]',
            collapsed ? 'justify-center h-[44px] w-full' : 'gap-[24px] pr-[20px] w-[180px]',
          ].join(' ')}
        >
          {!collapsed && (
            <span className="h-[44px] w-[8px] shrink-0 rounded-[4px] bg-white" />
          )}
          <span className={[
            'flex h-[44px] items-center gap-[16px] rounded-[12px] px-[4px]',
            collapsed ? '' : 'flex-1',
          ].join(' ')}>
            <Icon icon="gg:dark-mode" className="h-[24px] w-[24px] shrink-0 text-[#001d18]" />
            {!collapsed && (
              <span className="font-['Inter'] text-[14px] font-semibold text-[#001d18]">Dark Mode</span>
            )}
          </span>
        </button>

        <div className="flex w-full flex-col items-start px-[20px]">
          <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
        </div>

        {/* Profile */}
        <button
          type="button"
          onClick={onProfileClick}
          aria-label={`${user.name} profile`}
          className={[
            'flex cursor-pointer items-center overflow-hidden transition-colors hover:bg-[#F0FAF6]',
            collapsed ? 'justify-center py-[10px] w-full' : 'gap-[8px] pl-[32px] pr-[20px] py-[10px] w-full',
          ].join(' ')}
        >
          <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
            {user.avatarUrl
              ? <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              : <Icon icon="solar:user-bold" className="h-[22px] w-[22px]" />
            }
          </span>
          {!collapsed && (
            <span className="flex flex-col items-start gap-[2px] overflow-hidden">
              <span className="font-['Inter'] text-[14px] font-bold text-[#096c5b] whitespace-nowrap">{user.name}</span>
              {user.verified && (
                <span className="flex items-center gap-[4px]">
                  <span className="bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text font-['Inter'] text-[10px] font-bold text-transparent whitespace-nowrap">
                    Verified
                  </span>
                  <Icon icon="material-symbols:verified" className="h-[10px] w-[10px] text-[#0c8873]" />
                </span>
              )}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBarLandlord;