import { useState, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AtlasLogo from '../../../assets/logo_atlas_text.svg?react';
import SideBarLandlordButton from './SideBarLandlordButton';

export type SideBarLandlordItemKey =
  | 'dashboard'
  | 'messages'
  | 'properties'
  | 'managers'
  | 'tenants'
  | 'visits'
  | 'finance'
  | 'settings';

type UserInfo = {
  name: string;
  verified?: boolean;
  avatarUrl?: string;
};

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

const navItems: Array<{
  key: SideBarLandlordItemKey;
  label: string;
  icon: string;
  route: string;
}> = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'solar:home-2-outline',
    route: '/landlord/dashboard',
  },
  { key: 'messages', label: 'Messages', icon: 'ic:outline-mail', route: '/landlord/messages' },
  {
    key: 'properties',
    label: 'Properties',
    icon: 'fluent:pen-16-regular',
    route: '/landlord/properties',
  },
  { key: 'managers', label: 'Managers', icon: 'hugeicons:id', route: '/landlord/managers' },
  { key: 'tenants', label: 'My Tenants', icon: 'tabler:user-search', route: '/landlord/tenants' },
  { key: 'visits', label: 'Visits', icon: 'solar:calendar-outline', route: '/landlord/visits' },
  { key: 'finance', label: 'Finance', icon: 'solar:card-outline', route: '/landlord/finance' },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'solar:settings-outline',
    route: '/landlord/settings',
  },
];

const defaultUser: UserInfo = {
  name: 'Quevin',
  verified: true,
};

const SideBarLandlord = ({
  activeItem,
  hoveredItem,
  onItemClick,
  onAddListing,
  onToggleDarkMode,
  onProfileClick,
  user = defaultUser,
  className = '',
}: SideBarLandlordProps) => {
  const navigate = useNavigate();
  const [internalHover, setInternalHover] = useState<SideBarLandlordItemKey | undefined>();

  const handleItemClick = (item: (typeof navItems)[number]) => {
    if (onItemClick) {
      onItemClick(item.key);
      return;
    }
    navigate(item.route);
  };

  return (
    <aside
      className={[
        'flex w-[200px] shrink-0 flex-col items-center gap-[32px] border border-solid border-[#f0f0f0] bg-white pt-[24px] pb-[30px]',
        className,
      ].join(' ')}
    >
      <div className="flex h-[60px] w-[128px] items-center justify-center overflow-hidden">
        <AtlasLogo className="h-full w-full" aria-label="Atlas" />
      </div>

      <div className="flex w-full flex-col gap-[32px]">
        <div className="flex flex-col items-start pl-[32px] pr-[20px]">
          <button
            type="button"
            onClick={onAddListing}
            className="flex w-full cursor-pointer items-center overflow-hidden rounded-[100px] bg-[#f0f0f0] pl-[17px] pr-[12px] transition-colors duration-200 ease-in-out hover:bg-[#e6e6e6]"
          >
            <span className="flex flex-1 items-start overflow-hidden py-[10px]">
              <span className="font-['Inter',sans-serif] text-[10px] font-semibold leading-[normal] whitespace-nowrap text-[#666]">
                Add New Listing
              </span>
            </span>
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[100px] bg-[#096c5b] text-white transition-colors duration-200 ease-in-out">
              <Icon
                icon="material-symbols:add-rounded"
                className="h-[24px] w-[24px]"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>

        <nav className="flex flex-col gap-[12px]">
          {navItems.map((item) => {
            const externalHover = hoveredItem ?? internalHover;
            const state =
              item.key === activeItem
                ? 'clicked'
                : item.key === externalHover
                  ? 'hovered'
                  : 'default';

            return (
              <div
                key={item.key}
                onMouseEnter={() => setInternalHover(item.key)}
                onMouseLeave={() =>
                  setInternalHover((prev) => (prev === item.key ? undefined : prev))
                }
              >
                <SideBarLandlordButton
                  icon={item.icon}
                  label={item.label}
                  state={state}
                  onClick={() => handleItemClick(item)}
                />
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-1 w-full flex-col justify-end gap-[12px]">
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className="flex w-[180px] cursor-pointer items-center gap-[24px] pr-[20px]"
        >
          <span aria-hidden="true" className="h-[44px] w-[8px] shrink-0 rounded-[4px] bg-white" />
          <span className="flex h-[44px] flex-1 items-center gap-[16px] rounded-[12px] px-[4px] transition-colors duration-200 ease-in-out hover:bg-[#F0FAF6]">
            <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center text-[#001d18]">
              <Icon icon="gg:dark-mode" className="h-[24px] w-[24px]" aria-hidden="true" />
            </span>
            <span className="font-['Inter',sans-serif] text-[14px] font-semibold leading-[normal] text-[#001d18]">
              Dark Mode
            </span>
          </span>
        </button>

        <div className="flex w-full flex-col items-start px-[20px]">
          <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
        </div>

        <button
          type="button"
          onClick={onProfileClick}
          aria-label={`${user.name} profile`}
          className="flex w-[200px] cursor-pointer items-center gap-[8px] overflow-hidden pl-[32px] pr-[20px] py-[10px] transition-colors duration-200 ease-in-out hover:bg-[#F0FAF6]"
        >
          <span className="flex h-[48px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <Icon icon="solar:user-bold" className="h-[28px] w-[28px]" aria-hidden="true" />
            )}
          </span>
          <span className="flex flex-col items-start justify-center gap-[4px] overflow-hidden">
            <span className="font-['Inter',sans-serif] text-[14px] font-bold leading-[normal] text-[#096c5b] whitespace-nowrap">
              {user.name}
            </span>
            {user.verified && (
              <span className="flex items-center gap-[4px]">
                <span className="bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text font-['Inter',sans-serif] text-[10px] font-bold leading-[normal] text-transparent whitespace-nowrap">
                  Verified
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-[13.6px] w-[12px] items-center justify-center text-[#0c8873]"
                >
                  <Icon icon="material-symbols:verified" className="h-[9.6px] w-[9.6px]" />
                </span>
              </span>
            )}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default SideBarLandlord;
