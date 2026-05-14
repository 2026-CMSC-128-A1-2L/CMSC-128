import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import type { PaymentStatus, Tenant } from '../../../data/landlordTenants';
import TenantAvatar from './TenantAvatar';

type StatusDescriptor = {
  label: string;
  textClass: string;
  icon: string;
  iconClass: string;
};

const STATUS_MAP: Record<PaymentStatus, StatusDescriptor> = {
  paid: {
    label: 'Paid',
    textClass: 'text-[#096c5b]',
    icon: 'mdi:check-circle-outline',
    iconClass: 'text-[#096c5b]',
  },
  pending: {
    label: 'Pending',
    textClass: 'bg-linear-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent',
    icon: 'material-symbols:pending-outline',
    iconClass: 'text-[#c29722]',
  },
  overdue: {
    label: 'Overdue',
    textClass: 'bg-linear-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent',
    icon: 'material-symbols:cancel-outline',
    iconClass: 'text-[#c00f0f]',
  },
};

type TenantCardProps = {
  tenant: Tenant;
  to: string;
  /** Whether the kebab actions menu is open (for `aria-expanded`). */
  menuOpen?: boolean;
  onKebabClick?: (tenant: Tenant) => void;
  /** Popover anchored next to the kebab (e.g. Message / Report / Remove). */
  actionMenu?: ReactNode;
};

const TenantCard = ({
  tenant,
  to,
  menuOpen = false,
  onKebabClick,
  actionMenu,
}: TenantCardProps) => {
  const status = STATUS_MAP[tenant.billingStatus];

  const handleMore = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onKebabClick?.(tenant);
  };

  return (
    <div className="group flex w-full flex-col gap-[10px] rounded-[16px] border border-solid border-[#f0f0f0] bg-white p-[12px] shadow-none transition-shadow duration-200 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] focus-within:ring-2 focus-within:ring-[#096c5b]/40">
      <div className="flex w-full items-center gap-[10px] px-[16px] py-[10px]">
        <Link
          to={to}
          className="flex min-w-0 flex-1 items-center gap-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[#096c5b]/40 focus-visible:ring-offset-2"
          aria-label={`View tenant ${tenant.displayName}`}
        >
          <TenantAvatar photoUrl={tenant.photoUrl} name={tenant.displayName} size={72} />

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-[8px] px-[4px] py-[8px]">
            <p className="truncate font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-black">
              {tenant.displayName}
            </p>
            <div className="flex flex-col gap-[4px] font-['Inter',sans-serif] text-[14px] font-medium text-[#666]">
              <span className="truncate">{tenant.unit}</span>
              <span className="truncate">{tenant.contactNumber}</span>
            </div>
          </div>
        </Link>

        <div className="relative shrink-0 self-start pt-[6px]">
          <button
            type="button"
            onClick={handleMore}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label={`More options for ${tenant.displayName}`}
            className="flex h-[32px] w-[28px] cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
          >
            <Icon
              icon="iconamoon:menu-kebab-vertical"
              className="h-[28px] w-[28px]"
              aria-hidden="true"
            />
          </button>
          {actionMenu}
        </div>
      </div>

      <Link
        to={to}
        className="flex w-full items-center gap-[4px] p-[16px] outline-none focus-visible:ring-2 focus-visible:ring-[#096c5b]/40 focus-visible:ring-offset-2"
        aria-label={`View billing for ${tenant.displayName}`}
      >
        <div className="flex flex-1 flex-col gap-[4px]">
          <span
            className={[
              "font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px]",
              status.textClass,
            ].join(' ')}
          >
            {status.label}
          </span>
          <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#666]">
            {tenant.latestBillingItem}
          </span>
        </div>
        <span
          aria-hidden="true"
          className={[
            'flex h-[32px] w-[32px] shrink-0 items-center justify-center',
            status.iconClass,
          ].join(' ')}
        >
          <Icon icon={status.icon} className="h-[32px] w-[32px]" />
        </span>
      </Link>
    </div>
  );
};

export default TenantCard;
