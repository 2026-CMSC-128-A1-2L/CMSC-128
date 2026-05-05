import type { ReactNode } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageBackground from '../general/PageBackground';
import SideBarLandlord, { type SideBarLandlordItemKey } from './SideBarLandlord';
import LandlordFooter from './LandlordFooter';
import TutorialBubble from '../../../../frontend/src/components/landlord/TutorialsForLandlord';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type LandlordLayoutProps = {
  activeSidebarItem?: SideBarLandlordItemKey;
  breadcrumbs?: BreadcrumbItem[];
  activeTab?:string;
  children: ReactNode;
};

const LandlordLayout = ({ activeSidebarItem, breadcrumbs = [], children,activeTab }: LandlordLayoutProps) => {
  const navigate = useNavigate();

  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-stretch">
          <div className="sticky top-0 h-screen self-start">
            <SideBarLandlord
              activeItem={activeSidebarItem}
              onProfileClick={() => navigate('/landlord/profile')}
              onAddListing={() => navigate('/landlord/properties/new')}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col px-[32px] pr-[80px] pb-[32px]">
            {breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="flex h-[64px] items-end gap-[10px] p-[10px]">
                <ol className="flex h-[24px] items-center gap-[6px]">
                  {breadcrumbs.map((item, idx) => {
                    const isLast = idx === breadcrumbs.length - 1;
                    const labelClass =
                      "font-['Lora',serif] text-[14px] font-semibold whitespace-nowrap";
                    return (
                      <li
                        key={`${item.to ?? item.label}-${item.label}`}
                        className="flex items-center gap-[6px]"
                      >
                        {item.to ? (
                          <Link
                            to={item.to}
                            className={`${labelClass} text-[#096c5b] hover:underline`}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span
                            className={`${labelClass} text-[#2f3136]`}
                            aria-current={isLast ? 'page' : undefined}
                          >
                            {item.label}
                          </span>
                        )}
                        {!isLast && (
                          <Icon
                            icon="iconamoon:arrow-right-2"
                            className="h-[24px] w-[24px] text-[#2f3136]"
                            aria-hidden="true"
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
            <div className="pl-[10px] flex-1">{children}</div>
          </div>
        </div>

        <div className="self-stretch h-20 shrink-0 overflow-hidden z-[1] flex flex-col items-stretch">
          <LandlordFooter />
        </div>
      </div>
      {/* ======= FLOATING ICON FOR TUTORIAL ======= */}
      {
        activeTab!='info' &&
        <div
        className="fixed bottom-10 right-10 z-[9999] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <div
          className="w-16 h-16 drop-shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #096C5B, #16917C)',
            WebkitMask:
              "url('https://api.iconify.design/iconoir/chat-bubble-question-solid.svg') no-repeat center / contain",
            mask: "url('https://api.iconify.design/iconoir/chat-bubble-question-solid.svg') no-repeat center / contain",
          }}
        />
      </div>
      }
      < TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />
      
    </div>
  );
};

export default LandlordLayout;
