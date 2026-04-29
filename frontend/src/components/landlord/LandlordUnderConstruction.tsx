import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout, { type BreadcrumbItem } from './LandlordLayout';
import type { SideBarLandlordItemKey } from './SideBarLandlord';

export type UnderConstructionProps = {
  activeSidebarItem: SideBarLandlordItemKey;
  breadcrumbs?: BreadcrumbItem[];
  icon: string;
  title: string;
  description?: string;
};

const LandlordUnderConstruction = ({
  activeSidebarItem,
  breadcrumbs,
  icon,
  title,
  description = "We're still working on this page. Check back soon.",
}: UnderConstructionProps) => {
  return (
    <LandlordLayout activeSidebarItem={activeSidebarItem} breadcrumbs={breadcrumbs}>
      <div className="flex w-full flex-1 items-center justify-center py-[64px]">
        <div className="flex max-w-[480px] flex-col items-center gap-[20px] text-center">
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#eaf6f2] text-[#096c5b]">
            <Icon icon={icon} className="h-[36px] w-[36px]" aria-hidden="true" />
          </span>
          <h1 className="font-['Lora',serif] text-[28px] font-bold leading-[1.2] text-[#2f3136]">
            {title}
          </h1>
          <p className="font-['Inter',sans-serif] text-[15px] leading-normal text-[#6b7280]">
            {description}
          </p>
          <Link
            to="/landlord/profile"
            className="mt-[4px] inline-flex items-center gap-[6px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] hover:underline"
          >
            <Icon icon="solar:arrow-left-linear" className="h-[16px] w-[16px]" aria-hidden="true" />
            Back to Profile
          </Link>
        </div>
      </div>
    </LandlordLayout>
  );
};

export default LandlordUnderConstruction;
